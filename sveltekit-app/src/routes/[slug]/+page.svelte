<script lang="ts">
	import ProjectPageMenu from '../../components/ProjectPageMenu.svelte';
	import ProjectCarousel from '../../components/ProjectCarousel.svelte';
	export let data;
	const project = data.project;
	const projects = data.projects;

	console.log('Project data:', project);
	// console.log('Projects data:', projects);
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
			<article class="project">
				<section>
					{#if project.columnImages?.length}
						<!-- COLUMN LAYOUT -->
						<div class="gallery-column">
							{#each project.columnImages ?? [] as img}
								<img src={img?.asset?.url} alt={project.title} />
							{/each}
						</div>
					{:else if project.galleryRows?.length}
						<!-- ROWS LAYOUT -->
						<div class="gallery-rows">
							{#each project.galleryRows ?? [] as row}
								<div
									class={`image-row row-${row?.rowLayout}`}
									style={row?.disableGap ? 'margin-bottom: 0' : 'margin-bottom: 6rem'}
								>
									{#each row.images ?? [] as item}
										<img
											src={item?.image?.asset?.url}
											alt={project.title}
											style={`width: ${item?.width || '100%'}`}
										/>
									{/each}
								</div>
							{/each}
						</div>
					{:else}
						<!-- No layout defined yet -->
						<p>Project layout coming soon…</p>
					{/if}
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

	.project {
		margin-bottom: 35rem;
	}

	.menu {
		width: 320px;
		flex-shrink: 0;
		background: white;
	}

	.content {
		flex: 1;
		overflow-y: scroll;
		background-color: #f7f7f5 !important;
	}

	.content::-webkit-scrollbar-track {
		background: transparent; /* no track background */
	}

	.gallery-rows {
		width: 100%;
		/* gap: 6rem; */
		display: flex;
		flex-direction: column;
	}

	.gallery-rows .image-row {
		display: flex;
		align-items: flex-start; /* <-- This ensures top alignment */
		flex-direction: row;
	}

	.gallery-rows .image-row img {
		height: auto; /* keeps natural aspect ratio */
		object-fit: contain;
		display: block;
	}

	.gallery-column {
		display: flex;
		flex-direction: column;
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
	}

	/* Layout: row of 3 */
	.row-three img {
		width: 33.3333%;
		flex-shrink: 0;
	}

	/* Row of 2 — exactly 1/2 each */
	.row-two img {
		width: 50%;
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
