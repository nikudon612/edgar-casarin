<script lang="ts">
	import ProjectPageMenu from '../../components/ProjectPageMenu.svelte';
	export let data;
	const project = data.project;

	console.log('Project data:', project);
</script>

{#if project}
	<article>
		<!-- Render project menu -->
		<ProjectPageMenu {project} />

		<!-- Render thumbnail -->
		{#if project.thumbnail?.asset?.url}
			<img src={project.thumbnail.asset.url} alt="Project Thumbnail" />
			<!-- Optional: render the image via urlFor helper -->
		{/if}

		<!-- Render gallery -->
		<section>
			<h2>Gallery</h2>
			<ul>
				{#each project.mediaGallery as item}
					<img src={item.asset.url} alt={project.title} />
				{/each}
			</ul>
		</section>
	</article>
{:else}
	<p>Loading…</p>
{/if}
