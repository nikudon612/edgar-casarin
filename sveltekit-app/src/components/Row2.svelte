<script lang="ts">
	import Card from './Card.svelte';
	import type { Post } from '$lib/sanity/queries';

	export let projects: Post[];
</script>

<div class="row row-2">
	{#each projects.filter(p => p.row2Image) as post}
		<Card post={post} imageOverride={post.row2Image} />
	{/each}
</div>
