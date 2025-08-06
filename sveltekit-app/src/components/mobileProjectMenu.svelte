<!-- src/components/mobileProjectMenu.svelte -->
<script>
	import { onMount, createEventDispatcher } from 'svelte';

	// Props:
	//  • project: the current project object
	//  • scrollY:  how far the gallery has scrolled (in px)
	export let project;
	export let scrollY = 0;

	const dispatch = createEventDispatcher();

	// We only need to measure this one element
	let linkEl;
	let linkHeight = 0;

	// When this component mounts, read the height of the link row
	onMount(() => {
		linkHeight = linkEl.offsetHeight;
		// Tell the parent/layout how tall to push the gallery down
		dispatch('linksheight', { height: linkHeight });
	});

	// Compute Y offset: start at linkHeight, slide up to 0
	$: titleY = Math.max(linkHeight - scrollY, 0);
</script>

<div class="mobile-page-menu">
	<div class="mobile-menu-links" bind:this={linkEl}>
		<a href="/" class="portfolio">Portfolio</a>

		<!-- Title now lives inside the same flex row -->
		<div class="project-title-wrapper" style="transform: translateY({titleY}px);">
			<p class="project-menu-title">{project?.title}</p>
		</div>

		<a href="/info" class="info">Info</a>
	</div>
</div>

<style>
	@media (max-width: 768px) {
		.mobile-page-menu {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			background: white;
			z-index: 1000;
		}

		.mobile-menu-links {
			position: relative; /* for absolute children */
			display: flex;
			align-items: center; /* vertically center links/title */
			justify-content: space-between;
			padding: 1rem;
		}

		.project-title-wrapper {
			position: absolute; /* taken out of normal flow */
			left: 50%;
			transform: translateX(-50%) /* center horizontally */ translateY(var(--y)); /* overridden inline */
			transition: transform 0.1s linear;
			pointer-events: none; /* clicks pass through */
		}

		.project-menu-title {
			margin: 0;
			font-size: 1.125rem;
			white-space: nowrap;
		}

		/* Optional: style your links */
		.mobile-menu-links a {
			text-decoration: none;
			color: #333;
			font-weight: 500;
		}
	}
</style>
