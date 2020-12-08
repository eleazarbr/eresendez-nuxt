<template>
  <b-navbar wrapper-class="container">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ name: 'web.home' }">{{
        $t('navbar.home')
      }}</b-navbar-item>
    </template>
    <template slot="start">
      <locale-dropdown />
    </template>
    <template slot="end">
      <b-navbar-item
        v-show="isProjectsActive"
        tag="router-link"
        :to="{ name: 'web.projects' }"
      >
        {{ $t('navbar.projects') }}
      </b-navbar-item>
      <b-navbar-item tag="div">
        <div class="buttons">
          <b-button
            tag="a"
            href="https://twitter.com/eleazarbr"
            target="_blank"
            type="is-white"
          >
            <b-icon icon="twitter"></b-icon>
            <span class="is-hidden-desktop"> Twitter </span>
          </b-button>
          <b-button
            tag="a"
            href="https://github.com/eleazarbr"
            target="_blank"
            type="is-white"
          >
            <b-icon icon="github"></b-icon>
            <span class="is-hidden-desktop"> GitHub </span>
          </b-button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import LocaleDropdown from './LocaleDropdown'
export default {
  name: 'Navbar',
  components: {
    LocaleDropdown,
  },

  data: () => ({
    appName: process.env.APP_NAME,
    isProjectsActive: false,
  }),
}
</script>
