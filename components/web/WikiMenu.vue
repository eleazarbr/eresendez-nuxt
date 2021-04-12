<template>
  <b-menu class="text-sm" :activable="false">
    <b-menu-list>
      <b-menu-item v-for="(category, categoryKey) in menu" :key="categoryKey">
        <template slot="label">
          <span class="font-bold">
            {{ categoryKey | capitalize }}
          </span>
        </template>
        <b-menu-item
          v-for="(article, articleKey) in category"
          tag="nuxt-link"
          active-class="is-active"
          :to="{
            name: 'wiki.article',
            params: { category: article.dir, slug: article.slug },
          }"
          :label="article.title"
          :key="articleKey"
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
};
</script>
