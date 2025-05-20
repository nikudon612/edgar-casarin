<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import Card from '../components/Card.svelte';
	import ProjectCard from '../components/projectCard.svelte';
	import Welcome from '../components/Welcome.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: projects } = $q);

	console.log("homepage projects:", data.options.initial.data);
</script>

<title>
	Edgar Casarin - Design Services
</title>

<section>
	{#if projects.length}
		{#each projects as proj}
			<ProjectCard {proj} />
		{/each}
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
