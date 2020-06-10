require('dotenv').config()
import webpack from 'webpack'

export default {
  mode: 'spa',

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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  loading: { color: '#fff' },

  router: {
    middleware: ['locale', 'check-auth'],
    linkActiveClass: 'is-active'
  },

  css: [
    { src: '~assets/sass/app.scss', lang: 'scss' }
  ],

  plugins: [
    '~components/global',
    '~plugins/i18n'
  ],

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
    'nuxt-buefy'
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

  moment: {
    defaultTimezone: 'America/Monterrey',
    defaultLocale: 'es',
    locales: ['es']
  },

  content: {
    markdown: {
      footnotes: {
        inlineNotes: true
      },
      prism: {
        theme: 'prism-themes/themes/prism-dracula.css'
      },
      plugins: []
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
    extractCSS: true,
    plugins: [
      new webpack.ProvidePlugin({
        '_': 'lodash'
      })
    ],
    extend(config, ctx) { }
  }
}
