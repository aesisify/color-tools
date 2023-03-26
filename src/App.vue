<template>
	<div class="container bg-gray-700 mx-auto shadow-2xl h-screen flex flex-col">
		<navbar></navbar>
		<router-view class="max-h-fit overflow-y-scroll" />
		<notifications
			class="mt-3"
			position="bottom right" />
	</div>
</template>

<script>
	import navbar from "@/components/layout/Navbar.vue";
	export default {
		components: {
			navbar,
		},
	};
</script>

<style>
	/* width */
	::-webkit-scrollbar {
		width: 6px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		background: #1f2937;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #6366f1;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #555cd6;
	}
</style>
