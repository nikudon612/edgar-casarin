import { aboutQuery as query, type About } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { loadQuery } = locals;
	const initial = await loadQuery<About[]>(query);

	console.log('data', initial);

	return {
		query,
		options: {
			initial
		}
	};
};
