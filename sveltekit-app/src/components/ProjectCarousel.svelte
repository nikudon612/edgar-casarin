<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { urlFor } from '$lib/sanity/image';

	export let projects;
	export let currentSlug: string;

	// console.log('projects carousel:', projects);
	// console.log('current slug:', currentSlug);

	let filteredProjects = [];

	// ✅ Use reactive block instead of onMount
	$: if (projects?.length && currentSlug) {
		// console.log('→ currentSlug:', currentSlug);
		// console.log(
		// 	'→ available slugs:',
		// 	projects.map((p) => p.slug?.current)
		// );

		const normalizedCurrentSlug = currentSlug.trim();

		filteredProjects = projects.filter((p) => {
			const projectSlug = p.slug?.current?.trim();
			const keep = projectSlug && projectSlug !== normalizedCurrentSlug;
			// console.log(`Comparing: "${projectSlug}" !== "${normalizedCurrentSlug}" → ${keep}`);
			return keep;
		});

		filteredProjects = [...filteredProjects]; // duplicate for scrolling
		console.log('→ Filtered projects:', filteredProjects);
	}

	// $: {
	// 	console.log('Checking currentSlug:', currentSlug);
	// 	projects?.forEach((p) => {
	// 		console.log(
	// 			'Comparing:',
	// 			p.slug.current,
	// 			'===',
	// 			currentSlug,
	// 			'->',
	// 			p.slug.current === currentSlug
	// 		);
	// 	});
	// }

	// console.log('Filtered projects:', filteredProjects);
</script>

<div class="label-wrapper">
	<h2 class="label">More Projects</h2>
	<h2 class="label right">Project Name</h2>
</div>
<section class="carousel-wrapper">
	<div class="carousel-track">
		{#each filteredProjects as project, i (project._id + '-' + i)}
			<a class="carousel-item" href={`/${project.slug.current}`}>
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
		background: white;
		display: flex;
		flex-direction: column;
		align-items: start;
		max-height: 235px;
	}

	.label-wrapper {
		display: flex;
		width: 100%;
		align-items: start;
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

	.carousel-item {
		flex: 0 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		max-height: 213px;
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
