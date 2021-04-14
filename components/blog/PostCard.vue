<template>
  <div class="card flex flex-col justify-between h-full">
    <div v-if="post.image" class="card-image">
      <nuxt-link :to="{ name: showRoute, params: { slug: post.slug } }">
        <figure class="image is-3by1">
          <img class="has-bg-cover" :src="`https://source.unsplash.com/${post.image}`" />
        </figure>
      </nuxt-link>
    </div>
    <div class="card-content content h-full">
      <nuxt-link :to="{ name: showRoute, params: { slug: post.slug } }">
        <h3 class="title is-size-4">
          {{ post.title }}
        </h3>
      </nuxt-link>

      <p class="subtitle is-size-6">
        <!-- TODO remove summary attribute from blog posts -->
        <span v-if="post.summary">
          {{ post.summary }}
        </span>
        <span v-else>
          {{ post.description }}
        </span>
      </p>
    </div>
    <div class="card-foot p-3">
      <div class="flex justify-between items-center">
        <p class="text-sm my-1">
          <span>
            {{
              $t("blog.last_update", {
                date: $moment(post.updatedAt)
                  .locale($store.getters["lang/locale"])
                  .fromNow(),
              })
            }}
          </span>
        </p>
        <b-taglist class="is-centered">
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
  </div>
</template>

<script>
export default {
  name: "PostCard",
  props: ["post", "showRoute"],
};
</script>

<style lang="css" scoped>
.card {
  background-color: transparent;
  color: inherit;
}

.card-foot {
  background-color: transparent;
  border-top: 1px solid #dbdbdb;
}
</style>
