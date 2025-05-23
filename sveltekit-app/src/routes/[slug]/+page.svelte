<script lang="ts">
	export let data;
	const project = data.project;
</script>

{#if project}
	<article>
		<h1>{project.title}</h1>
		<p>{project.description}</p>

		<!-- Render thumbnail -->
		{#if project.thumbnail?.asset?._ref}
			<p>Thumbnail ref: {project.thumbnail.asset._ref}</p>
			<!-- Optional: render the image via urlFor helper -->
		{/if}

		<!-- Render gallery -->
		<section>
			<h2>Gallery</h2>
			<ul>
				{#each project.mediaGallery as item}
					<li>{item._type} - {item.asset._ref}</li>
				{/each}
			</ul>
		</section>
	</article>
{:else}
	<p>Loading…</p>
{/if}
