<template>
	<div class="layout">
		<navbar />

		<div>
			<nuxt />
		</div>
	</div>
</template>

<script>
import Navbar from "~/components/Navbar";

export default {
	components: {
		Navbar
	}
};
</script>
