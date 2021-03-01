<template>
  <div class="section">
    <div class="container">
      <!-- download button -->
      <div class="buttons is-right mt-1 is-hidden-mobile">
        <b-button
          type="is-danger"
          rounded
          :loading="isGeneratingPdf"
          @click="generatePdf"
          >{{ $t("buttons.download_pdf") }}</b-button
        >
      </div>

      <!-- CV -->
      <div id="curriculum">
        <div class="columns is-centered">
          <div class="column" :class="{ 'is-6-desktop is-8-tablet': !isGeneratingPdf }">
            <!-- Heading -->
            <div class="columns is-vcentered is-mobile">
              <div class="column is-narrow">
                <!-- Avatar -->
                <div class="flex justify-center">
                  <figure class="image is-96x96">
                    <img class="is-rounded" :src="cv.avatar" alt="Image" />
                  </figure>
                </div>
              </div>
              <div class="column is-auto">
                <div class="content text-sm">
                  <h3 class="title is-size-5-desktop is-size-6-mobile truncate">
                    {{ cv.title }}
                  </h3>
                  <p class="subtitle is-size-6">
                    {{ cv.subtitle[locale] }}
                  </p>
                  <div v-for="(link, i) in cv.links" :key="i">
                    <a class="leading-3" :href="link.url" target="_blank">
                      <b-icon size="is-small" :icon="link.icon"></b-icon>
                      <span>
                        {{ link.name }}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- About -->
            <div class="content text-sm">
              <h3>{{ cv.about.title[locale] }}</h3>
              <p class="has-text-dark">
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
                class="columns is-mobile"
                v-for="(content, contentIndex) in section.content"
                :key="contentIndex"
              >
                <div class="column is-3">
                  {{ content.dates }}
                </div>
                <div class="column is-auto">
                  <p>
                    <!-- Section content title -->
                    <span v-if="content.title">
                      <a v-if="content.url" :href="content.url" target="_blank">
                        <span>{{ content.title[locale] }}</span>
                        <b-icon icon="link" size="is-small"></b-icon>
                      </a>
                      <span v-else class="font-bold">{{ content.title[locale] }}</span>
                      <br />
                    </span>

                    <!-- Section content subtitle -->
                    <span v-if="content.subtitle">{{ content.subtitle }}</span>
                  </p>
                  <p v-if="content.description" class="has-text-dark">
                    {{ content.description[locale] }}
                  </p>
                  <!-- Tags -->
                  <p v-if="content.tags">
                    {{ join(content.tags) }}
                  </p>

                  <!-- Dependencies -->
                  <p v-if="content.dependencies">
                    {{
                      $t("cv.dependencies", { dependencies: join(content.dependencies) })
                    }}
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
import html2pdf from "html2pdf.js";
export default {
  name: "curriculum",
  transition: "slide",
  head() {
    return {
      title: "Curriculum",
    };
  },

  data: () => ({
    isGeneratingPdf: false,
  }),

  async asyncData() {
    return {
      cv,
    };
  },

  methods: {
    join(array) {
      return _.join(_.sortBy(array), ", ");
    },

    generatePdf() {
      this.isGeneratingPdf = true;
      const element = document.getElementById("curriculum");
      var options = {
        margin: 1,
        filename: "eleazar-resendez-cv.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          scrollX: 0,
          scrollY: 0,
        },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      var worker = html2pdf().set(options).from(element).save();
      worker
        .then((r) => {
          this.isGeneratingPdf = false;
        })
        .catch((e) => {
          this.isGeneratingPdf = false;
        });
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
