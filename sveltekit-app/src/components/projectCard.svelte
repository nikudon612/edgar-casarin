<script lang="ts">
	import { urlFor } from '$lib/sanity/image';
	import type { Project } from '$lib/sanity/queries';
	import { hoveredProjectName } from '$lib/stores'; // ✅ Add this

	export let proj: Project;
	export let row: 'row1' | 'row2';
	export let image: any; // This is a single image object from row1Images or row2Images

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
	{#if image?.asset?._ref}
		<img
			class="project-card__image"
			src={urlFor(image).width(1000).auto('format').url()}
			alt={`Image for ${proj.title}`}
		/>
	{:else}
		<div class="project-card__image--none" />
	{/if}
</a>

<style>
	.project-card {
		flex: 0 0 auto; /* prevents shrinking */
		height: 100%;
		width: auto; /* or set to 100vw if you want each image to take up full width */
		display: block;
		overflow: hidden;
		position: relative;
	}

	.project-card__image {
		height: 100%;
		width: 100%;
		object-fit: cover;
		display: block;
	}

	.project-card__image--none {
		width: 100%;
		height: 300px;
		background-color: #ccc;
	}
</style>
