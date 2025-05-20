<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import { PortableText } from '@portabletext/svelte';

	export let data;

	const q = useQuery(data); // 👈 just like the template
	$: ({ data: about } = $q); // 👈 destructure reactively

	console.log('about:', about);
</script>

{#if about}
	<section>
		{#if about?.headshot?.asset?.url}
			<img src={about.headshot.asset.url} alt="Headshot" />
		{/if}

		{#if about?.bio}
			<PortableText value={about.bio} />
		{/if}

		<!-- {#if about?.email}
			<p>Email: <a href={`mailto:${about.email}`}>{about.email}</a></p>
		{/if} -->
	</section>
{:else}
	<p>Loading about info...</p>
{/if}
