<template>
  <b-navbar-dropdown
    arrowless
    :collapsible="true"
    :label="$t(`navbar.languages.${locale}`)"
  >
    <b-navbar-item
      v-for="(value, key) in locales"
      v-show="key != locale"
      href="#"
      :key="key"
      @click.prevent="setLocale(key)"
      >{{ $t(`navbar.languages.${key}`) }}</b-navbar-item
    >
  </b-navbar-dropdown>
</template>

<script>
import { mapGetters } from "vuex";
import { loadMessages } from "~/plugins/i18n";

export default {
  computed: mapGetters({
    locale: "lang/locale",
    locales: "lang/locales",
  }),

  methods: {
    setLocale(locale) {
      if (this.$i18n.locale !== locale) {
        loadMessages(locale);
        this.$store.dispatch("lang/setLocale", { locale });
      }
    },
  },
};
</script>
