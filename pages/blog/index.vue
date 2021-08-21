<template>
  <div class="hero">
    <div class="hero-body">
      <div class="container">
        <!-- Title bar -->
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <h2 class="is-size-3 has-text-weight-bold has-text-black">
                {{ $t("blog.posts") }}
                <span>&#9997;&#65039;</span>
              </h2>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <b-field group-multiline grouped>
                <b-field v-if="tag" expanded>
                  <div class="tags">
                    <b-tag type="is-dark" closable @close="clearSearch()">
                      {{ tag }}
                    </b-tag>
                  </div>
                </b-field>
                <b-field expanded>
                  <b-input
                    v-model="searchQuery"
                    type="search"
                    autocomplete="off"
                    icon="search-web"
                    :loading="isLoading"
                    :placeholder="$t('search')"
                    @input="search()"
                  ></b-input>
                </b-field>
              </b-field>
            </div>
          </div>
        </div>

        <!-- Blog posts section -->
        <div class="section">
          <div class="container">
            <!-- Posts -->
            <div class="columns is-multiline is-centered">
              <div
                class="column is-4-desktop is-6-tablet"
                v-for="(post, index) in posts"
                :key="index"
              >
                <PostCard :post="post" show-route="post.show"></PostCard>
              </div>
            </div>
          </div>
        </div>

        <!-- Subscribe form -->
        <div v-if="isSubscribeActive" class="section">
          <div class="columns is-centered">
            <div class="column is-7">
              <SubscribeForm></SubscribeForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubscribeForm from "~/components/blog/SubscribeForm";
import PostCard from "~/components/blog/PostCard.vue";

export default {
  name: "blog",
  transition: "slide",
  components: {
    SubscribeForm,
    PostCard,
  },

  head() {
    return { title: this.$t("home") };
  },

  data: () => ({
    posts: [],
    isLoading: false,
    searchQuery: "",
    tag: null,
    isSubscribeActive: false,
  }),

  mounted() {
    this.getPosts();
  },

  methods: {
    search: _.debounce(function () {
      this.searchQuery ? this.searchPost() : this.getPosts();
    }, 500),

    clearSearch() {
      this.tag = null;
      this.getPosts();
    },

    // async filterByTag(tag) {
    //   this.tag = tag;
    //   this.posts = await this.queryPosts()
    //     .where({ tags: { $contains: tag } })
    //     .fetch();
    // },

    // getTags() {
    //   var tags = this.posts.map((post) => post.tags);
    //   tags = _.sortBy(_.uniq(_.flatten(tags)));
    //   this.tags = tags;
    // },

    async searchPost() {
      this.isLoading = true;
      this.posts = await this.queryPosts().search("title", this.searchQuery).fetch();
      this.isLoading = false;
    },

    async getPosts() {
      this.isLoading = true;
      this.posts = await this.queryPosts().fetch();
      this.isLoading = false;
    },

    queryPosts() {
      return this.$content("blog")
        .sortBy("updatedAt", "desc")
        .only(["title", "summary", "image", "slug", "date", "tags", "updatedAt"]);
    },
  },
};
</script>
