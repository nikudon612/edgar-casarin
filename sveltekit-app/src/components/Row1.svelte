<script lang="ts">
	import ProjectCard from './projectCard.svelte';
	import type { Project } from '$lib/sanity/queries';

	export let projects: Project[];
</script>

<div class="scroll-wrapper">
	<div class="row row-1">
		{#each projects as proj (proj._id)}
			<ProjectCard {proj} row="row1" />
		{/each}
		{#each projects as proj (proj._id + '-copy')}
			<ProjectCard {proj} row="row1" />
		{/each}
	</div>
</div>

<style>
	.scroll-wrapper {
		overflow: hidden;
		width: 100vw;
		position: relative;
	}

	.row-1 {
		display: flex;
		flex-direction: row;
		height: 48vh;
		animation: scroll-left 25s cubic-bezier(0.33, 1, 0.68, 1) infinite;
		will-change: transform;
	}

	@keyframes scroll-left {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}
</style>
