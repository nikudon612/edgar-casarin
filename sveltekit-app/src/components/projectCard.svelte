<script lang="ts">
	import { urlFor } from '$lib/sanity/image';
	import type { Project } from '$lib/sanity/queries';

	export let proj: Project;
</script>

<a class="project-card" href={`/project/${proj.slug.current}`}>
	{#if proj.thumbnail}
		<img
			class="project-card__image"
			src={urlFor(proj.thumbnail).width(1000).auto('format').url()}
			alt={`Cover image for ${proj.title}`}
		/>
	{:else}
		<div class="project-card__image--none" />
	{/if}

	<!-- Optional: Text overlay or title could go here -->
</a>

<style>
	.project-card {
		display: block;
		position: relative;
		width: auto;
		height: auto;
		overflow: hidden;
		text-decoration: none;
	}

	.project-card__image {
		display: block;
		width: 100%;
		height: auto;
		object-fit: cover;
	}

	.project-card__image--none {
		width: 100%;
		height: 300px;
		background-color: #ccc;
	}
</style>
