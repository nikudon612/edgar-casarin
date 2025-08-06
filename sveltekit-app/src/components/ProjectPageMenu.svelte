<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import { PortableText } from '@portabletext/svelte';
	import MobileProjectMenu from '../components/mobileProjectMenu.svelte';

	export let project;

	const dispatch = createEventDispatcher();
	let menuEl;

	onMount(() => {
		// measure after render
		const height = menuEl.offsetHeight;
		dispatch('menuheight', { height });
	});

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

<MobileProjectMenu {project} bind:this={menuEl} on:menuheight />

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
		.project-menu-title {
			display: none;
		}
	}
</style>
