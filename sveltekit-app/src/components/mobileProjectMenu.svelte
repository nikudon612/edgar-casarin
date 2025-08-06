<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import { PortableText } from '@portabletext/svelte';

	const dispatch = createEventDispatcher();
	export let project;
	export let scrollY = 0; // how far user scrolled

	let rootEl; // the full fixed menu
	let linkEl; // just the portfolio/info row
	let menuHeight = 0;
	let linkHeight = 0;

	onMount(() => {
		menuHeight = rootEl.offsetHeight;
		linkHeight = linkEl.offsetHeight;
		dispatch('linksheight', { height: menuHeight });
	});

	// How far the title must move before it “locks” into the links row
	$: maxTravel = menuHeight - linkHeight;

	// Are we past that point?
	$: isStuck = scrollY >= maxTravel;

	// If not stuck, push it down by (maxTravel - scrollY)
	$: titleOffset = isStuck
		? linkHeight // lock into the bottom of the link row
		: maxTravel - scrollY; // slide from menuHeight → linkHeight
</script>

<div class="mobile-page-menu" bind:this={rootEl}>
	<!-- row‐1: Portfolio / Info -->
	<div class="mobile-menu-links" bind:this={linkEl}>
		<a href="/" class="portfolio">Portfolio</a>
		<a href="/info" class="info">Info</a>
	</div>

	{#if project}
		<!-- row‐2: project title -->
		<div
			class="project-menu-info-container"
			style="
        position: absolute;
        top: {titleOffset}px;
        left: 0;
        right: 0;
        transition: top 0.1s linear;
      "
		>
			<p class="project-menu-title">{project.title}</p>
		</div>
	{/if}
</div>

<style>
	@media (max-width: 768px) {
		.mobile-page-menu {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			/* height: 4rem;  */
			background: white;
			z-index: 1000;
		}
		/* 2) title now absolutely placed _inside_ that fixed box */
		.project-menu-info-container {
			text-align: center;
			background: white;
			pointer-events: none; /* let taps through if clickable below */
		}

		.project-menu-title {
			margin: 0.5rem 0;
			font-size: 1.125rem;
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
		.mobile-menu-links a {
			text-decoration: none;
			color: #333;
		}
		.mobile-page-menu .mobile-menu-links {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			width: 100%;
			text-decoration: none;
			color: #333;
		}

		.info {
			padding-bottom: 0rem;
		}
		.portfolio {
			padding-top: 0rem;
		}
	}
</style>
