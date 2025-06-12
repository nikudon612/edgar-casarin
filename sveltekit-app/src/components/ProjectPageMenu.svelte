<script>
	import { onMount } from 'svelte';

	export let project;

	// console.log('Project page data:', project);
</script>

<div class="project-page-menu">
	<a href="/" style="text-decoration: none; color:black" class="portfolio">Portfolio</a>
	{#if project}
		<div class="project-menu-info-container">
			<p class="project-menu-title">{project.title}</p>
			<p class="project-menu-desc">{project.description}</p>
		</div>
	{:else}
		<p>Loading project data...</p>
	{/if}
	<a href="/about" style="text-decoration: none; color:black" class="info">Info</a>
</div>

<style>
	.project-page-menu {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		height: 100vh;
        padding-left: 0.75rem;
        padding-right: 0.75rem;
		overflow-y: hidden;
        
	}
	.project-menu-info-container {
		text-align: center;
	}
	.project-menu-desc {
		font-size: 0.875rem;
	}
	.project-menu-title {
		font-size: 0.875rem;
		font-weight: bold;
	}
	.portfolio {
		font-size: 0.875rem;
        padding-top: 0.75rem;
	}
	.info {
		font-size: 0.875rem;
        padding-bottom: 0.75rem;
	}
</style>
