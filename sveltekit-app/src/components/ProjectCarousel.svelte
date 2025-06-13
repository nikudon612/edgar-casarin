<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let projects = [];
	export let currentSlug: string;

	let filteredProjects = [];

	onMount(() => {
		filteredProjects = projects.filter((p) => p.slug.current !== currentSlug);
		// Duplicate projects to simulate infinite scrolling
		filteredProjects = [...filteredProjects, ...filteredProjects];
	});

	console.log('Filtered projects:', filteredProjects);
</script>

<section class="carousel-wrapper">
	<h2 class="label">More Projects</h2>
	<div class="carousel-track">
		{#each filteredProjects as project, i (project._id + '-' + i)}
			<div class="carousel-item" on:click={() => goto(`/${project.slug.current}`)}>
				{#if project.thumbnail?.asset?.url}
					<img src={project?.thumbnail?.asset?.url} alt={project.title} />
				{:else}
					<div class="placeholder">No Image</div>
				{/if}
			</div>
		{/each}
	</div>
	<h2 class="label right">The Quick</h2>
</section>

<style>
	.carousel-wrapper {
		position: relative;
		width: 100%;
		overflow: hidden;
		background: white;
		display: flex;
		flex-direction: column;
		align-items: start;
		padding: 1rem 0;
		/* gap: 1rem; */
		height: 235px;
	}

	.label {
		flex: 0 0 auto;
		font-size: 0.875rem;
		padding: 0 1rem;
		color: #353535;
	}

	.label.right {
		margin-left: auto;
	}

	.carousel-track {
		display: flex;
		flex: 1 1 auto;
		animation: scrollLeft 40s linear infinite;
	}

	.carousel-item {
		flex: 0 0 auto;
		width: 160px;
		cursor: pointer;
	}

	.carousel-item img {
		width: 100%;
		height: auto;
		display: block;
	}

	.placeholder {
		width: 100%;
		height: 200px;
		background: #eee;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.875rem;
		color: #353535;
	}
</style>
