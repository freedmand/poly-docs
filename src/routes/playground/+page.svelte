<script lang="ts">
	import { parser } from 'lezer-poly/src/generated/poly.js';
	import { Context, parseProgram } from 'lezer-poly/src/generated/ast';
	import type { Tree } from 'lezer-poly/node_modules/@lezer/common';
	import type { SyntaxParse } from '../../playground';
	import PlaygroundEditor from '../../components/playgroundEditor.svelte';
	import TreeSidebar from '../../components/treeSidebar.svelte';

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
		],
		[
			'Simple if statement',
			`if x + 1 == 5 / 2 {
  x += 1;
}`
		],
		[
			'Simple for statement',
			`for x in [1, 2, 3] {
	y += [@index(x)];
}`
		],
		['Order of operations', 'x + 2 * 3 + (4 - 1 / 5) * 5;'],
		[
			'Comments',
			`// This is a comment
/// This is a doc comment
let x = 3 / 4; // inline comment
let y = 4 / 3; /// inline doc comment`
		],
		[
			'Classes with operator overloading',
			`class Int(Number) {
  operator *(other: Int) -> Int {
    return self * other;
  }
}`
		]
	];

	let selectedExample = '';

	$: {
		code = examples.find(([name]) => name === selectedExample)?.[1] ?? '';
	}
</script>

<div class="self-start w-full md:w-7/12 md:pr-12">
	<div class="select ~neutral dark:~urgeNeutral max-w-x mb-4">
		<select class="dark:bg-gray-900 dark:text-gray-200" bind:value={selectedExample}>
			<option value="">Select an example...</option>
			<option disabled>—</option>
			{#each examples as [name]}
				<option value={name}>{name}</option>
			{/each}
		</select>
	</div>

	<PlaygroundEditor bind:value={code} tree={parseTree} />
</div>

<TreeSidebar {ast} {code} {parseTree} />
