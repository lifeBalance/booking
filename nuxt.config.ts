// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'nuxt-icon',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'dayjs-nuxt',
  ],
  experimental: {
    payloadExtraction: false,
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  app: {
    baseURL: '/booking/',
    buildAssetsDir: 'assets',
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/svg',
          media: '(prefers-color-scheme: dark)',
          href: '/booking/favicon-light.svg',
        },
        {
          rel: 'icon',
          type: 'image/svg',
          media: '(prefers-color-scheme: light)',
          href: '/booking/favicon-dark.svg',
        },
      ],
    },
  },
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: [],
    },
  },
  routeRules: {
    '/': { prerender: false },
    '/book': { prerender: false },
    '/armory': { prerender: false },
    '/payment': { prerender: false },
  },
})
