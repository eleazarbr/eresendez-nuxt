<template>
  <div class="hero is-black is-bold">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-mobile content">
          <div class="column is-6">
            <div v-if="next" class="text-left">
              <b-icon icon="arrow-left" size="is-small"></b-icon>
              <p class="text-base font-bold leading-5">
                <nuxt-link
                  class="has-text-white"
                  :to="{ name: showRoute, params: { slug: next.slug } }"
                >
                  <span>{{ next.title }}</span>
                </nuxt-link>
              </p>
              <p class="text-sm">{{ next.summary | truncate(100) }}</p>
            </div>
          </div>
          <div class="column is-6">
            <div v-if="prev" class="text-right">
              <b-icon icon="arrow-right" size="is-small"></b-icon>
              <p class="text-base font-bold leading-5">
                <nuxt-link
                  class="has-text-white"
                  :to="{ name: showRoute, params: { slug: prev.slug } }"
                >
                  <span>{{ prev.title }}</span>
                </nuxt-link>
              </p>
              <p class="text-sm">{{ prev.summary | truncate(100) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PostSurround",
  props: ["prev", "next", "showRoute"],
};
</script>
