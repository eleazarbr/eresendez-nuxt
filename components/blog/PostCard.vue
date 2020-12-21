<template>
  <div class="box post-card h-full px-3 py-2 sm:px-6 sm:py-4">
    <div class="columns is-vcentered">
      <div class="column">
        <div class="text-xl sm:text-2xl font-bold has-text-black pb-2 leading-tight">
          <nuxt-link
            class="hover:underline"
            :to="{ name: 'post.show', params: { slug: post.slug } }"
            >{{ post.title }}</nuxt-link
          >
        </div>
        <div class="text-base pb-2 leading-normal">{{ post.summary }}</div>
        <div class="buttons text-sm sm:text-base mb-5">
          <b-button
            type="is-text"
            tag="nuxt-link"
            :to="{ name: 'post.show', params: { slug: post.slug } }"
            >{{ $t("blog.read_more") }}</b-button
          >
        </div>
        <div class="text-sm" style="opacity: 0.8">
          <p>
            {{
              $t("blog.posted_on", {
                date: $moment(post.date)
                  .locale($store.getters["lang/locale"])
                  .format("LL"),
              })
            }}
          </p>
        </div>

        <!-- Tags -->
        <div class="tags are-small mt-4">
          <b-tag type="is-primary" v-for="(tag, index) in post.tags" :key="index">{{
            tag
          }}</b-tag>
        </div>
      </div>
      <div class="column is-3" v-if="post.image">
        <figure class="image is-128xauto">
          <img :src="imagesDir + post.image" />
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostCard",
  props: ["post"],
  data: () => ({
    imagesDir: "blog/",
  }),
};
</script>

<style lang="css" scoped>
.post-card {
  box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.02), 1px 1px 15px 0 rgba(0, 0, 0, 0.03);
  transition: transform 0.3s, background-color 0.3s, box-shadow 0.6s;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 1px 10px 30px 0 rgba(0, 0, 0, 0.1);
}
</style>
