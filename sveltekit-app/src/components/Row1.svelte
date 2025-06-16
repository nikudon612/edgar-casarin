<script lang="ts">
	import ProjectCard from './projectCard.svelte';
	import type { Project } from '$lib/sanity/queries';

	export let projects: Project[];

	// Flatten all images across all projects
	$: flatImages = projects
		.flatMap((proj) =>
			(proj.row1Images ?? []).map((imgObj) => ({
				image: imgObj.image,
				order: imgObj.order ?? Infinity,
				proj
			}))
		)
		.sort((a, b) => a.order - b.order);
</script>

<div class="scroll-wrapper">
	<div class="row row-1">
		{#each flatImages as item, i (item.proj._id + '-' + i)}
			<ProjectCard proj={item.proj} row="row1" image={item.image} />
		{/each}
		{#each flatImages as item, i (item.proj._id + '-copy-' + i)}
			<ProjectCard proj={item.proj} row="row1" image={item.image} />
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
		height: 49.25vh;
		animation: scroll-left 20s linear infinite;
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
