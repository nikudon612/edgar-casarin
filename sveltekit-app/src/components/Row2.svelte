<script lang="ts">
	import { onMount } from 'svelte';
	import ProjectCard from './projectCard.svelte';
	import type { Project } from '$lib/sanity/queries';

	export let projects: Project[];

	let scrollRef: HTMLDivElement;

	// Flatten and sort row2 images
	$: flatImages = projects
		.flatMap((proj) =>
			(proj.row2Images ?? []).map((imgObj) => ({
				image: imgObj.image,
				order: imgObj.order ?? Infinity,
				proj
			}))
		)
		.sort((a, b) => a.order - b.order);

	onMount(() => {
		const el = scrollRef;
		const third = () => el.scrollWidth / 3;

		// Start at center copy
		el.scrollLeft = third();

		let rafId: number;
		const scrollSpeed = 0.35;

		const animate = () => {
			el.scrollLeft -= scrollSpeed;

			if (el.scrollLeft > third() * 1.5) {
				el.scrollLeft -= third();
			}

			rafId = requestAnimationFrame(animate);
		};

		rafId = requestAnimationFrame(animate);

		const handleScroll = () => {
			if (el.scrollLeft < third() * 0.5) {
				el.scrollLeft += third();
			}
			if (el.scrollLeft > third() * 1.5) {
				el.scrollLeft -= third();
			}
		};

		el.addEventListener('scroll', handleScroll);

		return () => {
			cancelAnimationFrame(rafId);
			el.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<div class="scroll-wrapper" bind:this={scrollRef}>
	<!-- Copy A -->
	{#each flatImages as item, i (item.proj._id + '-a-' + i)}
		<ProjectCard proj={item.proj} row="row2" image={item.image} />
	{/each}

	<!-- Copy B (center) -->
	{#each flatImages as item, i (item.proj._id + '-b-' + i)}
		<ProjectCard proj={item.proj} row="row2" image={item.image} />
	{/each}

	<!-- Copy C -->
	{#each flatImages as item, i (item.proj._id + '-c-' + i)}
		<ProjectCard proj={item.proj} row="row2" image={item.image} />
	{/each}
</div>

<style>
	.scroll-wrapper {
		display: flex;
		overflow-x: scroll;
		scroll-behavior: auto;
		width: 100%;
		flex: 1;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
	.scroll-wrapper::-webkit-scrollbar {
		display: none;
	}

	:global(.project-card) {
		flex: 0 0 auto;
		min-width: 300px; /* Or match your actual card size */
	}

	/* Remove old transform-based animation */
	.row-2 {
		display: flex;
		flex-direction: row;
		width: max-content;
		height: 100%;
	}
</style>
