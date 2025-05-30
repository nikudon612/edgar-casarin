<script lang="ts">
	import ProjectCard from './projectCard.svelte';
	import { onMount } from 'svelte';
	import type { Project } from '$lib/sanity/queries';

	export let projects: Project[];
	export let reverse: boolean = false;

	let wrapper: HTMLDivElement;
	let row: HTMLDivElement;
	let offset = 0;
	let speed = 0.5;
	let isHovering = false;
	let raf: number;
	let rowWidth = 0;

	function loop() {
		if (!isHovering && row) {
			offset += reverse ? -speed : speed;

			if (Math.abs(offset) >= rowWidth / 2) {
				offset = 0;
			}

			row.style.transform = `translateX(${reverse ? offset : -offset}px)`;
		}

		raf = requestAnimationFrame(loop);
	}

	onMount(() => {
		rowWidth = row.scrollWidth;
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	});
</script>

<div
	bind:this={wrapper}
	class="scroll-wrapper"
	on:mouseenter={() => (isHovering = true)}
	on:mouseleave={() => (isHovering = false)}
>
	<div bind:this={row} class="row">
		{#each projects as proj (proj._id)}
			<ProjectCard {proj} row="row1" />
		{/each}
		{#each projects as proj (proj._id + '-copy')}
			<ProjectCard {proj} row="row2" />
		{/each}
	</div>
</div>

<style>
	.scroll-wrapper {
		overflow: hidden;
		width: 100vw;
		position: relative;
	}

	.row {
		display: flex;
		flex-wrap: nowrap;
		will-change: transform;
		height: 48vh;
	}
</style>
