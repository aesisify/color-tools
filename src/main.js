import Vue from "vue";
import { createPinia, PiniaVuePlugin } from "pinia";

import App from "./App.vue";
import router from "./router";

import Notifications from "vue-notification";

import "./assets/main.css";

Vue.use(PiniaVuePlugin);
Vue.use(Notifications);

import ColorPicker from "./components/input/ColorPicker.vue";
Vue.component("color-picker", ColorPicker);

import { Icon } from "@iconify/vue2";
Vue.component("Icon", Icon);

import LazyList from "lazy-load-list/vue";
Vue.component("lazy-list", LazyList);

new Vue({
	router,
	pinia: createPinia(),
	render: (h) => h(App),
}).$mount("#app");
