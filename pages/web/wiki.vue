<template>
  <div class="columns h-screen">
    <div class="column is-narrow">
      <div class="has-background-light h-full p-3">
        <!-- Mobile menu -->
        <div class="is-hidden-tablet">
          <div class="flex is-justify-content-space-between is-align-items-center">
            <p class="has-text-weight-bold"></p>
            <b-button icon-left="menu" @click="sidebar.open = !sidebar.open"> </b-button>
          </div>

          <b-sidebar
            :type="sidebar.type"
            :fullheight="sidebar.fullheight"
            :open.sync="sidebar.open"
          >
            <div class="p-1">
              <wiki-menu :menu="menu" @clicked="sidebar.open = false"></wiki-menu>
            </div>
          </b-sidebar>
        </div>

        <!-- Desktop Menu -->
        <div class="is-hidden-mobile">
          <wiki-menu :menu="menu"></wiki-menu>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="column is-three-fifths">
      <div class="section">
        <nuxt></nuxt>
      </div>
    </div>
  </div>
</template>

<script>
import WikiMenu from "~/components/web/WikiMenu";
export default {
  name: "wiki",
  transition: "slide",
  components: {
    WikiMenu,
  },

  data: () => ({
    sidebar: {
      open: false,
      fullheight: true,
      type: "is-light",
    },
  }),

  async asyncData({ $content }) {
    var articles = await $content("wiki", { deep: true })
      .only(["category", "dir", "path", "slug", "title"])
      .fetch();

    articles = articles.map((article) => {
      article.dir = article.dir.replace("/wiki/", "");
      return article;
    });

    var menu = _.groupBy(articles, "dir");
    return {
      menu: menu,
    };
  },
};
</script>

<style lang="css" scoped>
.columns {
  margin-right: 0;
}
</style>
