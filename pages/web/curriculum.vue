<template>
  <div class="section">
    <div class="container">
      <!-- download button -->
      <div class="buttons is-right">
        <b-button icon-left="file-pdf" type="is-danger" @click="generatePdf"
          >Download PDF</b-button
        >
      </div>

      <!-- CV -->
      <div id="curriculum">
        <!-- Heading -->
        <div class="columns is-centered">
          <div class="column is-6-desktop is-8-tablet">
            <div class="columns is-vcentered is-mobile">
              <div class="column is-narrow">
                <figure class="image is-96x96">
                  <img class="is-rounded" :src="cv.avatar" alt="Image" />
                </figure>
              </div>
              <div class="column">
                <p class="text-base sm:text-lg">
                  {{ cv.display_name }}
                </p>
                <div class="text-xs sm:text-sm">
                  <p>
                    {{ cv.current_position[locale] }}
                  </p>
                  <div v-for="(website, i) in cv.websites" :key="i" class="leading-3">
                    <a class="text-gray-500" :href="website.url" target="_blank">
                      <b-icon size="is-small" :icon="website.icon"></b-icon>
                      <span>
                        {{ website.name }}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Content -->
      </div>
    </div>
  </div>
</template>
<script>
import cv from "~/static/data/cv.json";
export default {
  name: "curriculum",

  head() {
    return {
      title: "Curriculum",
    };
  },

  async asyncData({ params, $content }) {
    return {
      cv,
    };
  },

  methods: {
    generatePdf() {
      //
    },
  },

  computed: {
    locale() {
      return this.$store.getters["lang/locale"];
    },
  },
};
</script>
