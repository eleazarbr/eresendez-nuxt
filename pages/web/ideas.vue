<template>
  <div class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-8">
          <div class="content text-sm sm:text-base md:text-base">
            <nuxt-content :document="page" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ideas',
  head() {
    return { title: this.page.title }
  },

  async asyncData({ $content }) {
    const page = await $content('web/ideas/ideas').fetch()
    return {
      page,
    }
  },
}
</script>
