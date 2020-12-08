<template>
  <div>
    <post-header :page="page"></post-header>

    <!-- Main Content -->
    <div class="section has-background-white">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-8">
            <!-- Old post warning -->
            <b-notification
              v-if="$moment(page.date).add(6, 'months').isBefore()"
              type="is-info"
              has-icon
              >{{ $t('blog.old_post') }}</b-notification
            >

            <!-- Post body -->
            <div class="content text-base sm:text-lg md:text-lg">
              <table-of-contents :document="page"></table-of-contents>
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
                  >{{ $t('blog.read_more') }}</b-button
                >
              </b-tooltip>
            </div>

            <hr />

            <!-- GitHub Comments -->
            <div>
              <script
                type="application/javascript"
                src="https://utteranc.es/client.js"
                repo="eleazarbr/eresendez"
                issue-term="pathname"
                theme="preferred-color-scheme"
                crossorigin="anonymous"
                async
              ></script>
            </div>

            <!-- Share this -->
            <b-field :label="$t('blog.share')">
              <add-to-any />
            </b-field>
          </div>
        </div>
      </div>
    </div>

    <!-- Surround posts -->
    <div class="hero is-black is-bold">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-mobile">
            <div class="column is-6">
              <div v-if="next" class="text-left">
                <p class="title is-6">
                  <nuxt-link
                    class="has-text-white"
                    :to="{ name: 'blog.post', params: { slug: next.slug } }"
                  >
                    <b-icon icon="arrow-left" size="is-small"></b-icon>
                    <span>{{ next.title }}</span>
                  </nuxt-link>
                </p>
                <p class="subtitle is-6">{{ next.summary | truncate(100) }}</p>
              </div>
            </div>
            <div class="column is-6">
              <div v-if="prev" class="text-right">
                <p class="title is-6">
                  <nuxt-link
                    class="has-text-white"
                    :to="{ name: 'blog.post', params: { slug: prev.slug } }"
                  >
                    <span>{{ prev.title }}</span>
                    <b-icon icon="arrow-right" size="is-small"></b-icon>
                  </nuxt-link>
                </p>
                <p class="subtitle is-6">{{ prev.summary | truncate(100) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TableOfContents from '~/components/blog/TableOfContents.vue'
import PostHeader from '~/components/blog/PostHeader.vue'
import SubscribeForm from '~/components/blog/SubscribeForm'
import AddToAny from '~/components/blog/AddToAny'
export default {
  name: 'post',
  transition: 'slide',
  components: {
    AddToAny,
    SubscribeForm,
    TableOfContents,
    PostHeader,
  },

  head() {
    return {
      title: this.page.title,
      meta: [
        { hid: 'description', name: 'description', content: this.page.summary },
        { hid: 'og:title', property: 'og:title', content: this.page.title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.page.summary,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.page.title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.page.summary,
        },
      ],
    }
  },

  async asyncData({ $content, params }) {
    let slug = params.slug
    const page = await $content(`blog/${slug}`).fetch()

    const [prev, next] = await $content('blog')
      .only(['title', 'summary', 'slug'])
      .sortBy('date', 'asc')
      .surround(slug)
      .fetch()

    return {
      page,
      prev,
      next,
    }
  },

  data: () => ({}),
}
</script>

<style lang="css">
.content img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  height: auto;
  max-width: 100%;
}

hr {
  font-size: 1.25rem;
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

.content blockquote {
  color: #2160c4;
  background-color: #eef3fc;
  border-left: 5px solid #3273dc;
  padding: 1.25em 1.5em;
  quotes: '\201C''\201D''\2018''\2019';
}

.cp_embed_wrapper {
  overflow: hidden;
  resize: both;
  background: white;
  padding-bottom: 10px;
  height: 400px;
}

.cp_embed_wrapper iframe {
  height: 100% !important;
}

.nuxt-content-highlight {
  margin-bottom: 1em;
}
</style>
