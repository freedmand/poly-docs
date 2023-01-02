import { classHighlighter, highlightTree } from '@lezer/highlight';

// From https://github.com/pngwn/MDsveX/blob/6c60fe68c335fce559db9690fbf5e69ef539d37d/packages/mdsvex/src/transformers/index.ts#L571
export const escape_svelty = (str) =>
	str
		.replace(/[{}`]/g, (c) => ({ '{': '&#123;', '}': '&#125;', '`': '&#96;' }[c]))
		.replace(/\\([trn])/g, '&#92;$1');

// Adapted from https://cs.github.com/pngwn/MDsveX/blob/6c60fe68c335fce559db9690fbf5e69ef539d37d/packages/mdsvex/src/transformers/index.ts#L68
const entites = [
	[/</g, '&lt;'],
	[/>/g, '&gt;'],
	[/{/g, '&#123;'],
	[/}/g, '&#125;']
];

function escape(text) {
	for (let i = 0; i < entites.length; i += 1) {
		text = text.replace(entites[i][0], entites[i][1]);
	}
	return text;
}

const langs = {};
import Prism from 'prismjs';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

function load_language(lang) {
	if (!langs[lang]) return;

	langs[lang].deps.forEach((name) => load_language(name));

	require(langs[lang].path);
}

import PrismComponents from 'prismjs/components.json' assert { type: 'json' };
const { meta, ...languages } = PrismComponents.languages;

const make_path = (base_path, id) => base_path.replace('{id}', id);

function get_lang_info(name, lang_meta, base_path) {
	const _lang_meta = {
		name,
		path: `prismjs/${make_path(base_path, name)}`,
		deps: new Set()
	};

	const aliases = new Set();

	// TODO: DRY this up, it is literally identical

	if (lang_meta.require) {
		if (Array.isArray(lang_meta.require)) {
			lang_meta.require.forEach((id) => _lang_meta.deps.add(id));
		} else {
			_lang_meta.deps.add(lang_meta.require);
		}
	}

	if (lang_meta.peerDependencies) {
		if (Array.isArray(lang_meta.peerDependencies)) {
			lang_meta.peerDependencies.forEach((id) => _lang_meta.deps.add(id));
		} else {
			_lang_meta.deps.add(lang_meta.peerDependencies);
		}
	}

	if (lang_meta.alias) {
		if (Array.isArray(lang_meta.alias)) {
			lang_meta.alias.forEach((id) => aliases.add(id));
		} else {
			aliases.add(lang_meta.alias);
		}
	}

	return [{ ..._lang_meta, aliases }, aliases];
}

function load_language_metadata() {
	for (const lang in languages) {
		const [lang_info, aliases] = get_lang_info(lang, languages[lang], meta.path);

		langs[lang] = lang_info;
		aliases.forEach((_n) => {
			langs[_n] = langs[lang];
		});
	}

	const svelte_meta = {
		name: 'svelte',
		aliases: new Set(['sv']),
		path: 'prism-svelte',
		deps: new Set(['javscript', 'css'])
	};

	langs.svelte = svelte_meta;
	langs.sv = svelte_meta;
}

load_language_metadata();

const code_highlight = (code, lang) => {
	const normalised_lang = lang?.toLowerCase();
	let _lang = !!normalised_lang && langs[normalised_lang];

	if (_lang && !Prism.languages[_lang.name]) {
		load_language(_lang.name);
	}

	if (!_lang && normalised_lang && Prism.languages[normalised_lang]) {
		langs[normalised_lang] = { name: lang };
		_lang = langs[normalised_lang];
	}
	console.log(_lang);
	const highlighted = escape_svelty(
		_lang ? Prism.highlight(code, Prism.languages[_lang.name], _lang.name) : escape(code)
	);
	return `<pre class="language-${normalised_lang}">{@html \`<code class="language-${normalised_lang}">${highlighted}</code>\`}</pre>`;
};

function syntaxHighlightPoly(program, tree) {
	let lastPos = 0;
	// Highlight the tree
	let outputProgram = '<pre class="language-poly">{@html `<code class="language-poly">';
	highlightTree(tree, classHighlighter, (from, to, classes) => {
		if (from > lastPos) {
			// Add unstyled content
			outputProgram += escape_svelty(program.substring(lastPos, from));
		}
		// Add styled content
		outputProgram += `<span class="${classes}">`;
		outputProgram += escape_svelty(escape(program.substring(from, to)));
		outputProgram += '</span>';
		// outputProgram += highlight(program.substring(from, to), classes);
		lastPos = to;
	});

	// Add any remaining content
	outputProgram += escape_svelty(program.substring(lastPos));

	outputProgram += '</code>`}</pre>';
	return outputProgram;
}

export { code_highlight, syntaxHighlightPoly };
