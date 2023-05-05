import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _edf25d5a = () => interopDefault(import('../pages/about/index.vue' /* webpackChunkName: "pages/about/index" */))
const _75f68195 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _d85b1ce8 = () => interopDefault(import('../pages/auth/check-otp.vue' /* webpackChunkName: "pages/auth/check-otp" */))
const _5e2134ab = () => interopDefault(import('../pages/auth/forgot-password.vue' /* webpackChunkName: "pages/auth/forgot-password" */))
const _347dd98f = () => interopDefault(import('../pages/auth/login.vue' /* webpackChunkName: "pages/auth/login" */))
const _1ac193d1 = () => interopDefault(import('../pages/auth/otp.vue' /* webpackChunkName: "pages/auth/otp" */))
const _3f99a0ed = () => interopDefault(import('../pages/auth/register.vue' /* webpackChunkName: "pages/auth/register" */))
const _6347a323 = () => interopDefault(import('../pages/auth/reset-password.vue' /* webpackChunkName: "pages/auth/reset-password" */))
const _19d0ac0f = () => interopDefault(import('../pages/cabinet/admin/notification.vue' /* webpackChunkName: "pages/cabinet/admin/notification" */))
const _0ca7e972 = () => interopDefault(import('../pages/cabinet/admin/statistics.vue' /* webpackChunkName: "pages/cabinet/admin/statistics" */))
const _de56c136 = () => interopDefault(import('../pages/cabinet/user/display/index.vue' /* webpackChunkName: "pages/cabinet/user/display/index" */))
const _68cac18d = () => interopDefault(import('../pages/cabinet/user/my-locations.vue' /* webpackChunkName: "pages/cabinet/user/my-locations" */))
const _09d37a0a = () => interopDefault(import('../pages/cabinet/user/notification.vue' /* webpackChunkName: "pages/cabinet/user/notification" */))
const _2c258fc9 = () => interopDefault(import('../pages/cabinet/user/profile.vue' /* webpackChunkName: "pages/cabinet/user/profile" */))
const _28d8da01 = () => interopDefault(import('../pages/cabinet/user/display/update/_slug.vue' /* webpackChunkName: "pages/cabinet/user/display/update/_slug" */))
const _6ee41202 = () => interopDefault(import('../pages/marker-detail/_slug.vue' /* webpackChunkName: "pages/marker-detail/_slug" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _edf25d5a,
    name: "about___ru"
  }, {
    path: "/en",
    component: _75f68195,
    name: "index___en"
  }, {
    path: "/oz",
    component: _75f68195,
    name: "index___oz"
  }, {
    path: "/uz",
    component: _75f68195,
    name: "index___uz"
  }, {
    path: "/auth/check-otp",
    component: _d85b1ce8,
    name: "auth-check-otp___ru"
  }, {
    path: "/auth/forgot-password",
    component: _5e2134ab,
    name: "auth-forgot-password___ru"
  }, {
    path: "/auth/login",
    component: _347dd98f,
    name: "auth-login___ru"
  }, {
    path: "/auth/otp",
    component: _1ac193d1,
    name: "auth-otp___ru"
  }, {
    path: "/auth/register",
    component: _3f99a0ed,
    name: "auth-register___ru"
  }, {
    path: "/auth/reset-password",
    component: _6347a323,
    name: "auth-reset-password___ru"
  }, {
    path: "/en/about",
    component: _edf25d5a,
    name: "about___en"
  }, {
    path: "/oz/about",
    component: _edf25d5a,
    name: "about___oz"
  }, {
    path: "/uz/about",
    component: _edf25d5a,
    name: "about___uz"
  }, {
    path: "/cabinet/admin/notification",
    component: _19d0ac0f,
    name: "cabinet-admin-notification___ru"
  }, {
    path: "/cabinet/admin/statistics",
    component: _0ca7e972,
    name: "cabinet-admin-statistics___ru"
  }, {
    path: "/cabinet/user/display",
    component: _de56c136,
    name: "cabinet-user-display___ru"
  }, {
    path: "/cabinet/user/my-locations",
    component: _68cac18d,
    name: "cabinet-user-my-locations___ru"
  }, {
    path: "/cabinet/user/notification",
    component: _09d37a0a,
    name: "cabinet-user-notification___ru"
  }, {
    path: "/cabinet/user/profile",
    component: _2c258fc9,
    name: "cabinet-user-profile___ru"
  }, {
    path: "/en/auth/check-otp",
    component: _d85b1ce8,
    name: "auth-check-otp___en"
  }, {
    path: "/en/auth/forgot-password",
    component: _5e2134ab,
    name: "auth-forgot-password___en"
  }, {
    path: "/en/auth/login",
    component: _347dd98f,
    name: "auth-login___en"
  }, {
    path: "/en/auth/otp",
    component: _1ac193d1,
    name: "auth-otp___en"
  }, {
    path: "/en/auth/register",
    component: _3f99a0ed,
    name: "auth-register___en"
  }, {
    path: "/en/auth/reset-password",
    component: _6347a323,
    name: "auth-reset-password___en"
  }, {
    path: "/oz/auth/check-otp",
    component: _d85b1ce8,
    name: "auth-check-otp___oz"
  }, {
    path: "/oz/auth/forgot-password",
    component: _5e2134ab,
    name: "auth-forgot-password___oz"
  }, {
    path: "/oz/auth/login",
    component: _347dd98f,
    name: "auth-login___oz"
  }, {
    path: "/oz/auth/otp",
    component: _1ac193d1,
    name: "auth-otp___oz"
  }, {
    path: "/oz/auth/register",
    component: _3f99a0ed,
    name: "auth-register___oz"
  }, {
    path: "/oz/auth/reset-password",
    component: _6347a323,
    name: "auth-reset-password___oz"
  }, {
    path: "/uz/auth/check-otp",
    component: _d85b1ce8,
    name: "auth-check-otp___uz"
  }, {
    path: "/uz/auth/forgot-password",
    component: _5e2134ab,
    name: "auth-forgot-password___uz"
  }, {
    path: "/uz/auth/login",
    component: _347dd98f,
    name: "auth-login___uz"
  }, {
    path: "/uz/auth/otp",
    component: _1ac193d1,
    name: "auth-otp___uz"
  }, {
    path: "/uz/auth/register",
    component: _3f99a0ed,
    name: "auth-register___uz"
  }, {
    path: "/uz/auth/reset-password",
    component: _6347a323,
    name: "auth-reset-password___uz"
  }, {
    path: "/en/cabinet/admin/notification",
    component: _19d0ac0f,
    name: "cabinet-admin-notification___en"
  }, {
    path: "/en/cabinet/admin/statistics",
    component: _0ca7e972,
    name: "cabinet-admin-statistics___en"
  }, {
    path: "/en/cabinet/user/display",
    component: _de56c136,
    name: "cabinet-user-display___en"
  }, {
    path: "/en/cabinet/user/my-locations",
    component: _68cac18d,
    name: "cabinet-user-my-locations___en"
  }, {
    path: "/en/cabinet/user/notification",
    component: _09d37a0a,
    name: "cabinet-user-notification___en"
  }, {
    path: "/en/cabinet/user/profile",
    component: _2c258fc9,
    name: "cabinet-user-profile___en"
  }, {
    path: "/oz/cabinet/admin/notification",
    component: _19d0ac0f,
    name: "cabinet-admin-notification___oz"
  }, {
    path: "/oz/cabinet/admin/statistics",
    component: _0ca7e972,
    name: "cabinet-admin-statistics___oz"
  }, {
    path: "/oz/cabinet/user/display",
    component: _de56c136,
    name: "cabinet-user-display___oz"
  }, {
    path: "/oz/cabinet/user/my-locations",
    component: _68cac18d,
    name: "cabinet-user-my-locations___oz"
  }, {
    path: "/oz/cabinet/user/notification",
    component: _09d37a0a,
    name: "cabinet-user-notification___oz"
  }, {
    path: "/oz/cabinet/user/profile",
    component: _2c258fc9,
    name: "cabinet-user-profile___oz"
  }, {
    path: "/uz/cabinet/admin/notification",
    component: _19d0ac0f,
    name: "cabinet-admin-notification___uz"
  }, {
    path: "/uz/cabinet/admin/statistics",
    component: _0ca7e972,
    name: "cabinet-admin-statistics___uz"
  }, {
    path: "/uz/cabinet/user/display",
    component: _de56c136,
    name: "cabinet-user-display___uz"
  }, {
    path: "/uz/cabinet/user/my-locations",
    component: _68cac18d,
    name: "cabinet-user-my-locations___uz"
  }, {
    path: "/uz/cabinet/user/notification",
    component: _09d37a0a,
    name: "cabinet-user-notification___uz"
  }, {
    path: "/uz/cabinet/user/profile",
    component: _2c258fc9,
    name: "cabinet-user-profile___uz"
  }, {
    path: "/en/cabinet/user/display/update/:slug?",
    component: _28d8da01,
    name: "cabinet-user-display-update-slug___en"
  }, {
    path: "/oz/cabinet/user/display/update/:slug?",
    component: _28d8da01,
    name: "cabinet-user-display-update-slug___oz"
  }, {
    path: "/uz/cabinet/user/display/update/:slug?",
    component: _28d8da01,
    name: "cabinet-user-display-update-slug___uz"
  }, {
    path: "/cabinet/user/display/update/:slug?",
    component: _28d8da01,
    name: "cabinet-user-display-update-slug___ru"
  }, {
    path: "/en/marker-detail/:slug?",
    component: _6ee41202,
    name: "marker-detail-slug___en"
  }, {
    path: "/oz/marker-detail/:slug?",
    component: _6ee41202,
    name: "marker-detail-slug___oz"
  }, {
    path: "/uz/marker-detail/:slug?",
    component: _6ee41202,
    name: "marker-detail-slug___uz"
  }, {
    path: "/marker-detail/:slug?",
    component: _6ee41202,
    name: "marker-detail-slug___ru"
  }, {
    path: "/",
    component: _75f68195,
    name: "index___ru"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
