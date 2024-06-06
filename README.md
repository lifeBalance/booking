# Booking App

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Deployment to GitHub Pages

I followed the instructions in this GitHub [repo](https://github.com/lucpotage/nuxt-github-pages)

Basically we have to:

1. Install dev dependency gh-pages
2. Add the script `"deploy": "gh-pages -d dist"` in `package.json` file
3. Specifiy app `baseURL` in `nuxt.config.ts`
4. Specifiy `buildAssetsDir` in `nuxt.config.ts` that doesn't start with an underscore `_`. See the router config example below.
5. Create an empty file `.nojekyll` at the root of the project
6. Generate with `npm run generate`
7. Deploy with `npm run deploy`

Router

```ts
export default defineNuxtConfig({
  app: {
    baseURL: '/booking/', // name of this repo
    buildAssetsDir: 'assets', // don't prepend "_"
  }
}
```

## TODO

Try to make it happen with a GitHub workflow.

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
