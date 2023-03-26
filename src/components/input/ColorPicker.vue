<template>
	<div class="flex flex-col gap-3">
		<div class="flex items-center gap-2">
			<input
				tabindex="-1"
				class="slider rounded"
				type="range"
				min="0"
				max="359"
				step="0.01"
				v-model="hsvInput.h"
				:style="{ background: sliderBackgrounds.h }" />
			<input
				type="text"
				class="truncate rounded bg-gray-800 text-center w-16 text-xs font-medium p-1 appearance-none outline-none border-none border-transparent focus:border-transparent focus:ring-0"
				v-model="hsvInput.h" />
		</div>

		<div class="flex items-center gap-2">
			<input
				tabindex="-1"
				class="slider rounded"
				type="range"
				min="0"
				max="100"
				step="0.01"
				v-model="hsvInput.s"
				:style="{ background: sliderBackgrounds.s }" />
			<input
				type="text"
				class="truncate rounded bg-gray-800 text-center w-16 text-xs font-medium p-1 appearance-none outline-none border-none border-transparent focus:border-transparent focus:ring-0"
				v-model="hsvInput.s" />
		</div>

		<div class="flex items-center gap-2">
			<input
				tabindex="-1"
				class="slider rounded"
				type="range"
				min="0"
				max="100"
				step="0.01"
				v-model="hsvInput.v"
				:style="{ background: sliderBackgrounds.v }" />
			<input
				type="text"
				class="truncate rounded bg-gray-800 text-center w-16 text-xs font-medium p-1 appearance-none outline-none border-none border-transparent focus:border-transparent focus:ring-0"
				v-model="hsvInput.v" />
		</div>

		<div class="flex gap-2">
			<input
				:style="{
					background: chromaObject?.hex(),
					color: hsvInput.v > 50 ? '#000' : '#FFF',
				}"
				type="text"
				class="rounded bg-gray-800 p-2 text-center font-medium appearance-none outline-none border-none border-transparent focus:border-transparent focus:ring-0 flex-grow"
				v-model="hexInput" />
			<div
				v-if="showEyedropper"
				@click="eyedropper()"
				class="p-1 w-12 h-12 bg-gray-800 rounded text-xs font-medium flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-all select-none">
				<Icon
					class="h-5 w-5"
					icon="ph:eyedropper-sample-fill"></Icon>
			</div>
			<div
				@click="randomize()"
				class="p-1 w-12 h-12 bg-gray-800 rounded text-xs font-medium flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-all select-none">
				<Icon
					class="h-5 w-5"
					icon="ph:shuffle-fill"></Icon>
			</div>
		</div>
	</div>
</template>

<script>
	import chroma from "chroma-js";

	export default {
		data() {
			return {
				showEyedropper: true,
				chromaObject: this.value,
				debounce: null,
				hexInput: null,
				hsvInput: {
					h: 0,
					s: 0,
					v: 0,
				},
			};
		},
		props: {
			value: {},
		},
		created() {
			if (!window.EyeDropper) this.showEyedropper = false;
		},
		methods: {
			randomize() {
				this.chromaObject = chroma.random();
			},
			eyedropper() {
				if (!window.EyeDropper) {
					alert("Your browser does not support the EyeDropper API");
					return;
				}

				const eyeDropper = new EyeDropper();

				eyeDropper
					.open()
					.then((result) => {
						this.hexInput = result.sRGBHex;
						resultElement.style.backgroundColor = result.sRGBHex;
					})
					.catch((e) => {});
			},
		},
		watch: {
			chromaObject: {
				handler(val) {
					this.hexInput = val.hex();
					this.hsvInput = {
						h: !Number.isNaN(val.hsv()[0]) ? val.hsv()[0] : 0,
						s: !Number.isNaN(val.hsv()[1]) ? val.hsv()[1] * 100 : 0,
						v: !Number.isNaN(val.hsv()[2]) ? val.hsv()[2] * 100 : 0,
					};
					this.$emit("input", val);
				},
				immediate: true,
				deep: true,
			},
			hsvInput: {
				handler(val) {
					const obj = chroma.hsv(val.h, val.s / 100, val.v / 100);
					if (chroma.valid(obj) && this.chromaObject.hex() != obj.hex()) {
						this.chromaObject = obj;
					}
				},
				deep: true,
			},
			hexInput: {
				handler(val) {
					if (val.length < 6) return;
					const obj = chroma.hex(val);
					if (chroma.valid(obj) && this.chromaObject.hex() != obj.hex()) {
						this.chromaObject = obj;
					}
				},
			},
			value: {
				handler(val) {
					if (this.chromaObject != val) this.chromaObject = val;
				},
			},
		},
		computed: {
			sliderBackgrounds() {
				const bg = {};
				bg.h =
					"linear-gradient(to right,hsl(0,100%,50%),hsl(60,100%,50%),hsl(120,100%,50%),hsl(180,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(360,100%,50%))";

				bg.s = `linear-gradient(to right,${chroma
					.hsv(this.hsvInput.h, 0, 1)
					.css()},${chroma.hsv(this.hsvInput.h, 1, 1).css()})`;

				bg.v = `linear-gradient(to right,
	         ${chroma.hsv(this.hsvInput.h, this.hsvInput.s / 100, 0).css()},
	         ${chroma.hsv(this.hsvInput.h, this.hsvInput.s / 100, 1).css()})`;

				return bg;
			},
		},
	};
</script>

<style scoped>
	.slider {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 20px;
		outline: none;
		-webkit-transition: 0.2s;
		transition: opacity 0.2s;
	}

	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 12px;
		height: 25px;
		background: #fff;
		border: solid 1px rgb(17 24 39);
		cursor: pointer;
	}
</style>
