<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import ProjectCard from '../components/projectCard.svelte';
	import Row1 from '../components/Row1.svelte';
	import Row2 from '../components/Row2.svelte';
	import Welcome from '../components/Welcome.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: projects } = $q);
	$: console.log('homepage projects:', projects);

	// console.log('homepage projects:', data.options.initial.data);

	$: row1Projects = projects.filter((p) => p.row === 'row1');
	$: row2Projects = projects.filter((p) => p.row === 'row2');
	$: console.log('row1Projects:', row1Projects);
	$: console.log('row2Projects:', row2Projects);
</script>

<title> Edgar Casarin - Design Services </title>

<section>
	{#if projects.length}
		{#each projects as proj}
			<ProjectCard {proj} />
		{/each}
		<Row1 projects={row1Projects} />
		<Row2 projects={row2Projects} />
	{:else}
		<Welcome />
	{/if}
	<!-- {#if posts.length}
		{#each posts as post}
			<Card {post} />
		{/each}
	{:else}
		<Welcome />
	{/if} -->
</section>
