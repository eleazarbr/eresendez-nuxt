<template>
  <div class="hero is-black is-bold h-80">
    <!-- Blurred image -->
    <div
      class="has-bg-image is-parallax absolute w-full h-80"
      :style="`
          filter: blur(5px);
          background-image: url('https://source.unsplash.com/${page.image}');
        `"
    ></div>

    <!-- Hero content -->
    <div class="hero-body flex items-center">
      <div class="container">
        <div class="columns">
          <div class="column is-auto">
            <!-- Post title -->
            <h2 class="text-2xl sm:text-3xl leading-tight font-bold">
              {{ page.title }}
            </h2>

            <!-- Metadata -->
            <div class="text-sm sm:text-base mt-2">
              <p>
                <b-icon icon="calendar-month" size="is-small"></b-icon>
                <span
                  v-html="
                    $t('blog.posted_on', {
                      date: $moment(page.date)
                        .locale($store.getters['lang/locale'])
                        .format('ll'),
                    })
                  "
                >
                </span>
              </p>
              <p v-if="page.updated_at" class="italic">
                {{
                  $t("blog.last_update", {
                    date: $moment(page.updated_at)
                      .locale($store.getters["lang/locale"])
                      .fromNow(),
                  })
                }}
              </p>
              <p>
                <b-icon icon="clock-outline" size="is-small"></b-icon>
                {{ page.readingTime }}
              </p>
              <b-taglist class="mt-1">
                <b-tag
                  v-for="(tag, index) in page.tags"
                  :key="index"
                  type="is-primary"
                  :class="{ 'is-danger': tag === 'Draft' }"
                >
                  <span class="font-bold">
                    {{ tag }}
                  </span>
                </b-tag>
              </b-taglist>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-foot">
      <div class="container">
        <breadcrumbs></breadcrumbs>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from "~/components/web/Breadcrumbs";
export default {
  name: "PostHeader",
  props: ["page"],
  components: {
    Breadcrumbs,
  },
};
</script>
