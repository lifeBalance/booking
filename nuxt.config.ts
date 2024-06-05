// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true }, 
  modules: ['nuxt-icon'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  routeRules: {
    // Homepage pre-rendered at build time
    '/': { prerender: true },
    // APP renders only on client-side
    // '/book': { ssr: false },
    '/book': { prerender: true },
  }
})
