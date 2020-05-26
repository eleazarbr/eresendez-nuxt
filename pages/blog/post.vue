<template>
  <div>
    <div class="hero is-light is-bold is-small">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered is-vcentered">
            <!-- Title and metadata -->
            <div class="column">
              <h2
                class="font-bold text-2xl sm:text-3xl has-text-black leading-tight"
              >{{ page.title }}</h2>
              <div class="text-sm sm:text-base text-black mt-2">
                <p>{{ $moment(page.date).locale($store.getters['lang/locale']).format('LL') }}</p>
                <p
                  v-if="page.last_updated_at"
                >{{ $t('blog.last_update', {date: $moment(page.last_updated_at).locale($store.getters['lang/locale']).fromNow()}) }}</p>
              </div>
            </div>
            <!-- Image -->
            <div class="column is-4" v-if="page.image">
              <figure class="image is-256xauto">
                <img :src="imagesDir + page.image" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-8">
            <!-- Old post warning -->
            <b-notification
              v-if="$moment(page.date).add(6, 'months').isBefore()"
              type="is-info"
              has-icon
              aria-close-label="Close notification"
            >{{$t('blog.old_post')}}</b-notification>

            <!-- Post body -->
            <div class="content text-base sm:text-lg md:text-xl">
              <nuxt-content :document="page" />
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
                >{{ $t('blog.read_more') }}</b-button>
              </b-tooltip>
            </div>

            <hr />

            <!-- Subscribe form -->
            <div class="content">
              <!-- Tags -->
              <p>{{ $t('blog.tags', {tags: page.tags.join(', ')}) }}</p>
              <!-- Comments -->
              <p>
                {{ $t('blog.comments_1') }}
                <a
                  class="has-text-primary"
                  href="https://twitter.com/eleazarbr"
                  target="_blank"
                >@eleazarbr</a>
                {{ $t('blog.comments_2') }}
              </p>
              <!-- Share -->
              <div class="columns is-vcentered is-mobile is-variable is-1">
                <div class="column is-narrow">{{ $t('blog.share') }}</div>
                <div class="column">
                  <add-to-any />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Next post -->

    <!-- Random post -->

    <!-- Floating header -->
  </div>
</template>
<script>
import AddToAny from '~/components/blog/AddToAny'

export default {
	name: 'post',
	transition: 'slide',
	head() {
		return { title: this.page.title }
	},

	async asyncData(context) {
		let slug = context.params.slug
		const page = await context.$content('blog/' + slug).fetch()

		return {
			page
		}
	},

	components: { AddToAny },

	data: () => ({
		author: 'Eleazar R.',
		imagesDir: 'blog/'
	})
}
</script>

<style lang="css">
.content a {
	color: #3273dc;
	text-decoration: underline;
}

.content img {
	display: block;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 30px;
	height: auto;
	max-width: 100%;
}

hr {
	border: none;
	color: #111;
	letter-spacing: 1em;
	text-align: center;
	margin-bottom: 4rem;
	margin-top: 4rem;
}

hr:before {
	content: '...';
}

code[class*='language-'],
pre[class*='language-'] {
	font-size: 0.875rem;
}

code,
kbd,
samp {
	font-size: 1rem;
}

.content .tag,
.content .number {
	display: inline;
	padding: inherit;
	font-size: inherit;
	line-height: inherit;
	text-align: inherit;
	vertical-align: inherit;
	border-radius: inherit;
	font-weight: inherit;
	white-space: inherit;
	background: inherit;
	margin: inherit;
}

.a2a_svg,
.a2a_count {
	border-radius: 0 !important;
}

.icon-link::before {
	content: '#';
	margin-right: 0.5rem;
}
</style>
