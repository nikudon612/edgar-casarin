<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import { PortableText } from '@portabletext/svelte';
	import { urlFor } from '$lib/sanity/image';
	import AboutPageMenu from '../../components/AboutPageMenu.svelte';

	export let data;

	const q = useQuery(data); // 👈 just like the template
	$: ({ data: about } = $q); // 👈 destructure reactively

	console.log('about:', data.options.initial.data);
</script>

<div class="layout-container">
	<!-- Left menu -->
	<aside class="menu">
		<AboutPageMenu />
	</aside>

	<!-- Scrollable content -->
	<main class="content">
		{#if about}
			<section class="bio-section">
				{#if about.bio}
					<div class="bio-text">
						<PortableText value={about?.bio} />
					</div>
				{/if}
				{#if about.image?.asset?._ref}
					<img
						src={urlFor(about.image).width(800).auto('format').url()}
						alt="Headshot"
						class="headshot"
					/>
				{/if}
			</section>
		{:else}
			<p class="loading">Loading about info...</p>
		{/if}
	</main>
</div>

<style>
	.layout-container {
		display: flex;
		height: 100vh;
		overflow: hidden;
	}

	.menu {
		width: 320px; /* Match project page width */
		flex-shrink: 0;
		overflow-y: auto;
		background: white;
	}

	.content {
		flex: 1;
		overflow-y: scroll;
		background-color: #f7f7f5;
		padding: 0; /* ✅ remove top padding if any */
	}

	.bio-section {
		display: flex;
		flex-direction: column;
		padding: 0 0.5rem; /* ✅ top and bottom padding removed */
		height: 100%;
	}
	.bio-text {
		display: block;
		font-size: 6rem;
		line-height: 109.00000000000001%;
		/* letter-spacing: -1%; */
		width: 100%;
	}
	:global(.bio-text p) {
		margin-block-start: 0em;
		color: #353535;
	}

	:global(.bio-text a) {
		color: #353535;
		/* text-decoration: none; */
		/* font-weight: 500; */
	}

	.bio-text p {
		margin: 0 !important;
	}

	.headshot {
		max-width: 100%;
		height: auto;
	}

	.loading {
		/* padding: 2rem; */
	}
</style>
