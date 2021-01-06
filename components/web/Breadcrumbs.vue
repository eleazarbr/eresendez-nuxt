<template>
  <nav class="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
    <ul vocab="http://schema.org/" typeof="BreadcrumbList">
      <li property="itemListElement" typeof="ListItem">
        <nuxt-link property="item" typeof="WebPage" :to="{ name: 'web.home' }">
          Inicio
        </nuxt-link>
        <meta property="position" content="1" />
      </li>
      <li
        v-for="(crumb, index) in crumbs"
        :key="index"
        property="itemListElement"
        typeof="ListItem"
        :class="{ 'is-active': index == crumbs.length - 1 }"
      >
        <nuxt-link property="item" typeof="WebPage" :to="crumb.path">
          <span property="name">{{
            $route.fullPath === crumb.path && title !== null
              ? title
              : crumb.title | truncate(30)
          }}</span>
        </nuxt-link>
        <meta property="position" :content="index + 2" />
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Breadcrumbs",
  props: {
    title: {
      type: String,
      default: null,
    },
  },
  computed: {
    crumbs() {
      const fullPath = this.$route.fullPath;
      const params = fullPath.startsWith("/")
        ? fullPath.substring(1).split("/")
        : fullPath.split("/");
      const crumbs = [];

      let path = "";

      params.forEach((param, index) => {
        path = `${path}/${param}`;
        const match = this.$router.match(path);

        if (match.name !== null) {
          var title = this.$options.filters.capitalize(param.replace(/-/g, " "));
          crumbs.push({
            title: title,
            ...match,
          });
        }
      });

      return crumbs;
    },
  },
};
</script>
