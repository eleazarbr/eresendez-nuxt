<template>
  <div class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-8">
          <Breadcrumbs></Breadcrumbs>
          <div class="content">
            <!-- Title -->
            <h2 class="title">Projects</h2>
            <p class="subtitle">Weekend hacks for fun and learning.</p>

            <!-- Projects -->
            <ul>
              <li v-for="(project, index) in projects" :key="index">
                <span class="has-text-weight-bold">
                  {{ project.title }}
                </span>
                <span v-if="project.description"> - {{ project.description }} </span>
                <ul>
                  <li
                    class="has-text-weight-bold"
                    v-for="(link, index) in project.links"
                    :key="index"
                  >
                    <nuxt-link
                      :href="link.url"
                      :to="link.hasOwnProperty('to') ? link.to : ''"
                      :target="link.target"
                    >
                      {{ link.label }}
                    </nuxt-link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Breadcrumbs from "~/components/web/Breadcrumbs";
import projects from "~/static/data/projects.json";
export default {
  name: "projects",

  transition: "slide",

  components: {
    Breadcrumbs,
  },

  head() {
    return {
      title: "Side Projects",
    };
  },

  asyncData({ params }) {
    return { projects };
  },
};
</script>
