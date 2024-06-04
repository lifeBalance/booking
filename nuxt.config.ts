// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true }, 
  routeRules: {
    // Homepage pre-rendered at build time
    '/': { prerender: true },
    // APP renders only on client-side
    '/app': { ssr: false },
  }
})
