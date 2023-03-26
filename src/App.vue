<template>
	<div class="container bg-gray-700 mx-auto shadow-2xl h-screen flex flex-col">
		<navbar></navbar>
		<router-view class="max-h-fit overflow-y-auto" />
		<notifications
			class="mt-3"
			position="bottom right" />
		<div class="absolute bottom-0 right-0 text-xs flex gap-1 items-center m-1">
			<Icon
				class="h-4 w-4"
				icon="ph:code-light"></Icon>
			with
			<Icon
				class="h-4 w-4 text-red-500"
				icon="ph:heart-light"></Icon>
			by
			<a
				class="underline text-indigo-300"
				href="https://github.com/aesisify/"
				target="_blank">
				Aesisify
			</a>
		</div>
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
