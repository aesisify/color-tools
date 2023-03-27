import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import vue2 from "@vitejs/plugin-vue2";

import Markdown from "vite-plugin-vue-markdown";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/color-tools/",
	plugins: [
		vue2({
			include: [/\.vue$/, /\.md$/], // <--
		}),
		legacy({
			targets: ["ie >= 11"],
			additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
		}),
		Markdown(),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
});
