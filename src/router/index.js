import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const router = new VueRouter({
	mode: "hash",
	base: import.meta.env.BASE_URL,
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/ramp-gen",
			name: "rampgen",
			component: () => import("../views/RampgenView.vue"),
		},
		{
			path: "/named-colors",
			name: "colors",
			component: () => import("../views/ColorsView.vue"),
		},
	],
});

export default router;
