<template>
  <div class="hero">
    <div class="hero-body">
      <div class="container">
        <!-- Title bar -->
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <h2 class="text-3xl font-bold has-text-black">
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
                    <b-tag type="is-dark" closable @close="clearSearch">
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
                    :placeholder="$t('search')"
                    @input="search"
                  ></b-input>
                </b-field>
              </b-field>
            </div>
          </div>
        </div>

        <!-- Blog posts -->
        <b-table
          detailed
          default-sort="date"
          default-sort-direction="desc"
          :loading="table.loading"
          :hoverable="true"
          :striped="true"
          :narrowed="true"
          :show-detail-icon="true"
          :data="posts"
        >
          <template slot-scope="props">
            <b-table-column :label="$t('blog.title')">
              <nuxt-link
                class="hover:underline"
                :to="{
                  name: 'post.show',
                  params: { slug: props.row.slug },
                }"
                >{{ props.row.title }}</nuxt-link
              >
            </b-table-column>
            <b-table-column :label="$t('blog.tags')">
              <b-taglist>
                <b-tag
                  v-for="(tag, index) in props.row.tags"
                  :key="index"
                  type="is-dark"
                  class="is-light cursor-pointer"
                  :class="{ 'is-danger': tag === 'Draft' }"
                  @click.native="filterByTag(tag)"
                  >{{ tag }}</b-tag
                >
              </b-taglist>
            </b-table-column>
            <b-table-column :label="$t('blog.date')" sortable field="date">{{
              $moment(props.row.date).locale($store.getters["lang/locale"]).format("LL")
            }}</b-table-column>
          </template>
          <template slot="detail" slot-scope="props">
            <article class="media">
              <div class="media-content">{{ props.row.summary }}</div>
            </article>
          </template>
          <template slot="empty">
            <div class="section has-text-centered">
              <div v-if="!table.loading">
                <b-icon icon="table"></b-icon>
                <p class="font-bold">No se encontraron registros.</p>
              </div>
            </div>
          </template>
        </b-table>

        <!-- Subscribe form -->
        <div v-if="isSubscribeActive" class="section">
          <div class="columns is-centered">
            <div class="column is-7">
              <subscribe-form></subscribe-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SubscribeForm from "~/components/blog/SubscribeForm";

export default {
  name: "blog",
  transition: "slide",
  components: {
    SubscribeForm,
  },

  head() {
    return { title: this.$t("home") };
  },

  data: () => ({
    table: { loading: false },
    posts: [],
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
    }, 1000),

    clearSearch() {
      this.tag = null;
      this.getPosts();
    },

    async filterByTag(tag) {
      this.table.loading = true;
      this.tag = tag;
      this.posts = await this.queryPosts()
        .where({ tags: { $contains: tag } })
        .fetch();
      this.table.loading = false;
    },

    async searchPost() {
      this.table.loading = true;
      this.posts = await this.queryPosts().search("title", this.searchQuery).fetch();
      this.table.loading = false;
    },

    async getPosts() {
      this.table.loading = true;
      this.posts = await this.queryPosts().fetch();
      this.table.loading = false;
    },

    getTags() {
      var tags = this.posts.map((post) => post.tags);
      tags = _.sortBy(_.uniq(_.flatten(tags)));
      this.tags = tags;
    },

    queryPosts() {
      return this.$content("blog").only(["title", "summary", "slug", "date", "tags"]);
    },
  },
};
</script>
