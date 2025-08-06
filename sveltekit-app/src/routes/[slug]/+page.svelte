<script lang="ts">
	import ProjectPageMenu from '../../components/ProjectPageMenu.svelte';
	import ProjectCarousel from '../../components/ProjectCarousel.svelte';

	export let data;
	const project = data.project;
	const projects = data.projects;

	// console.log('Project data:', project);
	// console.log('Projects data:', projects);
</script>

<svelte:head>
	<title>{project?.title} - Edgar Casarin</title>
	<meta name="description" content={project?.description || 'View project details'} />

	<!-- Open Graph -->
	<meta property="og:title" content={project?.title} />
	<meta property="og:description" content={project?.description || 'View project details'} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={`https://edgarcasarin.com/${project?.slug?.current}`} />
	{#if project?.thumbnail?.asset?.url}
		<meta property="og:image" content={project.thumbnail.asset.url} />
	{/if}

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={project?.title} />
	<meta name="twitter:description" content={project?.description || 'View project details'} />
	{#if project?.thumbnail?.asset?.url}
		<meta name="twitter:image" content={project.thumbnail.asset.url} />
	{/if}
</svelte:head>

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
							{#each project.columnImages as img}
								{#if img.type === 'image' && img.image}
									<img
										src={img.image.asset.url}
										alt={project.title}
										style="width:100%; height:auto; display:block;"
									/>
								{:else if img.type === 'video' && img.vimeoId}
									<div class="video-full">
										{#if img.playbackOption === 'controls'}
											<!-- controls-only -->
											<iframe
												src={`https://player.vimeo.com/video/${img.vimeoId}?muted=1&controls=1`}
												frameborder="0"
												allow="autoplay; fullscreen; picture-in-picture"
												allowfullscreen
												loading="lazy"
												style="width:100%; height:100%;"
											></iframe>
										{:else}
											<!-- autoplay+loop, no controls -->
											<iframe
												src={`https://player.vimeo.com/video/${img.vimeoId}?background=1&autoplay=1&loop=1&muted=1`}
												frameborder="0"
												allow="autoplay; fullscreen; picture-in-picture"
												allowfullscreen
												loading="lazy"
												style="width:100%; height:100%;"
											></iframe>
										{/if}
									</div>
								{/if}
							{/each}
						</div>
					{:else if project.galleryRows?.length}
						<!-- ROWS LAYOUT -->
						<div class="gallery-rows">
							{#each project.galleryRows as row}
								<div
									class={`image-row row-${row.rowLayout}`}
									style={row.disableGap ? 'margin-bottom: 0' : 'margin-bottom: 6rem'}
								>
									{#each row.images as item}
										{#if item.type === 'image' && item.image}
											<img
												src={item.image.asset.url}
												alt={project.title}
												style={`width: ${item.width}`}
											/>
										{:else if item.type === 'video' && item.vimeoId}
											<div class="video-item" style={`width: ${item.width}; aspect-ratio: 16/9;`}>
												{#if item.playbackOption === 'autoplayLoop'}
													<!-- Autoplay and loop video -->
													<iframe
														src={`https://player.vimeo.com/video/${item.vimeoId}?background=1&autoplay=1&loop=1&muted=1`}
														frameborder="0"
														allow="autoplay; fullscreen; picture-in-picture"
														allowfullscreen
														loading="lazy"
														style="width: 100%; height: 100%;"
													/>
												{:else}
													<!-- Normal video embed -->
													<iframe
														src={`https://player.vimeo.com/video/${item.vimeoId}` +
															`?background=${item.playbackOption === 'autoplayLoop' ? 1 : 0}` +
															`&muted=1` +
															`&loop=1`}
														frameborder="0"
														allow="autoplay; fullscreen; picture-in-picture"
														allowfullscreen
														loading="lazy"
														style="width: 100%; height: 100%;"
													></iframe>
												{/if}
											</div>
											<!-- {:else if item.type === 'file' && item.videoFileUrl}
											<video
												src={item.videoFileUrl}
												poster={item.posterImage?.asset?.url}
												style={`width: ${item.width};`}
												loading="lazy"
											></video> -->
										{/if}
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
		z-index: 1; /* above the menu */
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

	.video-full {
		width: 100%;
		aspect-ratio: 16 / 9;
		position: relative;
		margin-bottom: 4rem;
	}

	.video-full iframe {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		border: 0;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.content {
			position: relative;
			top: 4rem; /* ← same value as .mobile-page-menu height */
			height: calc(100vh - 4rem);
			overflow-y: auto;
			z-index: 1;
		}
		.container {
			display: flex;
			flex-direction: column;
			height: 100vh;
			overflow: hidden;
		}
		.project-page-menu {
			display: none; /* Hide menu on smaller screens */
		}
		.container {
			flex-direction: column;
		}

		.menu {
			height: auto;
			/* max-height: 506px; */
			width: 100%;
			flex-shrink: 0;
		}
	}
</style>
