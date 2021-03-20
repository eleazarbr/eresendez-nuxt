<template>
  <div>
    <!-- Hero section -->
    <div class="hero is-small">
      <div class="hero-body">
        <div class="container">
          <!-- Title -->
          <div class="has-text-black has-text-centered">
            <p class="text-2xl sm:text-3xl md:text-4xl font-bold">
              {{ $t("welcome.title") }}
            </p>
            <p class="text-xl sm:text-xl md:text-2xl font-bold mt-2">
              {{ $t("welcome.subtitle") }}
            </p>
            <p class="text-lg">
              {{ $t("welcome.description") }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Latest blog posts section -->
    <div class="section">
      <div class="container">
        <!-- Posts -->
        <div class="columns is-multiline is-centered">
          <div
            class="column is-6-desktop is-12-tablet"
            v-for="(post, index) in posts"
            :key="index"
          >
            <post-card :post="post"></post-card>
          </div>
        </div>

        <div class="buttons is-centered">
          <b-button type="is-text" tag="router-link" :to="{ name: 'blog.index' }">
            {{ $t("buttons.view_more") }}
          </b-button>
        </div>
      </div>
    </div>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheFooter from "~/components/TheFooter";
import PostCard from "../components/blog/PostCard.vue";
export default {
  name: "welcome",
  transition: "slide",

  components: {
    TheFooter,
    PostCard,
  },

  head() {
    return {
      title: this.$t("home"),
      meta: [
        {
          hid: "title",
          name: "title",
          content: this.$t("seo.home.title"),
        },
        { hid: "og:title", property: "og:title", content: this.$t("seo.home.title") },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.$t("seo.home.title"),
        },
        {
          hid: "description",
          name: "description",
          content: this.$t("seo.home.description"),
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.$t("seo.home.description"),
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.$t("seo.home.description"),
        },
      ],
    };
  },

  async asyncData({ $content }) {
    const posts = await $content("blog")
      .only(["title", "summary", "slug", "date", "tags", "image", "updatedAt"])
      .sortBy("updatedAt", "desc")
      .limit(10)
      .fetch();

    return {
      posts,
    };
  },
};
</script>
