<script lang="ts">
	import ProjectCard from './projectCard.svelte';
	import type { Project } from '$lib/sanity/queries';

	export let projects: Project[];
</script>

<div class="row row-1">
	{#each projects as proj}
		<ProjectCard {proj} row="row1" />
	{/each}
</div>

<style>
	.row-1 {
		display: flex;
		overflow-x: scroll;
		/* gap: 1rem; */
		/* Add animation styles here if needed */
	}
</style>
