<script lang="ts">
	import { classHighlighter, highlightTree } from 'lezer-poly/node_modules/@lezer/highlight';
	import type { Tree } from 'lezer-poly/node_modules/@lezer/common';

	let highlightedCode: HTMLPreElement;

	function syntaxHighlightPoly(program: string, tree: Tree, highlightedCode: HTMLPreElement) {
		if (highlightedCode == null) return;

		// Clear children
		while (highlightedCode.firstChild) {
			highlightedCode.removeChild(highlightedCode.firstChild);
		}

		let lastPos = 0;

		// Highlight the tree
		highlightTree(tree, classHighlighter, (from, to, classes) => {
			console.log({ lastPos, from, to, classes });
			if (from > lastPos) {
				// Add unstyled content
				console.log('BEGINNING', JSON.stringify(program.substring(lastPos, from)));
				highlightedCode.appendChild(document.createTextNode(program.substring(lastPos, from)));
			}
			// Add styled content
			const span = document.createElement('span');
			span.className = classes;
			span.textContent = program.substring(from, to);
			highlightedCode.appendChild(span);
			lastPos = to;
		});

		// Add any remaining content
		highlightedCode.appendChild(document.createTextNode(program.slice(lastPos)));

		// Add a newline to the end of the code
		highlightedCode.appendChild(document.createTextNode('\n'));
	}

	export let value: string;
	export let tree: Tree;

	$: syntaxHighlightPoly(value, tree, highlightedCode);
</script>

<section class="section relative grid" style={`content: attr(data-replicated-value)`}>
	<textarea
		bind:value
		spellcheck="false"
		placeholder="Type code here..."
		class="code resize-none overflow-hidden w-full"
		style="grid-area: 1 / 1 / 2 / 2"
	/>
	<pre
		class="code language-poly overflow-hidden w-full pointer-events-none bg-transparent"
		style="white-space: break-spaces; grid-area: 1 / 1 / 2 / 2"
		bind:this={highlightedCode}
	/>
</section>
