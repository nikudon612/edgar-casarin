<script>
	import ProjectPageMenuMobile from './mobileProjectMenu.svelte';
	import ProjectCarousel from './ProjectCarousel.svelte';
	import { PortableText } from '@portabletext/svelte';

	export let project;
	export let projects;

	// we’ll capture two things:
	//  • linkHeight: how tall your fixed menu is
	//  • scrollY:   how far the user has scrolled the gallery
	let menuHeight = 0; // total fixed menu height
	let scrollY = 0; // how far gallery-scroll has moved

	function onLinkHeight(e) {
		menuHeight = e.detail.height;
	}
	function onScroll(e) {
		scrollY = e.target.scrollTop;
	}
</script>

<!-- MobileProjectLayout.svelte -->
<div class="mobile-gallery">
	<!-- 1) Nav always on top -->
	<ProjectPageMenuMobile {project} {scrollY} on:linksheight={onLinkHeight} class="mobile-nav" />

	<!-- START your scrollable gallery exactly under the links -->
	<div class="gallery-scroll" on:scroll={onScroll} style="margin-top: {menuHeight}px">
		<!-- 2) Description sits immediately under the nav, never scrolls -->
		<div class="project-desc">
			<PortableText value={project.description} />
		</div>

		{#if project.columnImages?.length}
			<div class="gallery-column">
				{#each project.columnImages as img}
					{#if img.type === 'image' && img.image}
						<img
							src={img.image.asset.url}
							alt={project.title}
							style="width:100%; height:auto; display:block;"
						/>
					{:else if img.type === 'video' && img.vimeoId}
						<div class="video-full">
							{#if img.playbackOption === 'controls'}
								<!-- controls-only -->
								<iframe
									src={`https://player.vimeo.com/video/${img.vimeoId}?muted=1&controls=1`}
									frameborder="0"
									allow="autoplay; fullscreen; picture-in-picture"
									allowfullscreen
									loading="lazy"
									style="width:100%; height:100%;"
								></iframe>
							{:else}
								<!-- autoplay+loop, no controls -->
								<iframe
									src={`https://player.vimeo.com/video/${img.vimeoId}?background=1&autoplay=1&loop=1&muted=1`}
									frameborder="0"
									allow="autoplay; fullscreen; picture-in-picture"
									allowfullscreen
									loading="lazy"
									style="width:100%; height:100%;"
								></iframe>
							{/if}
						</div>
					{/if}
				{/each}
			</div>
		{:else if project.galleryRows?.length}
			<!-- ROWS LAYOUT -->
			<div class="gallery-rows">
				{#each project.galleryRows as row}
					<div
						class={`image-row row-${row.rowLayout}`}
						style={row.disableGap ? 'margin-bottom: 0' : 'margin-bottom: 6rem'}
					>
						{#each row.images as item}
							{#if item.type === 'image' && item.image}
								<img
									src={item.image.asset.url}
									alt={project.title}
									style={`width: ${item.width}`}
								/>
							{:else if item.type === 'video' && item.vimeoId}
								<div class="video-item" style={`width: ${item.width}; aspect-ratio: 16/9;`}>
									{#if item.playbackOption === 'autoplayLoop'}
										<!-- Autoplay and loop video -->
										<iframe
											src={`https://player.vimeo.com/video/${item.vimeoId}?background=1&autoplay=1&loop=1&muted=1`}
											frameborder="0"
											allow="autoplay; fullscreen; picture-in-picture"
											allowfullscreen
											loading="lazy"
											style="width: 100%; height: 100%;"
										/>
									{:else}
										<!-- Normal video embed -->
										<iframe
											src={`https://player.vimeo.com/video/${item.vimeoId}` +
												`?background=${item.playbackOption === 'autoplayLoop' ? 1 : 0}` +
												`&muted=1` +
												`&loop=1`}
											frameborder="0"
											allow="autoplay; fullscreen; picture-in-picture"
											allowfullscreen
											loading="lazy"
											style="width: 100%; height: 100%;"
										></iframe>
									{/if}
								</div>
								<!-- {:else if item.type === 'file' && item.videoFileUrl}
											<video
												src={item.videoFileUrl}
												poster={item.posterImage?.asset?.url}
												style={`width: ${item.width};`}
												loading="lazy"
											></video> -->
							{/if}
						{/each}
					</div>
				{/each}
			</div>
		{:else}
			<!-- No layout defined yet -->
			<p>Project layout coming soon…</p>
		{/if}
		<div style="z-index: 15;">
			<ProjectCarousel {projects} currentSlug={project.slug.current} />
		</div>
	</div>
</div>

<style>
	.mobile-gallery {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	/* 1) Nav fixed at top */
	.mobile-nav {
		position: sticky; /* or fixed if you prefer */
		top: 0;
		z-index: 30;
		background: white;
		flex: 0 0 auto;
	}

	/* 2+3) This is the only scroll container */
	.gallery-scroll {
		flex: 1 1 auto;
		overflow-y: auto;
		position: relative;
	}

	/* 2) Description sticks at the top of the scroll container */
	.project-desc {
		position: sticky;
		top: 0; /* sits directly under the nav */
		z-index: 10; /* below the images */
		background: white;
		padding: 1rem;
		padding-top: 5.5rem;
	}

	/* 3) Gallery items are on top of the desc */
	.gallery-scroll img,
	.gallery-scroll iframe {
		display: block;
		width: 100%;
		height: auto;
	}

	/* To ensure they overlap the desc */
	.gallery-scroll > :not(.project-desc) {
		position: relative;
		z-index: 20;
	}
	.gallery-rows {
		background-color: #f7f7f5 !important;
	}
</style>
