<template>
	<section class="p-6">
		<div>
			<div class="flex justify-center bg-gray-900 p-2 rounded">
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
			<color-picker
				class="bg-gray-900 p-2 rounded mt-3"
				v-model="middleColor"></color-picker>
			<div class="mt-3 bg-gray-900 p-2 rounded">
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<div
							class="text-sm uppercase tracking-widest border-b px-2 py-1 border-b-indigo-500">
							General Settings
						</div>
						<div class="p-2 flex flex-col gap-2">
							<div class="flex flex-col">
								<label class="text-xs font-medium mb-1">
									Color Count | {{ generalSettings.colorCount }}
								</label>
								<input
									class="bg-gray-800 p-1 px-2 rounded slider"
									v-model="generalSettings.colorCount"
									max="24"
									min="3"
									step="1"
									type="range" />
							</div>
							<div class="flex flex-col">
								<label class="text-xs font-medium mb-1">
									Color Interpolation Mode
								</label>

								<select
									class="bg-gray-800 p-1 px-2 rounded"
									v-model="generalSettings.interpolation">
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
									v-model="generalSettings.correctLightness"
									checked />
								Correct Lightness
							</label>
						</div>
					</div>
					<div>
						<div
							class="text-sm uppercase tracking-widest border-b px-2 py-1 border-b-indigo-500">
							Start Color Settings
						</div>
						<div class="p-2 flex flex-col gap-2">
							<div class="flex flex-col">
								<label class="text-xs font-medium mb-1">Start Color Mode</label>

								<select
									class="bg-gray-800 p-1 px-2 rounded"
									v-model="startColorSettings.mode">
									<option value="generate">Hue Shift</option>
									<option value="select">Select Manually</option>
								</select>
							</div>
							<template v-if="startColorSettings.mode === 'generate'">
								<div class="flex flex-col">
									<label class="text-xs font-medium mb-1">
										<div class="flex items-center justify-start gap-1">
											<div>Hue Shift | {{ startColorSettings.hueShift }}</div>
											<div
												:style="{ background: hueShift.start }"
												class="h-3 w-3 rounded"></div>
										</div>
									</label>
									<input
										class="bg-gray-800 p-1 px-2 rounded slider"
										v-model="startColorSettings.hueShift"
										max="100"
										min="-100"
										step="0.1"
										type="range" />
								</div>
								<div class="flex flex-col">
									<label class="text-xs font-medium mb-1">
										Brightness | {{ startColorSettings.brightness }}
									</label>
									<input
										class="bg-gray-800 p-1 px-2 rounded slider"
										v-model="startColorSettings.brightness"
										min="-5"
										max="5"
										step="0.1"
										type="range" />
								</div>
								<div class="flex flex-col">
									<label class="text-xs font-medium mb-1">
										Saturation | {{ startColorSettings.saturation }}
									</label>
									<input
										class="bg-gray-800 p-1 px-2 rounded slider"
										v-model="startColorSettings.saturation"
										min="-3"
										max="3"
										step="0.1"
										type="range" />
								</div>
							</template>
							<template v-else>
								<color-picker
									class="bg-gray-800 p-2 rounded mt-1"
									v-model="startColorSettings.selectedColor"></color-picker>
							</template>
						</div>
					</div>
					<div>
						<div
							class="text-sm uppercase tracking-widest border-b px-2 py-1 border-b-indigo-500">
							End Color Settings
						</div>
						<div class="p-2 flex flex-col gap-2">
							<div class="flex flex-col">
								<label class="text-xs font-medium mb-1">End Color Mode</label>

								<select
									class="bg-gray-800 p-1 px-2 rounded"
									v-model="endColorSettings.mode">
									<option value="generate">Hue Shift</option>
									<option value="select">Select Manually</option>
								</select>
							</div>
							<template v-if="endColorSettings.mode === 'generate'">
								<div class="flex flex-col">
									<label class="text-xs font-medium mb-1">
										<div class="flex items-center justify-start gap-1">
											<div>Hue Shift | {{ endColorSettings.hueShift }}</div>
											<div
												:style="{ background: hueShift.end }"
												class="h-3 w-3 rounded"></div>
										</div>
									</label>
									<input
										class="bg-gray-800 p-1 px-2 rounded slider"
										v-model="endColorSettings.hueShift"
										max="100"
										min="-100"
										step="0.1"
										type="range" />
								</div>
								<div class="flex flex-col">
									<label class="text-xs font-medium mb-1">
										Brightness | {{ endColorSettings.brightness }}
									</label>
									<input
										class="bg-gray-800 p-1 px-2 rounded slider"
										v-model="endColorSettings.brightness"
										min="-5"
										max="5"
										step="0.1"
										type="range" />
								</div>
								<div class="flex flex-col">
									<label class="text-xs font-medium mb-1">
										Saturation | {{ endColorSettings.saturation }}
									</label>
									<input
										class="bg-gray-800 p-1 px-2 rounded slider"
										v-model="endColorSettings.saturation"
										min="-3"
										max="3"
										step="0.1"
										type="range" />
								</div>
							</template>
							<template v-else>
								<color-picker
									class="bg-gray-800 p-2 rounded mt-1"
									v-model="endColorSettings.selectedColor"></color-picker>
							</template>
						</div>
					</div>
					<div class="col-span-1 md:col-span-3">
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
				colorRamp: [],
				middleColor: chroma.random(),
				generalSettings: {
					colorCount: 6,
					interpolation: "lrgb",
					correctLightness: false,
				},
				startColorSettings: {
					mode: "generate",
					selectedColor: null,
					newHue: null,
					hueShift: 25,
					brightness: 1,
					saturation: 0.5,
				},
				endColorSettings: {
					mode: "generate",
					selectedColor: null,
					newHue: null,
					hueShift: -25,
					brightness: -1,
					saturation: -0.5,
				},
				hueShift: {
					start: null,
					end: null,
				},
				accesability: {
					paletteContrast: 0,
					paletteDeltaE: 0,
					lowestContrast: 0,
					lowestDeltaE: 0,
				},
			};
		},
		created() {
			if (this.$route.query.color) {
				this.middleColor = chroma.hex(this.$route.query.color);
			}

			this.startColorSettings.selectedColor = this.middleColor.brighten(1);
			this.endColorSettings.selectedColor = this.middleColor.brighten(-1);
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
			middleColor: {
				handler(val) {
					this.calculateRamp();
				},
				immediate: true,
				deep: true,
			},
			generalSettings: {
				handler(val) {
					this.calculateRamp();
				},
				deep: true,
			},
			startColorSettings: {
				handler(val) {
					this.calculateRamp();
				},
				deep: true,
			},
			endColorSettings: {
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
				const val = this.middleColor;

				let sCol;
				if (this.startColorSettings.mode === "generate") {
					sCol = val
						.brighten(this.startColorSettings.brightness)
						.saturate(this.startColorSettings.saturation);

					const startValues = sCol.hsv();

					const sh =
						(((startValues[0] + Number(this.startColorSettings.hueShift)) %
							360) +
							360) %
						360;
					const ss = startValues[1];
					const sv = startValues[2];

					this.hueShift.start = chroma.hsv(sh, 1, 1);
					sCol = chroma.hsv(sh, ss, sv);
				} else {
					sCol = this.startColorSettings.selectedColor;
				}

				let eCol;
				if (this.endColorSettings.mode === "generate") {
					eCol = val
						.brighten(this.endColorSettings.brightness)
						.saturate(this.endColorSettings.saturation);

					const endValues = eCol.hsv();

					const eh =
						(((endValues[0] + Number(this.endColorSettings.hueShift)) % 360) +
							360) %
						360;
					const es = endValues[1];
					const ev = endValues[2];

					this.hueShift.end = chroma.hsv(eh, 1, 1);
					eCol = chroma.hsv(eh, es, ev);
				} else {
					eCol = this.endColorSettings.selectedColor;
				}

				if (this.generalSettings.correctLightness) {
					this.colorRamp = chroma
						.scale([sCol, val, eCol])
						.cache(false)
						.mode(this.generalSettings.interpolation)
						.correctLightness()
						.colors(this.generalSettings.colorCount);
				} else {
					this.colorRamp = chroma
						.scale([sCol, val, eCol])
						.cache(false)
						.mode(this.generalSettings.interpolation)
						.colors(this.generalSettings.colorCount);
				}

				this.accesability.paletteContrast = chroma.contrast(sCol, eCol);

				this.accesability.paletteDeltaE = chroma.deltaE(sCol, eCol);
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
		background: #6366f1;
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
