<template>
  <div class="hero is-white">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <div class="has-text-centered mb-10">
              <p class="text-lg has-text-primary">
                {{ page.title }}
              </p>
              <p class="text-base">Eleazar Reséndez</p>
            </div>

            <div class="content text-sm">
              <nuxt-content :document="page" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about',
  head() {
    return { title: this.$t('home') }
  },

  async asyncData({ $content }) {
    const page = await $content('web/about').fetch()
    return {
      page,
    }
  },

  mounted() {
    console.log(this.page)
  },
}
</script>
