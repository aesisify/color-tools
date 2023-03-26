<template>
	<section class="p-6">
		<div>
			<color-picker
				class="bg-gray-900 p-2 rounded"
				v-model="selectedColor"></color-picker>
			<div class="mt-3 bg-gray-900 p-2 rounded">
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<div
							class="text-sm uppercase tracking-widest border-b px-2 py-1 border-b-indigo-500">
							General Settings
						</div>
						<div class="p-2 flex flex-col gap-2">
							<div class="flex flex-col">
								<label class="text-xs font-medium mb-1">Color Count</label>
								<input
									class="bg-gray-800 p-1 px-2 rounded"
									v-model="settings.colorCount"
									type="number" />
							</div>
							<div class="flex flex-col">
								<label class="text-xs font-medium mb-1">
									Color Interpolation Mode
								</label>

								<select
									class="bg-gray-800 p-1 px-2 rounded"
									v-model="settings.interpolation">
									<option value="lrgb">Linear RGB (Default)</option>
									<option value="rgb">RGB</option>
									<option value="lab">Lab</option>
									<option value="lch">Lch</option>
									<option value="hsl">HSL (Not Recommended)</option>
								</select>
							</div>
							<label class="font-medium text-xs select-none">
								<input
									type="checkbox"
									class="accent-indigo-500 hover:accent-indigo-600 focus:accent-indigo-700 rounded"
									v-model="settings.correctLightness"
									checked />
								Correct Lightness
							</label>
						</div>
						<div
							class="text-sm uppercase tracking-widest border-b px-2 py-1 border-b-indigo-500">
							Info
						</div>
						<div class="p-2 flex flex-col gap-2">
							<div class="text-xs">
								Palette Contrast:
								<span
									:class="{
										'text-red-500': accesability.paletteContrast < 4.49,
									}"
									v-text="accesability.paletteContrast.toFixed(2)"></span>
							</div>
							<div class="text-xs">
								Lowest Contrast:
								<span
									:class="{
										'text-red-500': accesability.lowestContrast <= 1,
									}"
									v-text="accesability.lowestContrast.toFixed(2)"></span>
							</div>
							<div class="text-xs">
								Palette DeltaE:
								<span
									:class="{ 'text-red-500': accesability.paletteDeltaE < 25 }"
									v-text="accesability.paletteDeltaE.toFixed(2)"></span>
							</div>
							<div class="text-xs">
								Lowest DeltaE:
								<span
									:class="{ 'text-red-500': accesability.lowestDeltaE < 2.5 }"
									v-text="accesability.lowestDeltaE.toFixed(2)"></span>
							</div>
						</div>
					</div>
					<div>
						<div
							class="text-sm uppercase tracking-widest border-b px-2 py-1 border-b-indigo-500">
							Start Color Settings
						</div>
						<div class="p-2 flex flex-col gap-2">
							<div class="flex flex-col">
								<label class="text-xs font-medium mb-1">
									<div class="flex items-center justify-start gap-1">
										<div>Hue Shift</div>
										<div
											:style="{ background: hueShift.startNewHue }"
											class="h-3 w-3 rounded"></div>
									</div>
								</label>
								<input
									class="bg-gray-800 p-1 px-2 rounded"
									v-model="settings.startHueShift"
									step="0.1"
									type="number" />
							</div>
							<div class="flex flex-col">
								<label class="text-xs font-medium mb-1">Brightness</label>
								<input
									class="bg-gray-800 p-1 px-2 rounded"
									v-model="settings.startBrightness"
									step="0.1"
									type="number" />
							</div>
							<div class="flex flex-col">
								<label class="text-xs font-medium mb-1">Saturation</label>
								<input
									class="bg-gray-800 p-1 px-2 rounded"
									v-model="settings.startSaturation"
									step="0.1"
									type="number" />
							</div>
						</div>
					</div>
					<div>
						<div
							class="text-sm uppercase tracking-widest border-b px-2 py-1 border-b-indigo-500">
							End Color Settings
						</div>
						<div class="p-2 flex flex-col gap-2">
							<div class="flex flex-col">
								<label class="text-xs font-medium mb-1">
									<div class="flex items-center justify-start gap-1">
										<div>Hue Shift</div>
										<div
											:style="{ background: hueShift.endNewHue }"
											class="h-3 w-3 rounded"></div>
									</div>
								</label>
								<input
									class="bg-gray-800 p-1 px-2 rounded"
									v-model="settings.endHueShift"
									step="0.1"
									type="number" />
							</div>
							<div class="flex flex-col">
								<label class="text-xs font-medium mb-1">Brightness</label>
								<input
									class="bg-gray-800 p-1 px-2 rounded"
									v-model="settings.endBrightness"
									step="0.1"
									type="number" />
							</div>
							<div class="flex flex-col">
								<label class="text-xs font-medium mb-1">Saturation</label>
								<input
									class="bg-gray-800 p-1 px-2 rounded"
									v-model="settings.endSaturation"
									step="0.1"
									type="number" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="flex justify-center mt-3 bg-gray-900 p-2 rounded">
				<div
					@click="copyToClipboard(color)"
					class="group flex relative max-h-16 flex-grow items-center justify-center aspect-square cursor-pointer"
					v-for="color in colorRamp"
					:style="{ background: color }">
					<div
						class="hidden group-hover:flex absolute top-2 right-2 bg-gray-800 bg-opacity-50 rounded p-0.5">
						<Icon icon="ph:copy"></Icon>
					</div>
				</div>
			</div>
			<div
				class="bg-gray-900 p-3 mt-3 rounded font-mono"
				style="white-space: pre-wrap"
				v-html="'colors: ' + JSON.stringify(outJson, null, '\t')"></div>
		</div>
	</section>
</template>

<script>
	import chroma from "chroma-js";

	export default {
		data() {
			return {
				selectedColor: chroma.random(),
				colorRamp: [],
				accesability: {
					paletteContrast: 0,
					paletteDeltaE: 0,
					lowestContrast: 0,
					lowestDeltaE: 0,
				},
				hueShift: {
					startNewHue: null,
					endNewHue: null,
				},
				settings: {
					colorCount: 10,
					startHueShift: 25,
					endHueShift: -25,
					startBrightness: 2,
					endBrightness: -2,
					startSaturation: 1,
					endSaturation: -1,
					interpolation: "lrgb",
					correctLightness: true,
				},
			};
		},
		created() {
			if (this.$route.query.color) {
				this.selectedColor = chroma.hex(this.$route.query.color);
			}
		},
		computed: {
			outJson() {
				const obj = {};
				this.colorRamp.forEach((color, i) => {
					obj[i * 100 != 0 ? i * 100 : 50] = color;
				});

				return obj;
			},
		},
		watch: {
			selectedColor: {
				handler(val) {
					this.calculateRamp();
				},
				immediate: true,
				deep: true,
			},
			settings: {
				handler(val) {
					this.calculateRamp();
				},
				deep: true,
			},
		},
		methods: {
			copyToClipboard(str) {
				navigator.clipboard.writeText(str);
				this.$notify({
					type: "info",
					text: `Copied HEX value: <b> ${str} </b>`,
				});
			},
			calculateRamp() {
				this.colorRamp = [];
				const val = this.selectedColor;

				let startColor = val
					.brighten(this.settings.startBrightness)
					.saturate(this.settings.startSaturation);

				const startValues = startColor.hsv();
				const sh =
					(((startValues[0] + Number(this.settings.startHueShift)) % 360) +
						360) %
					360;
				const ss = startValues[1];
				const sv = startValues[2];

				this.hueShift.startNewHue = chroma.hsv(sh, 1, 1);
				startColor = chroma.hsv(sh, ss, sv);

				let endColor = val
					.brighten(this.settings.endBrightness)
					.saturate(this.settings.endSaturation);

				const endValues = endColor.hsv();
				const eh =
					(((endValues[0] + Number(this.settings.endHueShift)) % 360) + 360) %
					360;
				const es = endValues[1];
				const ev = endValues[2];

				this.hueShift.endNewHue = chroma.hsv(eh, 1, 1);
				endColor = chroma.hsv(eh, es, ev);

				if (this.settings.correctLightness) {
					this.colorRamp = chroma
						.scale([startColor, val, endColor])
						.cache(false)
						.mode(this.settings.interpolation)
						.correctLightness()
						.colors(this.settings.colorCount);
				} else {
					this.colorRamp = chroma
						.scale([startColor, val, endColor])
						.cache(false)
						.mode(this.settings.interpolation)
						.colors(this.settings.colorCount);
				}

				this.accesability.paletteContrast = chroma.contrast(
					startColor,
					endColor
				);
				this.accesability.paletteDeltaE = chroma.deltaE(startColor, endColor);
				this.accesability.lowestDeltaE = 100;
				this.accesability.lowestContrast = 100;

				this.colorRamp.reduce((a, b) => {
					const delta = chroma.deltaE(a, b);
					const contrast = chroma.contrast(a, b);

					if (delta < this.accesability.lowestDeltaE)
						this.accesability.lowestDeltaE = delta;
					if (contrast < this.accesability.lowestContrast)
						this.accesability.lowestContrast = contrast;

					return delta + contrast;
				});
			},
		},
	};
</script>

<style scoped>
	.slider {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 10px;
		outline: none;
		-webkit-transition: 0.2s;
		transition: opacity 0.2s;
	}

	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 10px;
		height: 20px;
		background: #fff;
		border: solid 1px rgb(17 24 39);
		cursor: pointer;
	}
</style>
