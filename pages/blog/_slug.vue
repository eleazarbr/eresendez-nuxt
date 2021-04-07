<template>
  <div>
    <post-header :page="page"></post-header>

    <!-- Main Content -->
    <div class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-one-fifth is-hidden-mobile">
            <div class="content text-base sticky top-0 z-10">
              <table-of-contents :document="page"></table-of-contents>
            </div>
          </div>
          <div class="column is-8-desktop is-9-tablet is-auto-mobile">
            <breadcrumbs></breadcrumbs>

            <!-- Old post warning -->
            <b-notification
              v-if="$moment(page.updatedAt).add(6, 'months').isBefore()"
              type="is-info"
              has-icon
              >{{ $t("blog.old_post") }}</b-notification
            >

            <!-- Post body -->
            <div class="blog content text-sm sm:text-base md:text-lg">
              <!-- Main Content -->
              <nuxt-content :document="page"></nuxt-content>
            </div>

            <!-- Optional External URL  -->
            <div class="mt-10" v-if="page.external_url">
              <b-tooltip
                always
                :label="page.external_url['site']"
                position="is-right"
                type="is-dark"
                :square="true"
              >
                <b-button
                  tag="a"
                  type="is-info"
                  size="is-medium"
                  :href="page.external_url['url']"
                  target="_blank"
                  icon-right="link-variant"
                  >{{ $t("blog.read_more") }}</b-button
                >
              </b-tooltip>
            </div>

            <post-footer :page="page"></post-footer>
          </div>
        </div>
      </div>
    </div>

    <!-- Surround posts -->
    <post-surround :prev="prev" :next="next" show-route="post.show"></post-surround>
  </div>
</template>
<script>
import TableOfContents from "~/components/blog/TableOfContents.vue";
import Breadcrumbs from "~/components/web/Breadcrumbs";
import PostHeader from "~/components/blog/PostHeader.vue";
import PostFooter from "~/components/web/PostFooter";
import PostSurround from "~/components/web/PostSurround.vue";

export default {
  name: "post",
  transition: "slide",
  components: {
    TableOfContents,
    PostSurround,
    PostHeader,
    PostFooter,
    Breadcrumbs,
  },

  head() {
    return {
      title: this.page.title,
      meta: [
        { hid: "description", name: "description", content: this.page.summary },
        { hid: "og:title", property: "og:title", content: this.page.title },
        {
          hid: "og:description",
          property: "og:description",
          content: this.page.summary,
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.page.title,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.page.summary,
        },
      ],
    };
  },

  async asyncData({ $content, params }) {
    var slug = params.slug;
    const page = await $content("blog", slug).fetch();
    const [prev, next] = await $content("blog")
      .only(["title", "summary", "slug"])
      .sortBy("updatedAt", "asc")
      .surround(slug)
      .fetch();

    return {
      page,
      prev,
      next,
    };
  },
};
</script>
