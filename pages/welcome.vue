<template>
  <div>
    <!-- Hero section -->
    <div class="hero is-primary is-bold is-small">
      <div class="hero-body">
        <div class="container">
          <div class="content has-text-black has-text-centered">
            <h1 class="title is-size-4">
              {{ $t("welcome.subtitle") }}
            </h1>
            <p class="subtitle">
              {{ $t("welcome.description") }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Micro posts section -->
    <div class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half-desktop">
            <micro-post
              v-for="(microPost, index) in microPosts"
              :key="index"
              :post="microPost"
            ></micro-post>
          </div>
        </div>
        <div class="buttons is-centered">
          <b-button type="is-primary" tag="router-link" :to="{ name: 'microblog.index' }">
            {{ $t("microblog.see_all") }}
          </b-button>
        </div>
      </div>
    </div>

    <!-- Blog posts section -->
    <div class="section">
      <div class="container">
        <!-- Posts -->
        <div class="columns is-multiline is-centered">
          <div
            class="column is-5-desktop is-12-tablet"
            v-for="(post, index) in posts"
            :key="index"
          >
            <post-card :post="post" show-route="post.show"></post-card>
          </div>
        </div>

        <div class="buttons is-centered">
          <b-button type="is-primary" tag="router-link" :to="{ name: 'blog.index' }">
            {{ $t("blog.see_all") }}
          </b-button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheFooter from "~/components/TheFooter";
import PostCard from "../components/blog/PostCard.vue";
import MicroPost from "../components/microblog/MicroPost.vue";

export default {
  name: "welcome",
  transition: "slide",

  components: {
    TheFooter,
    PostCard,
    MicroPost,
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
      .limit(5)
      .fetch();

    const microPosts = await $content("microblog")
      .only(["title", "slug", "summary", "tags", "createdAt", "updatedAt"])
      .sortBy("createdAt", "desc")
      .limit(3)
      .fetch();

    return {
      posts,
      microPosts,
    };
  },
};
</script>
