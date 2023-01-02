<script lang="ts">
	import { parser } from 'lezer-poly/src/generated/poly.js';
	import { Context, parseProgram } from 'lezer-poly/src/generated/ast';
	import ParseTree from '../../components/parseTree.svelte';

	$: parseTree = parser.parse(code);
	// $: ast = parseProgram(new Context(code), parseTree.topNode);
	$: console.log(parseTree);
	// $: console.log(ast);

	let code = '';
</script>

<div class="self-start w-full md:w-2/3 md:pr-12">
	<textarea bind:value={code} placeholder="Type code here..." class="code resize-none w-full" />
</div>

<div class="mt-4 md:w-1/3 md:mt-0">
	<h1 class="heading">Parse tree</h1>
	<ParseTree {code} tree={parseTree} />
</div>
