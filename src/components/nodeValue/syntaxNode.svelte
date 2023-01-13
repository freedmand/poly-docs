<script lang="ts">
	import {
		expressionTypes,
		statementTypes,
		typeExpressionTypes
	} from 'lezer-poly/src/generated/ast';
	import { emptyValueNode, type SyntaxValue } from '../../playground';
	import ValueNode from './valueNode.svelte';

	export let value: SyntaxValue;

	$: isProgram = value.value.kind === 'Program';
	$: isStatement = statementTypes.includes(value.value.kind);
	$: isExpression =
		expressionTypes.includes(value.value.kind) || typeExpressionTypes.includes(value.value.kind);

	$: className = `${isProgram ? '~emerald dark:~emeraldDark' : ''} ${
		isStatement ? '~green dark:~greenDark' : ''
	} ${isExpression ? '~amber dark:~amberDark' : ''}`;
</script>

<details class="card py-0 my-0 px-2 !mx-1 special-card {className} @high" open>
	<summary class="select-none font-bold">{value.value.kind}</summary>

	{#if value.properties.length > 0}
		<ul>
			{#each value.properties as [key, val]}
				{#if !emptyValueNode(val)}
					<li class="card py-0 px-2 my-0 !mx-1 special-card @low">
						<div class="supra mb-0 mt-1">{key}</div>
						<ValueNode value={val} />
					</li>
				{/if}
			{/each}
		</ul>
	{/if}
</details>
