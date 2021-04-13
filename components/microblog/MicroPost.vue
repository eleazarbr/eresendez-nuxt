<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img class="is-rounded" src="/avatar.jpg" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>Eleazar Reséndez</strong>
          <br />
          {{ post.description }}
          <br />
          <small>
            <router-link :to="{ name: 'micropost.show', params: { slug: post.slug } }">
              {{ $t("microblog.continue_reading") }}
            </router-link>
            · {{ date }}</small
          >
        </p>
      </div>
    </div>
  </article>
</template>
<script>
export default {
  name: "MicroPost",
  props: ["post"],
  computed: {
    date() {
      return this.$moment(this.post.createdAt)
        .locale(this.$store.getters["lang/locale"])
        .format("lll");
    },
  },
};
</script>
