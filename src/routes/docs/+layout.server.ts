// import type { Metadata } from '../../metadata';

// const docOrder = ['welcome'];

import type { Metadata } from '../../metadata';

export async function load() {
	const Page = await import('./+page.svx');
	const metadata: Metadata = Page.metadata;
	return {
		metadata
	};
}

// export async function load() {
// 	const pages: { metadata: Metadata }[] = [];

// 	for (const doc of docOrder) {
// 		const Page = await import(`./${doc}/+page.svx`);
// 		const metadata: Metadata = Page.metadata;

// 		pages.push({
// 			metadata
// 		});
// 	}

// 	return { pages };
// }
