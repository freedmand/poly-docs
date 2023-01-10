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
			if (from > lastPos) {
				// Add unstyled content
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

	function noSelection(textArea: HTMLTextAreaElement): boolean {
		return textArea.selectionStart === textArea.selectionEnd;
	}

	function getCurrentLine(textArea: HTMLTextAreaElement): string {
		const { selectionStart } = textArea;
		const lastNewLine = value.lastIndexOf('\n', selectionStart - 1);
		const nextNewLine = value.indexOf('\n', selectionStart);
		if (nextNewLine === -1) return value.substring(lastNewLine + 1);
		return value.substring(lastNewLine + 1, nextNewLine);
	}

	function getCurrentIndentation(textArea: HTMLTextAreaElement): string {
		const line = getCurrentLine(textArea);
		return line.match(/^\s*/)?.[0] ?? '';
	}

	function cursorAtEndOfLine(textArea: HTMLTextAreaElement): boolean {
		const { selectionStart } = textArea;
		return value[selectionStart] === '\n' || selectionStart === value.length;
	}

	function getLastCharacterInCurrentLine(textArea: HTMLTextAreaElement): string {
		const line = getCurrentLine(textArea);
		return line.slice(-1);
	}

	function insertAtCursor(textArea: HTMLTextAreaElement, text: string) {
		const { selectionStart, selectionEnd } = textArea;
		const before = value.substring(0, selectionStart);
		const after = value.substring(selectionEnd);
		textArea.value = before + text + after;
		textArea.selectionStart = textArea.selectionEnd = selectionStart + text.length;
	}

	function deleteAtCursor(textArea: HTMLTextAreaElement, length: number, insert: string) {
		const { selectionStart, selectionEnd } = textArea;
		const before = value.substring(0, selectionStart - length);
		const after = value.substring(selectionEnd);
		textArea.value = before + insert + after;
		textArea.selectionStart = textArea.selectionEnd = selectionStart - length + insert.length;
	}

	const BRACES = [
		['{', '}'],
		['[', ']'],
		['(', ')']
	];

	const nonPrintableCharacters = [
		'Alt',
		'AltGraph',
		'CapsLock',
		'Control',
		'Fn',
		'FnLock',
		'Meta',
		'NumLock',
		'ScrollLock',
		'Shift',
		'Symbol',
		'SymbolLock',
		'Hyper',
		'Super',
		'Accept',
		'Again',
		'Attn',
		'Cancel',
		'ContextMenu',
		'Escape',
		'Execute',
		'Find',
		'Help',
		'Pause',
		'Play',
		'Props',
		'Select',
		'ZoomIn',
		'ZoomOut',
		'F1',
		'F2',
		'F3',
		'F4',
		'F5',
		'F6',
		'F7',
		'F8',
		'F9',
		'F10',
		'F11',
		'F12',
		'Soft1',
		'Soft2',
		'Soft3',
		'Soft4'
	];

	const tab = '  ';
	let lastKeyEnter = false;

	function handleKeyDown(e: KeyboardEvent) {
		const et = e.target as HTMLTextAreaElement;

		// Handle indentation on enter
		if (e.key === 'Enter') {
			// e.preventDefault();
			console.log({
				noSelection: noSelection(et),
				currentIndentation: getCurrentIndentation(et),
				cursorAtEndOfLine: cursorAtEndOfLine(et),
				lastCharacterInCurrentLine: getLastCharacterInCurrentLine(et),
				currentLine: getCurrentLine(et)
			});

			if (noSelection(et) && cursorAtEndOfLine(et)) {
				const indent = getCurrentIndentation(et);
				const lastCharacter = getLastCharacterInCurrentLine(et);
				const brace = BRACES.find(([open]) => open === lastCharacter);
				if (brace) {
					insertAtCursor(et, '\n' + indent + tab);
				} else {
					insertAtCursor(et, '\n' + indent);
				}
				e.preventDefault();
			}

			lastKeyEnter = true;
			// console.log({
			// 	noSelection: noSelection(et),
			// 	currentIndentation: getCurrentIndentation(et),
			// 	cursorAtEndOfLine: cursorAtEndOfLine(et),
			// 	lastCharacterInCurrentLine: getLastCharacterInCurrentLine(et)
			// });
		} else {
			// Check if key event is for a brace close
			if (noSelection(et) && lastKeyEnter && cursorAtEndOfLine(et)) {
				console.log('WOO');
				if (BRACES.some(([, close]) => close === e.key)) {
					const line = getCurrentLine(et);
					// Check if line is all whitespace
					if (line.trim() === '') {
						// Dedent line
						if (line.length >= 2) {
							deleteAtCursor(et, 2, e.key);
							e.preventDefault();
						}
					}
				}
			}

			// Only switch last key enter to false if the key is printable
			if (!nonPrintableCharacters.includes(e.key)) {
				lastKeyEnter = false;
			}
		}

		value = et.value;
	}
</script>

<section class="section relative grid" style={`content: attr(data-replicated-value)`}>
	<textarea
		bind:value
		spellcheck="false"
		placeholder="Type code here..."
		class="code resize-none overflow-hidden w-full"
		style="grid-area: 1 / 1 / 2 / 2"
		on:keydown={handleKeyDown}
	/>
	<pre
		class="code language-poly overflow-hidden w-full pointer-events-none bg-transparent"
		style="white-space: break-spaces; grid-area: 1 / 1 / 2 / 2"
		bind:this={highlightedCode}
	/>
</section>
