<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { urlFor } from '$lib/sanity/image';

	export let projects;
	export let currentSlug: string;

	// console.log('projects carousel:', projects);
	// console.log('current slug:', currentSlug);

	let filteredProjects = [];

	function shuffleArray<T>(array: T[]): T[] {
		const arr = [...array];
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	}

	$: if (projects?.length && currentSlug) {
		const normalizedCurrentSlug = currentSlug.trim();

		const remaining = projects.filter((p) => {
			const projectSlug = p.slug?.current?.trim();
			return projectSlug && projectSlug !== normalizedCurrentSlug;
		});

		filteredProjects = shuffleArray(remaining); // 👈 shuffle before duplicating
		filteredProjects = [...filteredProjects]; // duplicate for seamless scroll, if needed
	}

	let hoveredProjectTitle: string = '';
</script>

<div class="label-wrapper">
	<h2 class="label">More Projects</h2>
	<h2 class="label right">{hoveredProjectTitle || ''}</h2>
</div>
<section class="carousel-wrapper">
	<div class="carousel-track">
		{#each filteredProjects as project, i (project._id + '-' + i)}
			<a
				class="carousel-item"
				href={`/${project.slug.current}`}
				on:mouseenter={() => (hoveredProjectTitle = project.title)}
				on:mouseleave={() => (hoveredProjectTitle = '')}
			>
				{#if project.thumbnail?.asset?._ref}
					<img
						src={urlFor(project.thumbnail).width(320).auto('format').url()}
						alt={project.title}
					/>
				{:else}
					<div class="placeholder">No Image</div>
				{/if}
			</a>
		{/each}
	</div>
</section>

<style>
	.carousel-wrapper {
		position: relative;
		width: 100%;
		overflow-x: auto;
		background-color: white !important;
		display: flex;
		flex-direction: column;
		align-items: start;
		max-height: 235px;
	}

	.label-wrapper {
		display: flex;
		width: 100%;
		align-items: start;
		background-color: white !important;
	}
	.label {
		flex: 0 0 auto;
		font-size: 0.875rem;
		color: #353535;
	}

	.label.right {
		margin-left: auto;
		padding-right: 0.5rem;
	}

	.carousel-track {
		display: flex;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
	}
	.carousel-track::-webkit-scrollbar {
		display: none; /* Chrome, Safari, Opera */
	}
	.carousel-item {
		flex: 0 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		max-height: 213px;
	}

	.carousel-item:hover {
		cursor: pointer;
	}

	.carousel-item img {
		display: block;
		height: 100%;
		width: 100%;
		max-height: 213px;
		object-fit: cover;
	}

	.placeholder {
		width: 100%;
		height: 213px;
		background: #eee;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.875rem;
		color: #353535;
	}
</style>
