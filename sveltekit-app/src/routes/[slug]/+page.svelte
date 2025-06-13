<script lang="ts">
	import ProjectPageMenu from '../../components/ProjectPageMenu.svelte';
	import ProjectCarousel from '../../components/ProjectCarousel.svelte';
	export let data;
	const project = data.project;
	const projects = data.projects;

	// console.log('Project data:', project);
	console.log('Projects data:', projects);
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
				<section>
					<div class="gallery-rows">
						{#each project?.galleryRows as row}
							<div class={`image-row row-${row?.rowLayout}`}>
								{#each row?.images as img}
									<img src={img?.asset?.url} alt={project.title} />
								{/each}
							</div>
						{/each}
					</div>
				</section>
			</article>
		{:else}
			<p>Loading…</p>
		{/if}
		<ProjectCarousel {projects} currentSlug={project?.slug?.current} />
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

	.content::-webkit-scrollbar-track {
		background: transparent; /* no track background */
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

	/* Shared row layout */
	.image-row {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		margin-bottom: 1.5rem;
		padding-bottom: 6rem;
		/* max-width: 100vw; */
	}

	/* Layout: row of 3 */
	.row-three img {
		width: 33.3333%;
		flex-shrink: 0;
	}

	/* Row of 2 — exactly 1/2 each */
	.row-two img {
		width: 50vw;
		flex: 1 1 0;
	}

	/* Row of 1 — full width */
	.row-one img {
		width: 100%;
		display: block;
	}

	/* General image styling */
	.image-row img {
		display: block;
		object-fit: contain;
		height: auto;
	}
</style>
