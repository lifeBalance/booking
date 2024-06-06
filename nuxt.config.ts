// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['nuxt-icon'],
  app: {
    baseURL: '/booking/',
    buildAssetsDir: 'assets',
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  routeRules: {
    '/': { prerender: true },
    '/book': { prerender: true },
  },
})
