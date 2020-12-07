<template>
  <div class="section">
    <div class="container">
      <div class="columns is-multiline is-centered">
        <div
          class="column is-half"
          v-for="(project, index) in projects"
          :key="index"
        >
          <div class="card">
            <div class="card-image">
              <figure class="image is-3by1">
                <img
                  class="bg-cover"
                  :src="`https://source.unsplash.com/${project.image}`"
                  :alt="project.title"
                />
              </figure>
            </div>
            <div class="card-content">
              {{ project.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import projects from '~/static/data/projects.json'
export default {
  name: 'projects',
  head() {
    return {
      title: 'Side Projects',
    }
  },

  asyncData({ params }) {
    return { projects }
  },
}
</script>
