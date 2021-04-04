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
          {{ post.summary }}
          <br />
          <small> <a>View</a> · <a>Reply</a> · <a>Bookmark</a> · {{ createdAt }}</small>
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
    createdAt() {
      return this.$moment(this.post.createdAt)
        .locale(this.$store.getters["lang/locale"])
        .format("lll");
    },
  },
};
</script>
