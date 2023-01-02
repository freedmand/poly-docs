<script lang="ts">
	import type { Tree } from '@lezer/common';
	import type { ParseNode } from '../playground';
	import ParseTreeNode from './parseTreeNode.svelte';

	export let tree: Tree;
	export let code: string;

	function iterateTree(tree: Tree, code: string) {
		const trees: ParseNode[] = [];
		let level = 0;
		let currentNodeStack: ParseNode[] = [];

		const getLast = (nodeStack: ParseNode[]): ParseNode | undefined => {
			if (nodeStack.length > 0) return nodeStack[nodeStack.length - 1];
			return undefined;
		};

		tree.iterate({
			enter(node) {
				const currentNode = getLast(currentNodeStack);

				const parseNode: ParseNode = {
					type: node.name,
					from: node.from,
					to: node.to,
					text: code.slice(node.from, node.to),
					level,
					parent: currentNode,
					children: []
				};

				// No current tree? Create a new one
				if (currentNode == null) {
					trees.push(parseNode);
				} else {
					// Otherwise append to the current node's children
					currentNode.children.push(parseNode);
				}

				// No matter what, add to the nodes
				currentNodeStack.push(parseNode);

				level++;
			},
			leave(node) {
				level--;
				currentNodeStack.pop();
			}
		});
		return trees;
	}

	$: nodes = iterateTree(tree, code);
	$: console.log('NODES', nodes);
</script>

{#each nodes as node}
	<ParseTreeNode {node} />
{/each}
