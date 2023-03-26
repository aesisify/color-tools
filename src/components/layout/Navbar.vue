<template>
	<nav class="border-b border-b-gray-600 shadow-md class p-6">
		<ul class="flex gap-3 justify-center w-full">
			<li v-for="navLink in navLinks">
				<router-link
					:to="{ name: navLink.route }"
					class="py-2 px-4 text-sm uppercase tracking-widest"
					exact-active-class="border-b-2 border-indigo-500"
					exact-path>
					{{ navLink.title }}
				</router-link>
			</li>
		</ul>
	</nav>
</template>

<script>
	export default {
		data() {
			return {
				navLinks: [
					{
						title: "Homepage",
						route: "home",
					},
					{
						title: "Rampgen",
						route: "rampgen",
					},
					{
						title: "Named Colors",
						route: "colors",
					},
				],
			};
		},
	};
</script>
