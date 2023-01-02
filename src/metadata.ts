export interface Metadata {
	title: string;
	headings: Heading[];
}

export interface Heading {
	level: number;
	title: string;
	id: string;
}
