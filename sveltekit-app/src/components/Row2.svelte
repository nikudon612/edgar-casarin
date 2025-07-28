<script lang="ts">
	import { onMount, tick } from 'svelte';
	import ProjectCard from './projectCard.svelte';
	import type { Project } from '$lib/sanity/queries';

	export let projects: Project[];

	let scrollWrapper: HTMLDivElement;

	// Flatten and sort images
	$: flatImages = projects
		.flatMap((proj) =>
			(proj.row2Images ?? []).map((imgObj) => ({
				image: imgObj.image,
				order: imgObj.order ?? Infinity,
				proj
			}))
		)
		.sort((a, b) => a.order - b.order);

	function handleScroll() {
		if (!scrollWrapper) return;

		const scrollWidth = scrollWrapper.scrollWidth;
		const viewWidth = scrollWrapper.clientWidth;
		const third = scrollWidth / 3;
		const scrollLeft = scrollWrapper.scrollLeft;

		// Scroll too far right → jump back to middle
		if (scrollLeft >= third * 2) {
			scrollWrapper.scrollLeft = scrollLeft - third;
		}

		// Scroll too far left → jump forward to middle
		if (scrollLeft <= third * 0.5) {
			scrollWrapper.scrollLeft = scrollLeft + third;
		}
	}

	onMount(async () => {
		await tick();
		if (scrollWrapper) {
			const third = scrollWrapper.scrollWidth / 3;
			scrollWrapper.scrollLeft = third;
		}
	});
</script>

<!-- Triple content to simulate infinite scroll -->
<div class="scroll-wrapper" bind:this={scrollWrapper} on:scroll={handleScroll}>
	<div class="row row-2">
		{#each [1, 2, 3] as _, setIndex}
			{#each flatImages as item, i (item.proj._id + '-' + setIndex + '-' + i)}
				<ProjectCard proj={item.proj} row="row2" image={item.image} />
			{/each}
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
		-ms-overflow-style: none;
	}
	.scroll-wrapper::-webkit-scrollbar {
		display: none;
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
