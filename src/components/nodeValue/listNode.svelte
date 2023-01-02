<script lang="ts">
	import type { ListValue } from '../../playground';
	import ValueNode from './valueNode.svelte';

	export let value: ListValue;
</script>

{#each value.value as item}
	<li><ValueNode value={item} /></li>
{/each}
