<script lang="ts">
	import type { ParseNode } from '../playground';

	export let node: ParseNode;

	const ERROR_TYPE = '⚠';
	$: isError = node.type === ERROR_TYPE;
	$: isProgram = node.type === 'Program';
	$: isStatement = node.type.endsWith('Statement');
	$: isExpression = node.type === 'Expression';
	$: special = isError || isProgram || isStatement || isExpression;

	$: className = `${isError ? '~critical dark:~criticalDark' : ''} ${
		isProgram ? '~emerald dark:~emeraldDark' : ''
	} ${isStatement ? '~green dark:~greenDark' : ''} ${
		isExpression ? '~amber dark:~amberDark' : ''
	} ${special ? '@high' : '@low'}`;
	$: hideNodeText =
		node.text.length === 0 || (node.text === node.type && node.text !== 'StringContent');
</script>

{#if node.children.length === 0}
	<div class="card py-0 my-2 px-2 my-0 !mx-1 special-card {className}">
		{node.type}
		{#if !hideNodeText}<code class="code break-words">{node.text}</code>{/if}
	</div>
{:else}
	<details class="card py-0 px-2 my-0 !mx-1 special-card {className}" open>
		<summary class="select-none font-bold">{node.type}</summary>
		{#each node.children as child}
			<svelte:self node={child} />
		{/each}
		{#if node.children.length === 0 && !hideNodeText}
			<code class="code break-words">{node.text}</code>
		{/if}
	</details>
{/if}
