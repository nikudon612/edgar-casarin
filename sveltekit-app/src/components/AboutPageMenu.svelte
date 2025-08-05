<script>
</script>

<div class="about-page-menu">
	<a href="/" style="text-decoration: none;" class="portfolio">Edgar Casarin</a>
	<a href="/info" style="text-decoration: none; color:black" class="info">Info</a>
	<a href="mailto:@design@edgarcasarin.xyz" style="text-decoration: none;" class="info"
		>design@edgarcasarin.xyz</a
	>
</div>
<div class="mobile-menu">
	<div class="mobile-menu-top">
		<a href="/" style="text-decoration: none;" class="portfolio">Edgar Casarin</a>
		<a href="mailto:@design@edgarcasarin.xyz" style="text-decoration: none;" class="info"
			>design@edgarcasarin.xyz</a
		>
	</div>
	<div class="mobile-menu-bottom">
		<a href="/info" style="text-decoration: none; color:black" class="info">INFO</a>
	</div>
</div>

<style>
	.about-page-menu {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		height: 100vh;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		overflow-y: hidden;
	}
	.mobile-menu {
		display: none;
	}
	.portfolio {
		font-size: 0.875rem;
		padding-top: 0.75rem;
		letter-spacing: 2%;
		line-height: 118%;
		color: #353535;
	}
	.info {
		font-size: 0.875rem;
		padding-bottom: 0.75rem;
		color: #353535;
	}

	@media (max-width: 768px) {
		.project-page-menu {
			display: none;
		}
		.mobile-menu {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			height: 100px;
			padding-left: 0.5rem;
			padding-right: 0.5rem;
		}
		.mobile-menu-top {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			padding-top: 0.5rem;
		}
		.mobile-menu-bottom {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			width: 100%;
			padding-bottom: 0.75rem;
		}
		.portfolio {
			font-size: 1rem;
			padding-top: 0rem;
			letter-spacing: 2%;
			line-height: 118%;
		}
		.info {
			font-size: 1rem;
			padding-bottom: 0rem;
		}
	}
</style>
