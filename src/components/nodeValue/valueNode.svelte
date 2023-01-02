<script lang="ts">
	import type { NodeValue } from '../../playground';
	import ListNode from './listNode.svelte';
	import LiteralNode from './literalNode.svelte';
	import SyntaxNode from './syntaxNode.svelte';

	export let value: NodeValue;
</script>

{#if value.type === 'SyntaxValue'}
	<SyntaxNode {value} />
{:else if value.type === 'LiteralValue'}
	<LiteralNode {value} />
{:else if value.type === 'ListValue'}
	<ListNode {value} />
{/if}
