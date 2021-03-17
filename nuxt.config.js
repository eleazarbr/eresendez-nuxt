require('dotenv').config()
import webpack from 'webpack'

let posts = []
const createSitemapRoutes = async () => {
  let routes = []
  const { $content } = require('@nuxt/content')
  if (posts === null || posts.length === 0)
    posts = await $content('blog').fetch()
  for (const post of posts) {
    routes.push(`blog/${post.slug}`)
  }
  return routes
}

export default {
  ssr: false,
  target: 'static',

  head: {
    title: process.env.APP_NAME || '',
    titleTemplate: '%s - ' + process.env.APP_NAME,
    htmlAttrs: { lang: 'es' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Eleazar Resendez Blog'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
      }
    ]
  },

  loading: { color: '#fff' },

  router: {
    middleware: ['locale', 'check-auth'],
    linkActiveClass: 'is-active'
  },

  css: [
    { src: '~assets/sass/app.scss', lang: 'scss' },
    { src: '~assets/sass/fonts.scss', lang: 'scss' }
  ],

  plugins: ['~components/global', '~plugins/i18n', '~/plugins/vue2-filters'],

  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/moment',
    '@nuxtjs/google-analytics'
  ],

  modules: [
    '@nuxtjs/router',
    '@nuxt/content',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    'nuxt-buefy',
    '@nuxtjs/sitemap'
  ],

  tailwindcss: {
    configPath: '~/tailwind.config.js',
    cssPath: '~/assets/css/tailwind.css',
    exposeConfig: false
  },

  buefy: {
    materialDesignIcons: true,
    defaultIconPack: 'mdi'
  },

  sitemap: {
    hostname: 'https://eresendez.com',
    gzip: true,
    routes: createSitemapRoutes
  },

  moment: {
    defaultTimezone: 'America/Monterrey',
    defaultLocale: 'es',
    locales: ['es']
  },

  content: {
    liveEdit: false,
    markdown: {
      footnotes: {
        inlineNotes: true
      },
      prism: {
        theme: 'prism-themes/themes/prism-dracula.css'
      },
      remarkPlugins: ['remark-emoji', 'remark-footnotes']
    }
  },

  axios: {},

  hooks: {
    'content:file:beforeInsert': (document) => {
      if (document.extension === '.md') {
        const { text } = require('reading-time')(document.text)
        document.readingTime = text
      }
    }
  },

  build: {
    postcss: {
      preset: {
        features: {
          // Fixes: https://github.com/tailwindcss/tailwindcss/issues/1190#issuecomment-546621554
          'focus-within-pseudo-class': false
        }
      }
    },

    // Fixes: https://github.com/nuxt/nuxt.js/issues/8882
    babel: {
      presets () {
        return [
          [
            '@nuxt/babel-preset-app',
            {
              corejs: {
                version: 3
              }
            }
          ]
        ]
      }
    },

    plugins: [
      new webpack.ProvidePlugin({
        _: 'lodash'
      })
    ],
    extend (config, ctx) {}
  }
}
