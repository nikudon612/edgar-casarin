<script lang="ts">
	import { urlFor } from '$lib/sanity/image';
	import type { Project } from '$lib/sanity/queries';

	export let proj: Project;
	export let row: 'row1' | 'row2';

	$: images = row === 'row1' ? (proj.row1Images ?? []) : (proj.row2Images ?? []);
</script>

{#if images.length > 0}
	{#each images as image}
		<a class="project-card" href={`/${proj.slug.current}`}>
			<img
				class="project-card__image"
				src={urlFor(image).width(1000).auto('format').url()}
				alt={`Image for ${proj.title}`}
			/>
		</a>
	{/each}
{:else}
	<a class="project-card" href={`/${proj.slug.current}`}>
		<div class="project-card__image--none" />
	</a>
{/if}

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
		width: auto;
		object-fit: cover;
		display: block;
	}

	.project-card__image--none {
		width: 100%;
		height: 300px;
		background-color: #ccc;
	}
</style>
