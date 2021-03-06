<template>
  <div>
    <!-- Hero section -->
    <div class="section">
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

    <!-- Latest blog posts section -->
    <div class="section has-text-black">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-12-tablet is-8-desktop">
            <div
              class="columns is-vcentered pb-3"
              v-for="(post, index) in posts"
              :key="index"
            >
              <!-- Blog image -->
              <div class="column is-3">
                <nuxt-link :to="{ name: 'post.show', params: { slug: post.slug } }">
                  <figure class="image is-3by1">
                    <img
                      class="rounded has-bg-cover"
                      :src="`https://source.unsplash.com/${post.image}`"
                    />
                  </figure>
                </nuxt-link>
              </div>
              <!-- Blog meta -->
              <div class="column is-auto">
                <nuxt-link :to="{ name: 'post.show', params: { slug: post.slug } }">
                  <h3 class="text-2xl font-bold leading-tight">
                    {{ post.title }}
                  </h3>
                </nuxt-link>
                <p class="text-sm has-text-dark my-1">
                  <span>
                    {{
                      $t("blog.last_update", {
                        date: $moment(post.updatedAt)
                          .locale($store.getters["lang/locale"])
                          .fromNow(),
                      })
                    }}
                  </span>
                  <!-- <br /> -->
                  <!-- <span>
                    {{
                      $t("blog.published_at", {
                        date: $moment(post.date)
                          .locale($store.getters["lang/locale"])
                          .format("LL"),
                      })
                    }}
                  </span> -->
                </p>
                <p class="text-base">
                  {{ post.summary }}
                </p>
                <b-taglist class="mt-2">
                  <b-tag
                    v-for="(tag, index) in post.tags"
                    :key="index"
                    :class="{ 'is-danger': tag === 'Draft' }"
                  >
                    <span class="font-bold">
                      {{ tag }}
                    </span>
                  </b-tag>
                </b-taglist>
              </div>
            </div>

            <div class="buttons is-centered">
              <b-button type="is-text" tag="router-link" :to="{ name: 'blog.index' }">
                {{ $t("buttons.view_more") }}
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheFooter from "~/components/TheFooter";
export default {
  name: "welcome",
  components: {
    TheFooter,
  },
  transition: "slide",
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
