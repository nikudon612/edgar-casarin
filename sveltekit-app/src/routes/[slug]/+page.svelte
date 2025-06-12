<script lang="ts">
	import ProjectPageMenu from '../../components/ProjectPageMenu.svelte';
	import ProjectCarousel from '../../components/ProjectCarousel.svelte';
	export let data;
	const project = data.project;

	console.log('Project data:', project);

	const layout = project?.layoutStyle || 'column';
</script>

<div class="container">
	<!-- Sidebar menu -->
	<aside class="menu">
		{#if project}
			<ProjectPageMenu {project} />
		{:else}
			<p>Loading menu…</p>
		{/if}
	</aside>

	<!-- Scrollable project content -->
	<main class="content">
		{#if project}
			<article>
				<!-- {#if project?.thumbnail?.asset?.url}
					<img src={project?.thumbnail?.asset?.url} alt="Project Thumbnail" />
				{/if} -->

				<section>
					{#if layout === 'threeRow'}
						<!-- Custom 3-image-per-row layout -->
						<div class="gallery-rows">
							{#each project?.galleryRows as row}
								<div class="image-row">
									{#each row?.images as img}
										<img src={img?.asset?.url} alt={project.title} />
									{/each}
								</div>
							{/each}
						</div>
					{:else}
						<!-- Column layout -->
						<ul class="gallery-column">
							{#each project?.mediaGallery as item}
								<li><img src={item?.asset?.url} alt={project.title} /></li>
							{/each}
						</ul>
					{/if}
				</section>
			</article>
		{:else}
			<p>Loading…</p>
		{/if}
		<ProjectCarousel currentSlug={project?.slug?.current} />
	</main>
</div>

<style>
	.container {
		display: flex;
		height: 100vh;
		overflow: hidden;
	}

	.menu {
		width: 340px;
		flex-shrink: 0;
		background: white;
	}

	.content {
		flex: 1;
		overflow-y: scroll;
	}

	.gallery-rows {
		width: 100%;
	}

	.gallery-rows .image-row {
		display: flex;
		margin-bottom: 1.5rem;
		align-items: flex-start; /* <-- This ensures top alignment */
	}

	.gallery-rows .image-row img {
		width: calc((100%) / 3); /* 3 images with 2rem total gap (2 x 1rem) */
		height: auto; /* keeps natural aspect ratio */
		object-fit: contain;
		display: block;
	}

	.gallery-column {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 0;
		list-style: none;
	}

	.gallery-column img {
		width: 100%;
		height: auto;
		display: block;
	}
</style>
