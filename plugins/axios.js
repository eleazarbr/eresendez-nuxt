import axios from 'axios'
import Vue from 'vue';
import { SnackbarProgrammatic as Snackbar } from 'buefy'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export default ({ app, store, redirect }) => {
  axios.defaults.baseURL = process.env.apiUrl

  if (process.server) {
    return
  }

  // Request interceptor
  axios.interceptors.request.use((request) => {
    request.baseURL = process.env.apiUrl

    const token = store.getters['auth/token']

    if (token) {
      request.headers.common.Authorization = `Bearer ${token}`
    }

    const locale = store.getters['lang/locale']
    if (locale) {
      request.headers.common['Accept-Language'] = locale
    }

    return request
  })

  // Response interceptor
  axios.interceptors.response.use(response => response, (error) => {
    const { status } = error.response || {}

    if (status >= 500) {
      Snackbar.open({
        type: 'is-danger',
        message: app.i18n.t('error_alert_text'),
        position: 'is-bottom-left'
      })
    }

    if (status === 401 && store.getters['auth/check']) {
      Snackbar.open({
        type: 'is-danger',
        message: app.i18n.t('token_expired_alert_text'),
        position: 'is-bottom-left'
      }).then(() => {
        store.commit('auth/LOGOUT')

        redirect({ name: 'login' })
      })
    }

    return Promise.reject(error)
  })
}

Vue.prototype.axios = axios;
