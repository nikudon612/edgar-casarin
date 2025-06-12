<script>
	import { onMount } from 'svelte';

	export let project;

	console.log('Project page data:', project);
</script>

<div>
	<a href="/">Portfolio</a>
	{#if project}
		<div>
			<h3>{project.title}</h3>
			<p>{project.description}</p>
		</div>
	{:else}
		<p>Loading project data...</p>
	{/if}
	<a href="/about">Info</a>
</div>
