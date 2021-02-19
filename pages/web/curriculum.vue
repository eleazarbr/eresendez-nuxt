<template>
  <div class="section">
    <div class="container">
      <!-- download button -->
      <!-- <div class="buttons is-right">
        <b-button icon-left="file-pdf" type="is-danger" @click="generatePdf"
          >Download PDF</b-button
        >
      </div> -->

      <!-- CV -->
      <div id="curriculum">
        <div class="columns is-centered">
          <div class="column is-6-desktop is-8-tablet">
            <!-- Heading -->
            <div class="columns is-vcentered is-mobile">
              <div class="column is-narrow">
                <figure class="image is-96x96">
                  <img class="is-rounded" :src="cv.avatar" alt="Image" />
                </figure>
              </div>
              <div class="column is-auto">
                <div class="content text-sm">
                  <h3 class="title">
                    {{ cv.title }}
                  </h3>
                  <p class="subtitle is-size-6">
                    {{ cv.subtitle[locale] }}
                  </p>
                  <div v-for="(website, i) in cv.websites" :key="i">
                    <a class="leading-3" :href="website.url" target="_blank">
                      <b-icon size="is-small" :icon="website.icon"></b-icon>
                      <span>
                        {{ website.name }}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- About -->
            <div class="content text-sm">
              <h3>{{ cv.about.title[locale] }}</h3>
              <p>
                {{ cv.about.description[locale] }}
              </p>

              <!-- Tools -->
              <p>
                {{ tools }}
              </p>
            </div>

            <!-- Other sections -->
            <div
              class="content text-sm"
              v-for="(section, sectionIndex) in cv.sections"
              :key="sectionIndex"
            >
              <h3>{{ section.title[locale] }}</h3>
              <div
                class="columns"
                v-for="(content, contentIndex) in section.content"
                :key="contentIndex"
              >
                <div class="column is-3">
                  {{ content.dates }}
                </div>
                <div class="column is-auto">
                  <p>
                    <a v-if="content.url" :href="content.url" target="_blank">
                      <span>{{ content.title[locale] }}</span>
                      <b-icon icon="link" size="is-small"></b-icon>
                    </a>
                    <span v-else class="font-bold">{{ content.title[locale] }}</span>
                    <br />
                    <span v-if="content.subtitle">{{ content.subtitle }}</span>
                  </p>
                  <p v-if="content.description">
                    {{ content.description[locale] }}
                  </p>
                  <!-- Tags -->
                  <p v-if="content.tags">
                    {{ join(content.tags) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    join(array) {
      return _.join(_.sortBy(array), ", ");
    },
  },

  computed: {
    locale() {
      return this.$store.getters["lang/locale"];
    },

    tools() {
      var tags = this.cv.sections.map((section) =>
        section.content.map((content) => content.tags)
      );

      tags = _.uniq(_.flattenDepth(tags, 2));
      return this.join(tags);
    },
  },
};
</script>
