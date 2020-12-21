<template>
  <b-navbar-dropdown :label="locales[locale]" arrowless :collapsible="true">
    <b-navbar-item
      v-for="(value, key) in locales"
      :key="key"
      href="#"
      @click.prevent="setLocale(key)"
      >{{ value }}</b-navbar-item
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
