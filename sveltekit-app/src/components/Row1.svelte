<script lang="ts">
	import { onMount } from 'svelte';
	import ProjectCard from './projectCard.svelte';
	import type { Project } from '$lib/sanity/queries';
	import { fileUrlFor } from '../lib/sanity/fileUrl';
	import VideoCard from './videoCard.svelte';

	export let projects: Project[];

	// console.log('Row1 projects:', projects);

	let outer: HTMLDivElement;
	let inner: HTMLDivElement;

	// flattened + sorted as before
	$: flatImages = projects
		.flatMap((proj) =>
			(proj.row1Images ?? []).map((imgObj) => ({
				type: imgObj.type,
				image: imgObj.image,
				vimeoId: imgObj.vimeoId,
				videoRef: imgObj.videoFile?.asset?._ref,
				order: imgObj.order ?? Infinity,
				proj
			}))
		)
		.sort((a, b) => a.order - b.order);

	onMount(() => {
		let rafId: number;
		let offset = 0;
		const speed = 0.5; // px/frame, tweak as needed

		// wait one frame so DOM is laid out
		requestAnimationFrame(() => {
			// measure total width of one “flatImages” group
			const totalWidth = inner.scrollWidth;
			const groupWidth = totalWidth / 3;

			// start in the middle copy
			outer.scrollLeft = groupWidth;

			// 1) animation loop (translateX on inner)
			const animate = () => {
				offset += speed;
				if (offset >= groupWidth) offset -= groupWidth;
				inner.style.transform = `translateX(${-offset}px)`;
				rafId = requestAnimationFrame(animate);
			};
			rafId = requestAnimationFrame(animate);

			// 2) seamless manual‐scroll wrap‐around
			const handleScroll = () => {
				if (outer.scrollLeft <= 0) {
					outer.scrollLeft += groupWidth;
				} else if (outer.scrollLeft >= groupWidth * 2) {
					outer.scrollLeft -= groupWidth;
				}
			};
			outer.addEventListener('scroll', handleScroll);

			return () => {
				cancelAnimationFrame(rafId);
				outer.removeEventListener('scroll', handleScroll);
			};
		});
	});
</script>

<!-- outer keeps your original CSS exactly as before -->
<div class="scroll-wrapper" bind:this={outer}>
	<!-- inner is purely a flex container we translate -->
	<div class="inner-wrapper" bind:this={inner}>
		{#each [flatImages, flatImages, flatImages] as images}
			{#each images as item, i (item.proj._id + '-r1-' + i)}
				{#if item.type === 'file' && item.videoRef}
					<VideoCard proj={item.proj} videoRef={item.videoRef} row="row1" />
				{:else if item.type === 'image'}
					<ProjectCard proj={item.proj} row="row1" image={item.image} />
				{:else}
					<div class="project-card__image--none">
						<p>No image or video available</p>
					</div>
				{/if}
			{/each}
		{/each}
	</div>
</div>

<style>
	/* ← your exact original wrapper rules ↓ */
	.scroll-wrapper {
		display: flex;
		overflow-x: scroll;
		scroll-behavior: auto;
		width: 100%;
		flex: 1;
		scrollbar-width: none;
		height: 48vh;
	}
	.scroll-wrapper::-webkit-scrollbar {
		display: none;
	}

	.video-wrapper {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9; /* ← lock in 16:9 */
		overflow: hidden;
	}

	.video-wrapper .video-iframe {
		position: absolute;
		inset: 0; /* shorthand for top:0; right:0; bottom:0; left:0; */
		width: 100%;
		height: 100%;
	}

	.project-link {
		display: block;
		text-decoration: none;
		color: inherit;
		flex: 0 0 auto;
		min-width: 300px;
		height: 100%; /* match ProjectCard height */
	}

	.video-iframe {
		position: absolute;
		top: 50%;
		left: 50%;
		/* ensure it always fills at least the container in both dimensions */
		min-width: 100%;
		min-height: 100%;
		/* we don’t need width/height explicitly—min-* will enforce cover */
		/* transform: translate(-50%, -50%); */
	}

	/* only new rule: hint to the browser we’ll animate this */
	.inner-wrapper {
		display: flex;
		height: 100%; /* now it knows how tall it should be */
		/* will-change: transform; */
	}

	/* same as before */
	:global(.project-card) {
		flex: 0 0 auto;
		min-width: 300px;
		height: 100%; /* will fill the 400px */
	}
</style>
