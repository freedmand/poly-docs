<script lang="ts">
	import { page } from '$app/stores';
	import type { Metadata } from '../metadata';

	export let metadata: Metadata;
	let x = 4;
</script>

<section class="self-start w-full md:w-1/3 md:pr-12 md:sticky mh-auto top-2">
	<h1 class="heading ~urge text-3xl text-urge-600 dark:text-white">
		<a target="_self" href={$page.route.id}>
			{metadata.title}
		</a>
	</h1>
	{#each metadata.headings as heading}
		<p class="my-2 dark:text-purple-fg">
			<a href={`#${heading.id}`} target="_self" class="portal whitespace-normal -mx-2">
				{heading.title}
			</a>
		</p>
	{/each}
</section>
