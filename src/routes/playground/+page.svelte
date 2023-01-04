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

	const examples = [
		['Simple let', 'let x = 5;'],
		['Let text type assign', 'let name: Text = "Dog";'],
		['Text interpolation', 'var content = "\\[age] years old";'],
		['Union type assign', 'type NumText = Number | Text;'],
		[
			'Simple add function',
			`fn add(x: Number, y: Number) -> Number {
  return x + y;
}`
		]
	];

	let selectedExample = '';

	$: {
		code = examples.find(([name]) => name === selectedExample)?.[1] ?? '';
	}
</script>

<div class="self-start w-full md:w-7/12 md:pr-12">
	<div class="select ~neutral max-w-x mb-4">
		<select bind:value={selectedExample}>
			<option value="">Select an example...</option>
			<option disabled>—</option>
			{#each examples as [name]}
				<option value={name}>{name}</option>
			{/each}
		</select>
	</div>

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
