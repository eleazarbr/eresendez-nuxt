<template>
  <div class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-8">
          <breadcrumbs></breadcrumbs>
          <div class="content text-sm sm:text-base md:text-base">
            <nuxt-content :document="page" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from "~/components/web/Breadcrumbs";
export default {
  name: "ideas",
  components: {
    Breadcrumbs,
  },
  head() {
    return { title: this.page.title };
  },

  async asyncData({ $content }) {
    const page = await $content("web/ideas/ideas").fetch();
    return {
      page,
    };
  },
};
</script>
