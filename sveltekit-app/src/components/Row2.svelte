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
	display: flex;
	overflow-x: scroll;
	scroll-behavior: auto;
	width: 100%;
	flex: 1;
	scrollbar-width: none;
}

	.row-2 {
		display: flex;
		flex-direction: row;
		width: max-content;
		height: 100%;
		animation: scroll-right 90s linear infinite;
		will-change: transform;
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
