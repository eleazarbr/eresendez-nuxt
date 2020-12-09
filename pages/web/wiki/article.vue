<template>
  <div>
    <div class="section has-background-white">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-8">
            <div class="content text-base sm:text-lg md:text-lg">
              <nuxt-content :document="page"></nuxt-content>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "article",
  async asyncData({ $content, params }) {
    let slug = params.slug;
    const page = await $content(`wiki/sharing/${slug}`, { deep: true }).fetch();

    // const [prev, next] = await $content("blog")
    //   .only(["title", "summary", "slug"])
    //   .sortBy("date", "asc")
    //   .surround(slug)
    //   .fetch();

    return {
      page,
      // prev,
      // next,
    };
  },
};
</script>
