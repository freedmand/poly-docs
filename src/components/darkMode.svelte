<script lang="ts">
	import { onMount } from 'svelte';

	export let darkMode = false;

	let updateFunction = () => {};

	function toggleDarkMode() {
		darkMode = !darkMode;
		updateFunction();
	}

	onMount(() => {
		updateFunction = () => {
			if (darkMode) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		};
	});

	$: {
		// Add "dark" class to HTML element
	}
</script>

<button on:click={toggleDarkMode}>
	<svg
		class="icon m-2 fill-gray-700 dark:fill-gray-100"
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		fill="none"
		><path
			fill="currentColor"
			d="M8.27 1.01a.5.5 0 0 0-1 0v2.24a5.04 5.04 0 0 1 1 0V1.01ZM10.78 4.24c.27.2.52.43.74.68l1.52-1.52a.5.5 0 1 0-.7-.7l-1.56 1.54ZM12.7 7.46a5.02 5.02 0 0 1 .05 1h1.97a.5.5 0 0 0 0-1H12.7ZM11.74 11.22a5 5 0 0 1-.68.73l1.27 1.27a.5.5 0 0 0 .71-.7l-1.3-1.3ZM8.27 13.16a5.04 5.04 0 0 1-1 0v1.75a.5.5 0 0 0 1 0v-1.75ZM4.49 11.95a5 5 0 0 1-.68-.73l-1.3 1.3a.5.5 0 0 0 .7.7l1.28-1.27ZM2.8 8.46a5.07 5.07 0 0 1 .05-1H.83a.5.5 0 0 0 0 1H2.8ZM4.03 4.92c.22-.25.47-.48.73-.68L3.21 2.7a.5.5 0 1 0-.7.7l1.52 1.53Z"
		/><path
			fill="currentColor"
			fill-rule="evenodd"
			d="M7.77 10.98a2.77 2.77 0 1 0 0-5.55 2.77 2.77 0 0 0 0 5.55Zm0 1a3.77 3.77 0 1 0 0-7.55 3.77 3.77 0 0 0 0 7.55Z"
			clip-rule="evenodd"
		/></svg
	>
</button>
