<template>
  <div class="hero is-black">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-multiline is-centered">
          <div class="column is-4-desktop">
            <post-card
              v-if="next"
              class="h-full"
              :post="next"
              :show-route="showRoute"
            ></post-card>
          </div>
          <div class="column is-4-desktop">
            <post-card
              v-if="prev"
              class="h-full"
              :post="prev"
              :show-route="showRoute"
            ></post-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PostCard from "~/components/blog/PostCard.vue";
export default {
  name: "PostSurround",
  props: ["prev", "next", "showRoute"],
  components: {
    PostCard,
  },
};
</script>
