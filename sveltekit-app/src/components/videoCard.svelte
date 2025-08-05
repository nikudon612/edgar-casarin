<script lang="ts">
	import { hoveredProjectName } from '$lib/stores';
	import { fileUrlFor } from '$lib/sanity/fileUrl';
	import { lazyVideo } from '$lib/loaders/lazyVideo';
	import type { Project } from '$lib/sanity/queries';

	export let proj: Project;
	export let videoRef: string; // the raw "file-…-webm" ref
	export let poster: string; // optional

	let vid: HTMLVideoElement;

	function handleMouseEnter() {
		hoveredProjectName.set(proj.title);
	}
	function handleMouseLeave() {
		hoveredProjectName.set('');
	}
</script>

<a
	class="project-card"
	href={`/${proj.slug.current}`}
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
>
	<video class="project-card__image" {poster} autoplay loop muted playsinline bind:this={vid}>
		{#if videoRef.endsWith('.webm')}
			<source src={fileUrlFor(videoRef)} type="video/webm" />
		{:else}
			<source src={fileUrlFor(videoRef)} type="video/mp4" />
		{/if}
		Sorry, your browser doesn’t support embedded videos.
	</video>
</a>

<style>
	.project-card {
		flex: 0 0 auto;
		height: 100%;
		width: auto;
		display: block;
		overflow: hidden;
		position: relative;
	}

	.project-card__image {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		-webkit-object-fit: cover; /* Safari */
	}

	@supports (-webkit-appearance: none) {
		.project-card {
			/* undo any global min-width */
			min-width: 0 !important;
			/* shrink to the video’s intrinsic width when height=100% */
			width: -webkit-min-content !important;
			width: min-content !important;
		}
		.project-card__image {
			/* let height drive the width via aspect ratio */
			width: auto !important;
			height: 100% !important;
			display: block !important; /* ensure no inline-gap */
		}
	}
</style>
