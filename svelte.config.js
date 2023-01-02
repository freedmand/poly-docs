import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import remarkSlug from 'remark-slug';

import { parser } from 'lezer-poly/src/generated/poly.js';
import { code_highlight, syntaxHighlightPoly } from './highlight.js';

function getMarkdownHeadings() {
	let visit;
	let tree_to_string;
	return async function transformer(tree, vFile) {
		if (!visit) {
			tree_to_string = (await import('mdast-util-to-string')).toString;
			visit = (await import('unist-util-visit')).visit;
		}

		vFile.data.headings = [];

		visit(tree, 'heading', (node) => {
			vFile.data.headings.push({
				level: node.depth,
				title: tree_to_string(node),
				id: node.data.id
			});
		});

		if (!vFile.data.fm) vFile.data.fm = {};
		vFile.data.fm.headings = vFile.data.headings;
	};
}

const defaultMdsvex = mdsvex();
console.log(defaultMdsvex);

function highlighter(code, lang) {
	// if (lang !== 'poly') {
	// 	return defaultMdsvex.highlighter(code, lang);
	// }

	// Parse Poly code
	if (lang.toLowerCase() == 'poly') {
		const tree = parser.parse(code);
		return syntaxHighlightPoly(code, tree);
	}

	return code_highlight(code, lang);
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],

	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex({
			...mdsvexConfig,
			highlight: {
				highlighter
			},
			remarkPlugins: [...mdsvexConfig.remarkPlugins, remarkSlug, getMarkdownHeadings]
		})
	],

	kit: {
		adapter: adapter()
	}
};

export default config;
