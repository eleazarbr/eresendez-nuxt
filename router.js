import Vue from 'vue'
import Router from 'vue-router'
import VueAnalytics from 'vue-analytics'
import { scrollBehavior } from '~/utils'

Vue.use(Router)
const page = (path) => () =>
  import(`~/pages/${path}`).then((m) => m.default || m)

const routes = [
  { path: '/', name: 'web.home', component: page('welcome.vue') },
  { path: '/blog', name: 'blog.index', component: page('blog/index.vue') },
  { path: '/blog/:slug', name: 'post.show', component: page('blog/_slug.vue') },
  {
    path: '/microblog',
    name: 'microblog.index',
    component: page('microblog/index.vue')
  },
  {
    path: '/microblog/:slug',
    name: 'micropost.show',
    component: page('microblog/_slug.vue')
  },

  { path: '/ideas', name: 'web.ideas', component: page('web/ideas.vue') },
  {
    path: '/wiki',
    component: page('web/wiki.vue'),
    children: [
      {
        path: '/wiki/:category/:slug',
        name: 'wiki.article',
        component: page('web/wiki/article.vue')
      }
    ]
  },

  {
    path: '/side-projects',
    name: 'web.projects',
    component: page('web/projects.vue')
  },
  {
    path: '/side-projects/:slug',
    name: 'project.show',
    component: page('blog/_slug.vue')
  },
  { path: '/resume', name: 'web.cv', component: page('web/curriculum.vue') }
  // { path: '/about', name: 'web.about', component: page('web/about.vue') },
]

const router = new Router({
  routes,
  scrollBehavior,
  mode: 'history'
})

Vue.use(VueAnalytics, {
  id: 'UA-45112924-2',
  router,
  debug: {
    sendHitTask: process.env.APP_ENV === 'production'
  }
})

export function createRouter () {
  return router
}
