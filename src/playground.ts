export interface ParseNode {
	type: string;
	from: number;
	to: number;
	text: string;
	level: number;
	parent?: ParseNode;
	children: ParseNode[];
}
