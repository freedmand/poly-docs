import type { Metadata } from '../../metadata';

export async function load() {
	const Page = await import('./+page.svx');
	const metadata: Metadata = Page.metadata;
	return {
		metadata
	};
}
