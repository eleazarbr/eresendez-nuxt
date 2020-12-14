<template>
  <div>
    <div class="columns h-screen">
      <!-- Menu -->
      <div class="column is-narrow">
        <b-menu class="text-sm p-3 bg-gray-100 h-full" :activable="false">
          <b-menu-list>
            <b-menu-item
              v-for="(category, index) in menu"
              expanded
              :key="index"
              v-show="show(category)"
            >
              <template slot="label" slot-scope="props">
                <span class="font-bold">
                  {{ category.name }}
                </span>
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
          <div v-if="currentRouteName === 'web.wiki'">
            <nuxt-content class="content" :document="page" />
          </div>
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

  async asyncData({ params, $content }) {
    const page = await $content("wiki/introduction").fetch();
    return {
      page,
      menu: _.orderBy(menu, ["name"], "asc"),
    };
  },

  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },

  methods: {
    show(category) {
      var show = true;
      if (category.hasOwnProperty("active")) show = category.active;
      return show;
    },
  },

  mounted() {
    // var firstCategory = this.menu[0];
    // this.$router.push({
    //   name: "wiki.article",
    //   params: { category: firstCategory.slug, slug: firstCategory.articles[0]["slug"] },
    // });
  },
};
</script>
