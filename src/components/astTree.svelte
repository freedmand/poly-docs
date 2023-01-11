<script lang="ts">
	import { extractSyntaxNode, type SyntaxParse } from '../playground';
	import SyntaxNode from './nodeValue/syntaxNode.svelte';

	export let ast: SyntaxParse;
</script>

{#if ast.error}
	<div class="card py-2 my-2 ~critical dark:~criticalDark @low font-mono">{ast.message}</div>
{:else}
	<SyntaxNode value={extractSyntaxNode(ast.program)} />
{/if}
