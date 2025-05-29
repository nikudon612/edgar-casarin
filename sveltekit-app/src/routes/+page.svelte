<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import Row1 from '../components/Row1.svelte';
	import Row2 from '../components/Row2.svelte';
	import Welcome from '../components/Welcome.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: projects } = $q);
	$: console.log('homepage projects:', projects);

	$: row1Projects = projects.filter((p) => Array.isArray(p.row1Images) && p.row1Images.length > 0);
	$: row2Projects = projects.filter((p) => Array.isArray(p.row2Images) && p.row2Images.length > 0);
	$: console.log('row1Projects:', row1Projects);
	$: console.log('row2Projects:', row2Projects);
</script>

<title> Edgar Casarin - Design Services </title>

<section>
	{#if projects.length}
		{#if row1Projects.length}
			<h2>Row 1 Projects</h2>
			<Row1 projects={row1Projects} />
		{/if}
		{#if row2Projects.length}
			<h2>Row 2 Projects</h2>
			<Row2 projects={row2Projects} />
		{/if}
	{:else}
		<Welcome />
	{/if}
</section>
