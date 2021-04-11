<template>
  <div class="section">
    <div class="container">
      <div class="columns is-multiline is-centered">
        <div class="column is-half-desktop">
          <micro-post
            v-for="(post, index) in posts"
            :key="index"
            :post="post"
          ></micro-post>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MicroPost from "@/components/microblog/MicroPost.vue";
export default {
  name: "index",
  components: {
    MicroPost,
  },

  data: () => ({
    posts: [],
  }),

  async asyncData({ $content }) {
    const posts = await $content("microblog")
      .only(["title", "slug", "summary", "tags", "createdAt", "updatedAt"])
      .sortBy("createdAt", "desc")
      .fetch();

    // TODO. use vue-infinite-loading when needed

    return {
      posts,
    };
  },
};
</script>
