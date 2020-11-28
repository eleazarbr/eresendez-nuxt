<template>
  <div>
    <div class="hero">
      <div class="hero-body">
        <div class="container">
          <!-- Title bar -->
          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <h2 class="text-3xl font-bold has-text-black">
                  {{ $t('blog.posts') }}
                  <span>&#9997;&#65039;</span>
                </h2>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <b-field expanded>
                  <b-input
                    :placeholder="$t('search')"
                    type="search"
                    icon="search-web"
                    v-model="searchKeyword"
                    @input="search"
                  ></b-input>
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
            :data="posts"
            :show-detail-icon="true"
          >
            <template slot-scope="props">
              <b-table-column :label="$t('blog.title')">
                <nuxt-link
                  class="hover:underline"
                  :to="{
                    name: 'blog.post',
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
                    class="is-light"
                    >{{ tag }}</b-tag
                  >
                </b-taglist>
              </b-table-column>
              <b-table-column :label="$t('blog.date')" sortable field="date">{{
                $moment(props.row.date)
                  .locale($store.getters['lang/locale'])
                  .format('LL')
              }}</b-table-column>
            </template>
            <template slot="detail" slot-scope="props">
              <article class="media">
                <figure class="media-left" v-if="props.row.image">
                  <div class="image is-64x64">
                    <img :src="`${imagesDir}/${props.row.image}`" />
                  </div>
                </figure>
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
          <div class="section">
            <div class="columns is-centered">
              <div class="column is-7">
                <subscribe-form></subscribe-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SubscribeForm from '~/components/blog/SubscribeForm'

export default {
  name: 'welcome',
  components: {
    SubscribeForm,
  },

  head() {
    return { title: this.$t('home') }
  },

  data: () => ({
    posts: [],
    searchKeyword: '',
    imagesDir: 'blog',
    table: {
      loading: false,
    },
  }),

  mounted() {
    this.getPosts()
  },

  methods: {
    search: _.debounce(function () {
      this.searchKeyword ? this.searchPost() : this.getPosts()
    }, 1000),

    async searchPost() {
      this.table.loading = true
      var posts = await this.queryPosts()
        .search('title', this.searchKeyword)
        .fetch()
      this.posts = posts
      this.table.loading = false
    },

    async getPosts() {
      this.table.loading = true
      var posts = await this.queryPosts().fetch()
      this.posts = posts
      this.table.loading = false
    },

    queryPosts() {
      return this.$content('blog').only([
        'title',
        'summary',
        'image',
        'slug',
        'date',
        'tags',
        'author',
        'is_featured',
      ])
    },
  },

  computed: mapGetters({
    authenticated: 'auth/check',
  }),
}
</script>
