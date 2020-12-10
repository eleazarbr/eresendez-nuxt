<template>
  <div>
    <div class="columns">
      <!-- Menu -->
      <div class="column is-narrow">
        <b-menu class="p-3">
          <b-menu-list>
            <b-menu-item v-for="(category, index) in menu" expanded :key="index">
              <template slot="label" slot-scope="props">
                {{ category.name }}
                <b-icon
                  class="is-pulled-right"
                  :icon="props.expanded ? 'menu-down' : 'menu-up'"
                ></b-icon>
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
              ></b-menu-item>
            </b-menu-item>
          </b-menu-list>
        </b-menu>
      </div>

      <!-- Content -->
      <div class="column is-three-fifths">
        <div class="section">
          <nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menu from "~/static/data/wiki-menu.json"; // todo, remove this static way later
export default {
  name: "wiki",
  data: () => ({}),

  asyncData({ params }) {
    return {
      menu: _.sortBy(menu, ["name"]),
    };
  },
};
</script>
