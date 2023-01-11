<script lang="ts">
	import { page } from '$app/stores';
	import TableOfContents from '../../components/tableOfContents.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<svelte:head>
	<title>Poly: {data.metadata.title}</title>
</svelte:head>

<TableOfContents metadata={data.metadata} />

<article class="mt-4 md:w-2/3 mx-auto">
	<section class="content ~neutral dark:~neutralDark dark:text-purple-fg">
		<slot />
	</section>
</article>
