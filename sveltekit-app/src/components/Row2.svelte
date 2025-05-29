<script lang="ts">
	import ProjectCard from './projectCard.svelte';
	import type { Project } from '$lib/sanity/queries';

	export let projects: Project[];
</script>

<div class="row row-2">
	{#each projects as proj}
		<ProjectCard {proj} row="row2" />
	{/each}
</div>

<style>
	.row-2 {
		display: flex;
		overflow-x: scroll;
		/* gap: 1rem; */
		/* Add animation styles here if needed */
	}
</style>
