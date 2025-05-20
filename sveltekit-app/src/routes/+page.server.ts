import { allProjectsQuery, type Project } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { loadQuery } = locals;
	const initial = await loadQuery<Project[]>(allProjectsQuery);

	console.log('Projects from Sanity:', initial);

	return {
		query: allProjectsQuery,
		options: {
			initial
		}
	};
};
