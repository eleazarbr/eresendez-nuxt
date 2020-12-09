<template>
  <div>
    <div class="columns">
      <!-- Menu -->
      <div class="column is-3">
        <b-menu class="p-5">
          <b-menu-list label="Menu">
            <b-menu-item :active="isActive" expanded>
              <template slot="label" slot-scope="props">
                Sharing
                <b-icon
                  class="is-pulled-right"
                  :icon="props.expanded ? 'menu-down' : 'menu-up'"
                ></b-icon>
              </template>
              <b-menu-item
                tag="nuxt-link"
                :to="{
                  name: 'wiki.article',
                  params: { slug: 'my-github' },
                }"
                label="My GitHub"
              ></b-menu-item>
              <b-menu-item label="My Workflowy"></b-menu-item>
            </b-menu-item>
          </b-menu-list>
        </b-menu>
      </div>

      <!-- Content -->
      <div class="column is-auto">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "wiki",

  data: () => ({
    isActive: true,
  }),

  // async asyncData({ $content }) {
  //   const page = await $content("wiki", { deep: true }).fetch();
  //   return {
  //     page,
  //   };
  // },

  // mounted() {
  //   console.log(this.page);
  // },
};
</script>
