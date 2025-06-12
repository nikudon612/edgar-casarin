<script lang="ts">
	import ProjectPageMenu from '../../components/ProjectPageMenu.svelte';
	import ProjectCarousel from '../../components/ProjectCarousel.svelte';
	export let data;
	const project = data.project;

	console.log('Project data:', project);
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
				{#if project?.thumbnail?.asset?.url}
					<img src={project?.thumbnail?.asset?.url} alt="Project Thumbnail" />
				{/if}

				<section>
					<h2>Gallery</h2>
					<ul>
						{#each project?.mediaGallery as item}
							<li><img src={item?.asset?.url} alt={project.title} /></li>
						{/each}
					</ul>
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
</style>
