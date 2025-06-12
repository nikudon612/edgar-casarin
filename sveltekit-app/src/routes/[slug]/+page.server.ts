// src/routes/[slug]/+page.server.ts
import { error } from '@sveltejs/kit';
import { client } from '$lib/sanity/client';
import { singleProjectQuery, allProjectsQuery } from '$lib/sanity/queries';

export const load = async ({ params }) => {
	const project = await client.fetch(singleProjectQuery, {
		slug: params.slug
	});

	if (!project) throw error(404, 'Project not found');

	const projects = await client.fetch(allProjectsQuery);

	return { project, projects };
};
