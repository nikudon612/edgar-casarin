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
		flex-direction: row;
		/* overflow-x: auto; */
		overflow-y: hidden;
		/* gap: 2rem; */
		height: 48vh; /* or calc(50vh - nav height / padding) */
		scrollbar-width: none;
	}
</style>
