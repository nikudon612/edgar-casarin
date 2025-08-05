<script>
	import { onMount } from 'svelte';
	import { PortableText } from '@portabletext/svelte';

	export let project;

	// console.log('Project page data:', project);
</script>

<div class="project-page-menu">
	<a href="/" style="text-decoration: none; color:black" class="portfolio">Portfolio</a>
	{#if project}
		<div class="project-menu-info-container">
			<p class="project-menu-title">{project.title}</p>
			<!-- <p class="project-menu-desc">{project.description}</p> -->
			<div class="project-menu-desc">
				<PortableText value={project.description} />
			</div>
		</div>
	{:else}
		<p style="color:black; font-size:14px">Loading project data...</p>
	{/if}
	<a href="/info" style="text-decoration: none; color:black" class="info">Info</a>
</div>

<div class="mobile-page-menu">
	<div class="mobile-menu-links">
		<a href="/" style="text-decoration: none; color:black" class="portfolio">Portfolio</a>
		<a href="/info" style="text-decoration: none; color:black" class="info">Info</a>
	</div>
	{#if project}
		<div class="project-menu-info-container">
			<p class="project-menu-title">{project.title}</p>
			<div class="project-menu-desc">
				<PortableText value={project.description} />
			</div>
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

	/* this will match any <a> inside a .project-menu-desc, even if Svelte didn’t inject it */
	:global(.project-menu-desc a) {
		color: #353535;
		text-decoration: underline;
	}

	@media (max-width: 768px) {
		.project-page-menu {
			display: none; /* Hide the desktop menu on mobile */
		}
		/* .mobile-page-menu {
			height: auto;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			width: 100%; 
			box-sizing: border-box;
			overflow-x: hidden;
			padding: 0.5rem;
			z-index: 0; 
			position: fixed;
			top: 0;
			left: 0;
		} */

		.mobile-page-menu {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 4rem; /* ← set this to your menu’s real height */
			background: white;
			z-index: 0;
		}
		.mobile-page-menu .project-menu-info-container {
			flex: 1;
			text-align: center;
		}

		.project-menu-desc {
			text-align: left;
			/* padding: 0.5rem; */
		}

		/* scope it to your project‐description container */
		/* make every <a> inside your description use #333 + underline */
		:global(.project-menu-desc a) {
			color: #333;
			text-decoration: underline;
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
