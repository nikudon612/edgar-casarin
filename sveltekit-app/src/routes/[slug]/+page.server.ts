// src/routes/[slug]/+page.server.ts
import { error } from '@sveltejs/kit';
import { client } from '$lib/sanity/client';
import { singleProjectQuery } from '$lib/sanity/queries';

export const load = async ({ params }) => {
	const project = await client.fetch(singleProjectQuery, {
		slug: params.slug
	});

    // console.log('Single Project:', project);

	if (!project) throw error(404, 'Project not found');

	return { project };
};
