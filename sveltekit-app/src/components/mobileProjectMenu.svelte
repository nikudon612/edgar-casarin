<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import { PortableText } from '@portabletext/svelte';

	const dispatch = createEventDispatcher();
	export let project;
	let linksEl;

	onMount(() => {
		dispatch('linksheight', { height: linksEl.offsetHeight });
	});
</script>

<div class="mobile-page-menu" bind:this={linksEl}>
	<div class="mobile-menu-links">
		<a href="/" style="text-decoration: none; color:black" class="portfolio">Portfolio</a>
		<a href="/info" style="text-decoration: none; color:black" class="info">Info</a>
	</div>
	{#if project}
		<div class="project-menu-info-container">
			<p class="project-menu-title">{project.title}</p>
			<!-- <div class="project-menu-desc">
				<PortableText value={project.description} />
			</div> -->
		</div>
	{:else}
		<p style="color:black; font-size:14px">Loading project data...</p>
	{/if}
</div>

<style>
	@media (max-width: 768px) {
		.mobile-page-menu {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 4rem; /* ← set this to your menu’s real height */
			background: white;
			z-index: 1000;
		}

		.project-menu-info-container {
			position: relative;
			z-index: 10;
			padding: 1rem;
			background: white;
		}
		.mobile-page-menu .project-menu-info-container {
			flex: 1;
			text-align: center;
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
