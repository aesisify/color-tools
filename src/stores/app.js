import Colors from "@/assets/colors.json";
import { defineStore } from "pinia";

export const useAppStore = defineStore({
	id: "app",
	state: () => ({
		colors: Colors,
	}),
	getters: {},
	actions: {},
});
