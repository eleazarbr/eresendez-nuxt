<template>
  <div class="section">
    <div class="container">
      <!-- download button -->
      <div class="buttons is-right mt-1">
        <b-button
          size="is-small"
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
                class="columns is-mobile"
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
import html2pdf from "html2pdf.js";
export default {
  name: "curriculum",
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
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      var worker = html2pdf().set(options).from(element).save();
      worker
        .then((r) => {
          this.isGeneratingPdf = false;
        })
        .catch((e) => {
          console.log(e);
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
