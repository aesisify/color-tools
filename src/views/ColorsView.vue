<template>
	<lazy-list
		:data="colors"
		:itemsPerRender="100"
		containerClasses="flex gap-2 flex-wrap items-center justify-center p-6"
		defaultLoadingColor="#6366f1">
		<template v-slot="{ item }">
			<div
				class="group aspect-square w-32 hover:z-10 hover:scale-150 hover:shadow-xl relative shadow transition-all"
				:style="{ background: item.hex }">
				<div
					class="truncate absolute bottom-0 group-hover:text-[0.5625rem] group-hover:text-clip bg-gray-800 bg-opacity-75 w-full text-xs tracking-tighter text-center p-1 select-none">
					<div>
						{{ item.name }}
					</div>
					<div class="text-gray-400">
						{{ item.hex }}
					</div>
				</div>
				<div
					class="hidden group-hover:flex absolute w-full bottom-0 translate-y-full text-xs rounded-b overflow-hidden">
					<div class="bg-gray-900 w-full">
						<div class="flex flex-col divide-y divide-gray-800">
							<div
								@click="copyToClipboard(item)"
								class="flex items-center justify-start gap-1 p-2 hover:bg-indigo-500 cursor-pointer text-[0.5625rem]">
								<Icon
									class="h-3 w-3"
									icon="ph:copy"></Icon>
								<div>Copy Hex</div>
							</div>
							<router-link
								:to="{ name: 'rampgen', query: { color: item.hex } }"
								class="flex items-center justify-start gap-1 p-2 hover:bg-indigo-500 cursor-pointer text-[0.5625rem]">
								<Icon
									icon="ph:palette"
									class="h-3 w-3"></Icon>
								<div class="truncate">Send to Rampgen</div>
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</template>
	</lazy-list>
</template>

<script>
	import { useAppStore } from "../stores/app";

	export default {
		data() {
			return {
				appStore: useAppStore(),
				colors: [],
			};
		},
		created() {
			this.colors = this.appStore.colors.sort((a, b) => 0.5 - Math.random());
		},
		methods: {
			copyToClipboard(item) {
				navigator.clipboard.writeText(item.hex);
				this.$notify({
					type: "info",
					title: item.name.toUpperCase(),
					text: `Copied HEX value: <b> ${item.hex} </b>`,
				});
			},
		},
	};
</script>
