<script lang="ts">
	import { onMount } from 'svelte';
	import ProjectCard from './ProjectCard.svelte';
	import VideoCard from './VideoCard.svelte';
	import type { Project } from '$lib/sanity/queries';

	export let projects: Project[];

	let scrollRef: HTMLDivElement;

	// Flatten & sort row2
	$: flatImages = projects
		.flatMap((proj) =>
			(proj.row2Images ?? []).map((imgObj) => ({
				_key: imgObj._key,
				type: imgObj.type,
				image: imgObj.image,
				videoRef: imgObj.videoFile?.asset?._ref,
				poster: imgObj.posterImage?.asset?.url,
				order: imgObj.order ?? Infinity,
				proj
			}))
		)
		.sort((a, b) => a.order - b.order);

	onMount(() => {
		const el = scrollRef;
		let rafId: number;

		// Width of one group (we'll render 3 copies)
		const groupWidth = el.scrollWidth / 3;

		// Start in the middle copy
		el.scrollLeft = groupWidth;

		const speed = 0.5; // px/frame

		// 1) Auto-scroll forward
		function animate() {
			el.scrollLeft -= speed;
			// if we've scrolled past the 2nd copy, wrap back
			if (el.scrollLeft >= groupWidth * 2) {
				el.scrollLeft -= groupWidth;
			}
			rafId = requestAnimationFrame(animate);
		}
		rafId = requestAnimationFrame(animate);

		// 2) Seamless manual scroll wrap
		const handleScroll = () => {
			if (el.scrollLeft <= 0) {
				el.scrollLeft += groupWidth;
			} else if (el.scrollLeft >= groupWidth * 2) {
				el.scrollLeft -= groupWidth;
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
	{#each [flatImages, flatImages, flatImages] as images, groupIdx}
		{#each images as item (item._key + '-r2-' + groupIdx)}
			{#if item.type === 'file' && item.videoRef}
				<VideoCard proj={item.proj} videoRef={item.videoRef} poster={item.poster} />
			{:else if item.type === 'image'}
				<ProjectCard proj={item.proj} row="row2" image={item.image} />
			{/if}
		{/each}
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
	}
	.scroll-wrapper::-webkit-scrollbar {
		display: none;
	}

	/* ensure project-card children behave identically */
	:global(.project-card) {
		flex: 0 0 auto;
		min-width: 300px; /* match your card width */
		height: 100%;
	}

	/* no transform-based animation here, scrollLeft takes care of direction */
</style>
