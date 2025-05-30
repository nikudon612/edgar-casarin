<script lang="ts">
	import ProjectCard from './projectCard.svelte';
	import type { Project } from '$lib/sanity/queries';

	export let projects: Project[];
</script>

<div class="row row-2">
	{#each projects as proj}
		<ProjectCard {proj} row="row2" />
	{/each}
	{#each projects as proj (proj._id + '-copy')}
		<ProjectCard {proj} row="row2" />
	{/each}
</div>

<style>
	.scroll-wrapper {
		overflow: hidden;
		width: 100vw;
		position: relative;
	}

	.row-2 {
		display: flex;
		flex-direction: row;
		height: 48vh;
		animation: scroll-right 20s linear infinite;
		will-change: transform;
	}

	@keyframes scroll-right {
		from {
			transform: translateX(-50%);
		}
		to {
			transform: translateX(0);
		}
	}
</style>
