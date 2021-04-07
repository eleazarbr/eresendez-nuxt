<template>
  <div class="card flex flex-col justify-between h-full">
    <div class="card-image">
      <nuxt-link :to="{ name: 'post.show', params: { slug: post.slug } }">
        <figure class="image is-3by1">
          <img class="has-bg-cover" :src="`https://source.unsplash.com/${post.image}`" />
        </figure>
      </nuxt-link>
    </div>
    <div class="card-content content h-full">
      <nuxt-link
        class="title is-size-4 cursor-pointer"
        tag="h3"
        :to="{ name: 'post.show', params: { slug: post.slug } }"
      >
        {{ post.title }}
      </nuxt-link>

      <p class="subtitle is-size-6">
        {{ post.summary }}
      </p>
    </div>
    <div class="card-foot p-3">
      <div class="flex justify-between items-center">
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
  props: ["post"],
};
</script>

<style lang="css" scoped>
.card-foot {
  background-color: transparent;
  border-top: 1px solid #dbdbdb;
}
</style>
