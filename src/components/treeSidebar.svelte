<script lang="ts">
	import type { SyntaxParse } from '../playground';
	import AstTree from './astTree.svelte';
	import ParseTree from './parseTree.svelte';
	import type { Tree } from 'lezer-poly/node_modules/@lezer/common';

	export let ast: SyntaxParse;
	export let code: string;
	export let parseTree: Tree;
</script>

<div class="tree-sidebar mt-4 md:w-5/12 md:mt-0">
	<section class="section px-4">
		<h2 class="heading text-xl">Syntax tree</h2>
		<AstTree {ast} />
	</section>
	<section class="section px-4 mt-8">
		<h2 class="heading text-xl">Parse tree</h2>
		<ParseTree {code} tree={parseTree} />
	</section>
</div>

<style>
	.tree-sidebar :global(.card) {
		display: inline-block;
		@apply mr-4;
	}
</style>
