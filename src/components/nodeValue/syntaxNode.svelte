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

	$: className = `${isProgram ? '~emerald' : ''} ${isStatement ? '~green' : ''} ${
		isExpression ? '~amber' : ''
	}`;
</script>

<details class="card py-0 my-2 {className} @high" open>
	<summary class="select-none font-bold">{value.value.kind}</summary>

	{#if value.properties.length > 0}
		<ul>
			{#each value.properties as [key, val]}
				{#if !emptyValueNode(val)}
					<li class="card py-0 px-2 my-2 @low">
						<div class="supra -mb-1 mt-1">{key}</div>
						<ValueNode value={val} />
					</li>
				{/if}
			{/each}
		</ul>
	{/if}
</details>
