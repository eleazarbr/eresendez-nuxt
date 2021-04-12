<template>
  <b-menu class="text-sm" :activable="false">
    <b-menu-list>
      <b-menu-item v-for="(category, categoryKey) in menu" :key="categoryKey">
        <template slot="label">
          <span class="font-bold">
            {{ categoryKey }}
          </span>
        </template>
        <b-menu-item
          v-for="(article, articleKey) in category"
          tag="nuxt-link"
          active-class="is-active"
          :key="articleKey"
          :to="{
            name: 'wiki.article',
            params: { category: categoryKey, slug: article.slug },
          }"
          :label="article.title"
          @click.native="$emit('clicked')"
        ></b-menu-item>
      </b-menu-item>
    </b-menu-list>
  </b-menu>
</template>
<script>
export default {
  name: "WikiMenu",
  props: ["menu"],

  mounted() {
    // TODO: Support subcategories and load the menu dynamically
    // var firstCategory = this.menu[0];
    // this.$router.push({
    //   name: "wiki.article",
    //   params: { category: firstCategory.slug, slug: firstCategory.articles[0]["slug"] },
    // });
  },
};
</script>
