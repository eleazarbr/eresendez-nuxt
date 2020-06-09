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
                <div class="buttons">
                  <b-button @click="blogLayout = 'cards'" type="is-text" icon-right="card-text-outline"></b-button>
                  <b-button
                    @click="blogLayout = 'list'"
                    type="is-text"
                    icon-right="table-of-contents"
                  ></b-button>
                </div>
              </div>
              <div class="level-item">
                <b-field expanded>
                  <b-input
                    :placeholder="$t('search')"
                    type="search"
                    icon="search-web"
                    v-model="keyword"
                    @input="search"
                  ></b-input>
                </b-field>
              </div>
            </div>
          </div>

          <!-- Blog posts -->
          <!-- List -->
          <div v-if="blogLayout == 'list'">
            <b-table
              :hoverable="true"
              default-sort="name"
              :data="posts"
              class="mb-5"
              detailed
              :show-detail-icon="true"
            >
              <template slot-scope="props">
                <b-table-column label="Título">
                  <nuxt-link
                    class="hover:underline"
                    :to="{name: 'blog.post', params: {slug: props.row.slug}}"
                  >{{ props.row.title }}</nuxt-link>
                </b-table-column>
                <b-table-column label="Etiquetas">
                  <div class="tags">
                    <b-tag v-for="(tag, index) in props.row.tags" :key="index">{{ tag }}</b-tag>
                  </div>
                </b-table-column>
                <b-table-column
                  label="Fecha"
                >{{ $moment(props.row.date).locale($store.getters['lang/locale']).format('LL') }}</b-table-column>
              </template>
              <template slot="detail" slot-scope="props">
                <article class="media">
                  <figure class="media-left" v-if="props.row.image">
                    <div class="image is-64x64">
                      <img :src="imagesDir + props.row.image" />
                    </div>
                  </figure>
                  <div class="media-content">{{ props.row.summary }}</div>
                </article>
              </template>
            </b-table>
          </div>

          <!-- Cards -->
          <div class="columns is-multiline mt-5" v-if="blogLayout == 'cards'">
            <div class="column is-6" v-for="post in posts" :key="post.id">
              <post-card :post="post"></post-card>
            </div>
          </div>
          <!-- Pagination -->
          <div class="columns is-centered">
            <div class="column is-narrow">
              <b-pagination
                :total="total"
                :current.sync="currentPage"
                :per-page="perPage"
                range-before="3"
                range-after="1"
                @change="onPageChange"
              ></b-pagination>
            </div>
          </div>

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
import PostCard from '~/components/blog/PostCard'
import SubscribeForm from '~/components/blog/SubscribeForm'

export default {
	components: {
		PostCard,
		SubscribeForm
	},

	head() {
		return { title: this.$t('home') }
	},

	data: () => ({
		posts: [],
		keyword: '',
		currentPage: 1,
		nextPosts: 0,
		perPage: 6,
		total: 0,
		imagesDir: 'blog/',
		blogLayout: 'list'
	}),

	mounted() {
		this.getPosts()
		this.$content('blog')
			.only('slug')
			.fetch()
			.then((r) => {
				this.total = r.length
			})
	},

	methods: {
		search: _.debounce(function() {
			this.keyword ? this.searchPost() : this.getPosts()
		}, 1000),

		async searchPost() {
			let posts = await this.queryPosts()
				.search('title', this.keyword)
				.fetch()

			this.posts = posts
		},

		async getPosts() {
			let posts = await this.queryPosts()
				.limit(this.perPage)
				.skip(this.nextPosts)
				.fetch()

			this.posts = posts
		},

		queryPosts() {
			return this.$content('blog')
				.only([
					'title',
					'summary',
					'image',
					'slug',
					'date',
					'tags',
					'author',
					'is_featured'
				])
				.sortBy('date', 'desc')
		},

		onPageChange(page) {
			this.nextPosts =
				page > this.currentPage
					? this.nextPosts + this.perPage
					: this.nextPosts - this.perPage
			this.getPosts()
			this.currentPage = page
		}
	},

	computed: mapGetters({
		authenticated: 'auth/check'
	})
}
</script>
