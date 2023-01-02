<script lang="ts">
	import { parser } from 'lezer-poly/src/generated/poly.js';
	import { Context, parseProgram } from 'lezer-poly/src/generated/ast';
	import type { Tree } from 'lezer-poly/node_modules/@lezer/common';
	import ParseTree from '../../components/parseTree.svelte';
	import type { SyntaxParse } from '../../playground';
	import AstTree from '../../components/astTree.svelte';
	import PlaygroundEditor from '../../components/playgroundEditor.svelte';

	function parseAst(tree: Tree, code: string): SyntaxParse {
		try {
			return {
				error: false,
				program: parseProgram(new Context(code), tree.topNode)
			};
		} catch (e) {
			return {
				error: true,
				message: `${e}`
			};
		}
	}

	$: parseTree = parser.parse(code);
	$: ast = parseAst(parseTree, code);

	let code = '';
</script>

<div class="self-start w-full md:w-7/12 md:pr-12">
	<PlaygroundEditor bind:value={code} tree={parseTree} />
</div>

<div class="mt-4 md:w-5/12 md:mt-0">
	<section class="section px-4">
		<h2 class="heading text-xl">Syntax tree</h2>
		<AstTree {ast} />
	</section>
	<section class="section px-4 mt-8">
		<h2 class="heading text-xl">Parse tree</h2>
		<ParseTree {code} tree={parseTree} />
	</section>
</div>
