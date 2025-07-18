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
		<p style="color:black; font-size:14px">Loading project data...</p>
	{/if}
	<a href="/about" style="text-decoration: none; color:black" class="info">Info</a>
</div>
<div class="mobile-page-menu">
	<div class="mobile-menu-links">
		<a href="/" style="text-decoration: none; color:black" class="portfolio">Portfolio</a>
		<a href="/about" style="text-decoration: none; color:black" class="info">Info</a>
	</div>
	{#if project}
		<div class="project-menu-info-container">
			<p class="project-menu-title">{project.title}</p>
			<p class="project-menu-desc">{project.description}</p>
		</div>
	{:else}
		<p style="color:black; font-size:14px">Loading project data...</p>
	{/if}
</div>

<style>
	.project-page-menu {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		height: 100vh;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		overflow-y: hidden;
		text-align: left;
	}
	.project-menu-info-container {
		text-align: start;
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

	@media (max-width: 768px) {
		.project-page-menu {
			display: none; /* Hide the desktop menu on mobile */
		}
		.mobile-page-menu {
			height: auto;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			width: 100%; /* ✅ Avoid 100vw to prevent overflow */
			box-sizing: border-box;
			overflow-x: hidden;
			padding: 0.5rem;
		}
		.mobile-page-menu .project-menu-info-container {
			flex: 1;
			text-align: center;
		}

		.project-menu-desc {
			text-align: left;
			/* padding: 0.5rem; */
		}
		.mobile-page-menu .mobile-menu-links {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			width: 100%;
		}

		.info {
			padding-bottom: 0rem;
		}
		.portfolio {
			padding-top: 0rem;
		}
	}
</style>
