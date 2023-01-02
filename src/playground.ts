/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AST, Program } from 'lezer-poly/src/generated/ast';

export interface ParseNode {
	type: string;
	from: number;
	to: number;
	text: string;
	level: number;
	parent?: ParseNode;
	children: ParseNode[];
}

export type SyntaxParse = ErrorParse | SyntaxTree;

export interface ErrorParse {
	error: true;
	message: string;
}

export interface SyntaxTree {
	error: false;
	program: Program;
}

export type NodeValue = SyntaxValue | LiteralValue | ListValue;

export interface SyntaxValue {
	type: 'SyntaxValue';
	value: AST;
	properties: [string, NodeValue][];
}

export interface LiteralValue {
	type: 'LiteralValue';
	value: number | string | boolean;
}

export interface ListValue {
	type: 'ListValue';
	value: NodeValue[];
}

export function extractNodeValue(value: any): NodeValue {
	if (Array.isArray(value)) {
		// Array value
		return {
			type: 'ListValue',
			value: value.map(extractNodeValue)
		};
	} else if (value != null && value.kind != null) {
		// AST value
		return extractSyntaxNode(value);
	} else {
		// Literal value
		return {
			type: 'LiteralValue',
			value: value
		};
	}
}

export function extractSyntaxNode(node: AST): SyntaxValue {
	const keys = Object.keys(node).filter((key) => key !== 'kind');

	const properties: [string, NodeValue][] = [];
	for (const key of keys) {
		// Check for types
		const value = extractNodeValue((node as any)[key]);
		properties.push([key, value]);
	}

	return {
		type: 'SyntaxValue',
		value: node,
		properties
	};
}

export function emptyValueNode(nodeValue: NodeValue): boolean {
	if (nodeValue.type === 'LiteralValue') {
		return nodeValue.value === undefined;
	}
	if (nodeValue.type === 'ListValue') {
		return nodeValue.value.length === 0;
	}
	return false;
}
