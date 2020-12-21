<template>
  <div>
    <div class="section">
      <div class="container">
        <!-- Title -->
        <div class="has-text-black has-text-centered">
          <p class="text-4xl font-bold">
            {{ $t("welcome.title") }}
          </p>
          <p class="text-2xl font-bold mt-2">
            {{ $t("welcome.subtitle") }}
          </p>
          <p class="text-lg">
            {{ $t("welcome.description") }}
          </p>
        </div>
      </div>
    </div>
    <div class="section has-text-black">
      <div class="container">
        <!-- Latest blog posts -->
        <div class="mb-8" v-for="(post, index) in posts" :key="index">
          <nuxt-link :to="{ name: 'post.show', params: { slug: post.slug } }">
            <h3 class="text-2xl font-bold">
              {{ post.title }}
            </h3>
          </nuxt-link>
          <p class="text-sm mb-1">
            {{ $moment(post.date).format("LL") }}
          </p>
          <p class="text-base">
            {{ post.summary }}
          </p>
        </div>

        <div class="buttons">
          <b-button type="is-text" tag="router-link" :to="{ name: 'blog.index' }">
            {{ $t("buttons.view_more") }}
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "welcome",
  transition: "slide",
  head() {
    return { title: this.$t("home") };
  },

  async asyncData({ $content }) {
    const posts = await $content("blog")
      .only(["title", "summary", "slug", "date", "tags"])
      .sortBy("date", "desc")
      .limit(5)
      .fetch();

    return {
      posts,
    };
  },

  mounted() {
    console.log(this.page);
  },
};
</script>
