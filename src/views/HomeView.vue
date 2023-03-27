<template>
	<main class="p-6">
		<div class="prose prose-invert mx-auto">
			<readme class="w-full"></readme>
		</div>
	</main>
</template>

<script>
	import readme from "../../README.md";
	export default {
		components: {
			readme,
		},
	};
</script>
