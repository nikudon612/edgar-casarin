import {
	allProjectsQuery,
	type Project,
	aboutQuery as query,
	type About
} from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { loadQuery } = locals;

	// Load projects
	const projectInitial = await loadQuery<Project[]>(allProjectsQuery);

	// Load about data
	const aboutInitial = await loadQuery<About>(query);

	// console.log('Projects from Sanity:', projectInitial);
	// console.log('About from Sanity:', aboutInitial);

	return {
		query: allProjectsQuery,
		options: {
			initial: {
				data: {
					projects: projectInitial.data,
					about: aboutInitial.data
				}
			}
		}
	};
};
