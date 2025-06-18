<script lang="ts">
	import ProjectCard from './projectCard.svelte';
	import type { Project } from '$lib/sanity/queries';

	export let projects: Project[];

	$: flatImages = projects
		.flatMap((proj) =>
			(proj.row2Images ?? []).map((imgObj) => ({
				image: imgObj.image,
				order: imgObj.order ?? Infinity,
				proj
			}))
		)
		.sort((a, b) => a.order - b.order);
</script>

<div class="scroll-wrapper">
	<div class="row row-2">
		{#each flatImages as item, i (item.proj._id + '-' + i)}
			<ProjectCard proj={item.proj} row="row2" image={item.image} />
		{/each}
		{#each flatImages as item, i (item.proj._id + '-copy-' + i)}
			<ProjectCard proj={item.proj} row="row2" image={item.image} />
		{/each}
	</div>
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
		height: 48.5vh;
		animation: scroll-right 45s linear infinite;
		will-change: transform;

		/* ✅ Ensures content can scroll seamlessly */
		width: max-content;
	}

	@keyframes scroll-right {
		from {
			transform: translateX(-50%);
		}
		to {
			transform: translateX(0%);
		}
	}
</style>
