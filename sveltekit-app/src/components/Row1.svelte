<script lang="ts">
	import Card from './Card.svelte';
	import type { Post } from '$lib/sanity/queries';

	export let projects: Post[];
</script>

<div class="row row-1">
	{#each projects.filter(p => p.row1Image) as post}
		<Card post={post} imageOverride={post.row1Image} />
	{/each}
</div>
