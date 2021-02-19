<template>
  <b-navbar wrapper-class="container">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ name: 'web.home' }">{{
        $t("navbar.home")
      }}</b-navbar-item>
    </template>
    <template slot="start">
      <locale-dropdown />
    </template>
    <template slot="end">
      <b-navbar-item tag="router-link" :to="{ name: 'blog.index' }"> Blog </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'web.wiki' }"> Wiki </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'web.ideas' }"> Ideas </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'web.projects' }">
        Projects
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'web.cv' }"> CV </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import LocaleDropdown from "./LocaleDropdown";
export default {
  name: "Navbar",
  components: {
    LocaleDropdown,
  },

  data: () => ({
    appName: process.env.APP_NAME,
  }),
};
</script>
