<script>
	import '../app.css';
	import { page } from '$app/stores';
</script>

<head />

<svelte:head>
	<title>Poly: Creating a new programming language for the web</title>
	<base target="_blank" />
</svelte:head>

<div class="max-w-screen-lg px-6 py-4 mx-auto lg:mx-auto md:py-8">
	<header class="flex flex-wrap items-center justify-between">
		<div class="flex items-center">
			<a href="/">
				<h3 class="heading text-4xl ~neutral mr-8 pointer-events-none">
					<span class="flex items-center">
						<span class="icon mr-2">
							<svg height="45" viewBox="0 0 32 54" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M15.5109 38.1223C15.7771 34.7543 16.005 31.8701 17.8006 30.7705C17.9003 30.7094 17.9958 30.6496 18.0872 30.591V29.1069H9.10731L5.00548 37.4558L0.12738 44.049V53.7298C0.131221 53.7298 0.135061 53.7298 0.1389 53.7298C14.2779 53.725 14.9726 44.9343 15.5109 38.1223Z"
									fill="#58A2CB"
								/>
								<path
									d="M12.8742 38.4001C14.103 35.1449 15.2643 32.0687 17.7927 30.7545C17.8943 30.7017 17.9925 30.6488 18.0872 30.5958V29.1069H9.10731L5.00548 37.4558L0.12738 44.049V48.8895C8.69098 49.4815 10.8722 43.7033 12.8742 38.4001Z"
									fill="#89DF60"
								/>
								<circle cx="15.5922" cy="15.4648" r="15.4648" fill="#E35454" />
								<path
									d="M23.1822 20.9861C23.1822 27.3877 17.9927 32.5772 11.5911 32.5772C5.18952 32.5772 0 27.3877 0 20.9861C0 14.5845 5.18952 9.39501 11.5911 9.39501C17.9927 9.39501 23.1822 14.5845 23.1822 20.9861Z"
									fill="white"
								/>
								<path
									d="M17.7879 30.7749C17.0706 30.8769 16.3375 30.9296 15.5921 30.9296C7.95331 30.9296 1.60805 25.3912 0.352808 18.1109C0.351912 18.1141 0.351056 18.1173 0.350241 18.1205C-0.0225167 19.589 0.0424234 25.1534 0.114488 31.3282C0.165168 35.6708 0.219372 40.3152 0.127335 44.0492C6.17143 44.0492 8.63008 40.797 11.3255 37.2315C13.0494 34.9511 14.8702 32.5426 17.7879 30.7749Z"
									fill="#F5E01D"
								/>
								<circle cx="15.2568" cy="18.1557" r="2.83049" fill="black" fill-opacity="0.6" />
							</svg>
						</span>
						Poly
					</span>
				</h3>
			</a>
			<div class="text-neutral-700 mt-2">
				<a
					href="/about"
					class="portal ~urge"
					class:active={$page.url.pathname === '/about'}
					aria-selected={$page.url.pathname === '/about'}>About</a
				>
				<a
					href="/docs"
					class="portal ~urge"
					class:active={$page.url.pathname === '/docs'}
					aria-selected={$page.url.pathname === '/docs'}>Docs</a
				>
				<a
					href="/playground"
					class="portal ~urge"
					class:active={$page.url.pathname === '/playground'}
					aria-selected={$page.url.pathname === '/playground'}>Playground</a
				>
				<a href="https://poly.substack.com/" class="portal">Blog</a>
			</div>
		</div>
	</header>

	<main class="flex flex-wrap justify-between mt-14">
		<slot />
	</main>
</div>
