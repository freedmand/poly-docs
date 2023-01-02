// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
}

declare module '*.svx' {
	import Metadata from './metadata';

	export const metadata: Metadata;
}

declare module 'lezer-poly/src/generated/poly.js' {
	import { LRParser } from '@lezer/lr';

	export const parser: LRParser;
}

declare module 'prismjs/components.json' {}
