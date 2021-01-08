<template>
  <b-menu class="text-sm" :activable="false">
    <b-menu-list>
      <b-menu-item v-for="(category, index) in menu" :key="index" v-show="show(category)">
        <template slot="label">
          <span class="font-bold">
            {{ category.name }}
          </span>
        </template>
        <b-menu-item
          v-for="(article, index) in category.articles"
          tag="nuxt-link"
          active-class="is-active"
          :key="index"
          :to="{
            name: 'wiki.article',
            params: { category: category.slug, slug: article.slug },
          }"
          :label="article.name"
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

  methods: {
    show(category) {
      var show = true;
      if (category.hasOwnProperty("active")) show = category.active;
      return show;
    },
  },

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
