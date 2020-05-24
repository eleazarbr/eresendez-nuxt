require('dotenv').config()
import webpack from 'webpack'

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
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
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  router: {
    middleware: ['locale'],
    linkActiveClass: 'is-active'
  },

  /*
   ** Global CSS
   */
  css: [
    { src: '~assets/sass/app.scss', lang: 'scss' }
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/i18n',
  ],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/moment',
    '@nuxtjs/google-analytics'
  ],
  /*
   ** Nuxt.js modules
   */
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
      prism: {
        theme: 'prism-themes/themes/prism-dracula.css'
      }
    }
  },

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
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
