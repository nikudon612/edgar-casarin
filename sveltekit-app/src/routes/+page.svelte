<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import Row1 from '../components/Row1.svelte';
	import Row2 from '../components/Row2.svelte';
	import Welcome from '../components/Welcome.svelte';
	import type { PageData } from './$types';
	import { hoveredProjectName } from '../lib/stores';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: projects } = $q);
	$: console.log('homepage projects:', projects);

	// Helper to get the lowest order value from an array of images
	function getMinOrder(images) {
		return images?.length ? Math.min(...images.map((img) => img.order ?? Infinity)) : Infinity;
	}

	$: row1Projects = projects
		.filter((p) => Array.isArray(p.row1Images) && p.row1Images.length > 0)
		.sort((a, b) => getMinOrder(a.row1Images) - getMinOrder(b.row1Images))
		.map((p) => ({
			...p,
			row1Images: [...p.row1Images].sort((a, b) => a.order - b.order)
		}));

	$: row2Projects = projects
		.filter((p) => Array.isArray(p.row2Images) && p.row2Images.length > 0)
		.sort((a, b) => getMinOrder(a.row2Images) - getMinOrder(b.row2Images))
		.map((p) => ({
			...p,
			row2Images: [...p.row2Images].sort((a, b) => a.order - b.order)
		}));

	// $: console.log('row1Projects:', row1Projects);
	// $: console.log('row2Projects:', row2Projects);
</script>

<title> Edgar Casarin - Design Services </title>

<section>
	{#if projects.length}
		{#if row1Projects.length}
			<Row1 projects={row1Projects} row="row1" />
		{/if}
		<!-- Navigation Section -->
		<div class="row-nav">
			<h2 class="name">Edgar Casarin</h2>
			<p class="center-text">{$hoveredProjectName}</p>
			<a href="/about" class="info">Info</a>
		</div>
		{#if row2Projects.length}
			<Row2 projects={row2Projects} row="row2" />
		{/if}
	{:else}
		<Welcome />
	{/if}
</section>

<style>
	section {
		width: 100%;
		height: 100vh;
		margin: 0;
		padding: 0;
	}
	.row-nav {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 3vh;
		padding: 0 1rem;
	}

	/* This will pin the middle <p> dead center, independent of left/right content */
	.center-text {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		margin: 0;
		font-size: 0.875rem;
		pointer-events: none; /* optional: prevents hover overlap issues */
	}

	h2 {
		margin: 0;
		font-size: 1.5rem;
	}

	a:hover {
		text-decoration: underline;
	}
	.name {
		font-size: 0.875rem;
	}
	.info {
		font-size: 0.875rem;
		text-decoration: none;
		color: var(--primary-color);
	}
</style>
