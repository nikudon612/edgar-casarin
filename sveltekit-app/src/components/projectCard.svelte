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
		<!-- {:else if videoFile?.asset?._ref}
		<div class="project-card__image">
			<p>video ref</p>
		</div> -->
	{:else}
		<div class="project-card__image--none" />
	{/if}
</a>

<style>
	/* — your existing, cross-browser styles — */ /* — your existing cross-browser rules — */
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
		-webkit-object-fit: cover;
	}

	/* — Safari/WebKit only override — */
	/* — Safari/WebKit only — */
	@supports (-webkit-appearance: none) {
		.project-card {
			/* undo your global 300px min-width */
			min-width: 0 !important;
			/* drive width from the image’s intrinsic aspect ratio */
			width: -webkit-min-content !important;
			width: min-content !important;
		}
		.project-card__image {
			/* ensure the img still fills 100% height + auto width */
			width: auto !important;
			height: 100% !important;
		}
	}

	.project-card__image--none {
		width: 100%;
		height: 100%;
		background-color: #ccc;
	}
</style>
