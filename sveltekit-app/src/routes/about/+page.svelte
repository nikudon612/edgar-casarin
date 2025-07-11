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

<svelte:head>
	<title>{about?.metaTitle ?? 'About – Edgar Casarin'}</title>
	<meta
		name="description"
		content={about?.metaDescription ?? 'Learn more about Edgar Casarin and his creative work.'}
	/>

	<!-- Open Graph -->
	<meta property="og:title" content={'About – Edgar Casarin'} />
	<meta
		property="og:description"
		content={'Learn more about Edgar Casarin and his creative work.'}
	/>
	<meta property="og:type" content="profile" />
	<meta property="og:url" content="https://edgarcasarin.com/about" />
	<meta
		property="og:image"
		content={urlFor(about?.image).width(1200).height(630).auto('format').url()}
	/>

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={'About – Edgar Casarin'} />
	<meta
		name="twitter:description"
		content={'Learn more about Edgar Casarin and his creative work.'}
	/>
	<meta
		name="twitter:image"
		content={urlFor(about?.image).width(1200).height(630).auto('format').url()}
	/>
</svelte:head>

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
		padding: 0;
	}

	.bio-section {
		display: flex;
		flex-direction: column;
		padding: 0 0.5rem;
		height: 100%;
	}
	.bio-text {
		display: block;
		font-size: 6rem;
		line-height: 109.00000000000001%;
		width: 100%;
	}
	:global(.bio-text p) {
		margin-block-start: 0em;
		color: #353535;
	}

	:global(.bio-text a) {
		color: #353535;
	}

	.bio-text p {
		margin: 0 !important;
	}

	.headshot {
		width: 100%;
		max-width: 600px;
		height: auto;
		object-fit: contain;
		align-self: center;
	}

	@media (max-width: 768px) {
		
		.layout-container {
			flex-direction: column;
		}
		.menu {
			height: 100px;
			width: 100vw;
			flex-shrink: 0;
		}
		.bio-text {
			font-size: 2rem;
			line-height: 120%;
		}
	}

	@media (max-width: 415px) {
		.bio-text {
			font-size: 1.25rem;
			line-height: 130%;
		}
	}
</style>
