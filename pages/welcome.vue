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
        <div class="columns is-centered">
          <div class="column is-8">
            <!-- Latest blog posts -->
            <div class="columns is-mobile" v-for="(post, index) in posts" :key="index">
              <div class="column is-narrow">
                <figure class="image is-128x128 flex items-center">
                  <img
                    class="rounded"
                    :src="`https://source.unsplash.com/${post.image}`"
                  />
                </figure>
              </div>
              <div class="column is-auto">
                <nuxt-link :to="{ name: 'post.show', params: { slug: post.slug } }">
                  <h3 class="text-2xl font-bold">
                    {{ post.title }}
                  </h3>
                </nuxt-link>
                <p class="text-sm mb-1 has-text-dark">
                  {{ $moment(post.date).format("LL") }}
                </p>
                <p class="text-base">
                  {{ post.summary }}
                </p>
                <b-taglist class="mt-2">
                  <b-tag
                    v-for="(tag, index) in post.tags"
                    :key="index"
                    :type="{ 'is-danger': tag === 'Draft' }"
                  >
                    <span class="font-bold">
                      {{ tag }}
                    </span>
                  </b-tag>
                </b-taglist>
              </div>
            </div>

            <div class="buttons">
              <b-button type="is-text" tag="router-link" :to="{ name: 'blog.index' }">
                {{ $t("buttons.view_more") }}
              </b-button>
            </div>
          </div>
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
      .only(["title", "summary", "slug", "date", "tags", "image"])
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
