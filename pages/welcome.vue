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
                <b-field group-multiline grouped>
                  <b-field v-show="false" expanded>
                    <b-select placeholder="Etiquetas">
                      <option :value="null"></option>
                      <option
                        v-for="(tag, index) in tags"
                        :key="index"
                        :value="tag"
                      >
                        {{ tag }}
                      </option>
                    </b-select>
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
                    :class="{ 'is-danger': tag === 'Draft' }"
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
    tags: [],
    searchQuery: '',
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
      this.searchQuery ? this.searchPost() : this.getPosts()
    }, 1000),

    searchByTag() {
      // const products = await this.$content('products').where({ 'categories.slug': { $contains: 'top' } }).fetch()
    },

    async searchPost() {
      this.table.loading = true
      this.posts = await this.queryPosts()
        .search('title', this.searchQuery)
        .fetch()
      this.table.loading = false
    },

    async getPosts() {
      this.table.loading = true
      this.posts = await this.queryPosts().fetch()

      var tags = this.posts.map((post) => post.tags)
      tags = _.sortBy(_.uniq(_.flatten(tags)))
      this.tags = tags
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
