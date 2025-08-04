<script lang="ts">
	import { hoveredProjectName } from '$lib/stores';
	import { fileUrlFor } from '$lib/sanity/fileUrl';
	import type { Project } from '$lib/sanity/queries';

	export let proj: Project;
	export let videoRef: string; // the raw "file-…-webm" ref
	export let poster: string; // optional

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
	<video class="project-card__image" {poster} autoplay loop muted playsinline>
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
	}
</style>
