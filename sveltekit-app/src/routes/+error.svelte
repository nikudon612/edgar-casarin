<!-- src/routes/+error.svelte -->
<script>
	export let error;
	export let status;
</script>

<h1>{status}</h1>
<p>{error?.message || 'Page not found'}</p>
<a href="/">Back to home</a>
