<template>
	<b-navbar wrapper-class="container">
		<template slot="brand">
			<b-navbar-item tag="router-link" :to="{ name: user ? 'home' : 'welcome' }">{{ appName }}</b-navbar-item>
		</template>
		<template slot="start">
			<locale-dropdown />
		</template>
		<template slot="end">
			<!-- Authenticated -->
			<template v-if="user">
				<b-navbar-dropdown :label="user.short_name">
					<b-navbar-item tag="router-link" :to="{ name: 'settings.profile' }">{{ $t('settings') }}</b-navbar-item>
					<b-navbar-item href="#" @click.prevent="logout">{{ $t('logout') }}</b-navbar-item>
				</b-navbar-dropdown>
			</template>
			<!-- Guest -->
			<template v-else>
				<b-navbar-item tag="a" href="https://twitter.com/eleazarbr" target="_blank">
					<b-icon icon="twitter"></b-icon>
				</b-navbar-item>
				<b-navbar-item tag="a" href="https://github.com/eleazarbr" target="_blank">
					<b-icon icon="github"></b-icon>
				</b-navbar-item>
				<!-- <b-navbar-item
					tag="router-link"
					:to="{ name: 'login' }"
					active-class="is-active"
				>{{ $t('login') }}</b-navbar-item>-->
				<!-- <b-navbar-item
					tag="router-link"
					:to="{ name: 'register' }"
					active-class="is-active"
				>{{ $t('register') }}</b-navbar-item>-->
			</template>
		</template>
	</b-navbar>
</template>

<script>
import { mapGetters } from "vuex";
import LocaleDropdown from "./LocaleDropdown";

export default {
	components: {
		LocaleDropdown
	},

	data: () => ({
		appName: process.env.appName
	}),

	computed: mapGetters({
		user: "auth/user"
	}),

	methods: {
		async logout() {
			// Log out the user.
			await this.$store.dispatch("auth/logout");

			// Redirect to login.
			this.$router.push({ name: "login" });
		}
	}
};
</script>

<style scoped>
</style>
