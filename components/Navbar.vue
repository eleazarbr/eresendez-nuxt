<template>
  <b-navbar wrapper-class="container">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ name: 'web.home' }">{{
        $t("navbar.home")
      }}</b-navbar-item>
    </template>
    <template slot="start">
      <LocaleDropdown></LocaleDropdown>
    </template>
    <template slot="end">
      <b-navbar-item tag="router-link" :to="{ name: 'blog.index' }">
        {{ $t("navbar.blog") }}
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'microblog.index' }">
        {{ $t("navbar.microblog") }}
      </b-navbar-item>
      <b-navbar-item tag="a" target="_blank" href="https://xardin.digital/eresendez">
        <span>
          {{ $t("navbar.garden") }}
        </span>
        <b-icon size="is-small" icon="launch"></b-icon>
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'web.ideas' }">
        {{ $t("navbar.ideas") }}
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'web.projects' }">
        {{ $t("navbar.projects") }}
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'web.cv' }">
        {{ $t("navbar.resume") }}
      </b-navbar-item>
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
};
</script>
