export default defineNuxtConfig({
  modules: ['../src/module', '@nuxt/devtools'],
  ssr: true,

  compatibilityDate: '2024-07-17',

  // for testing purposes: include some nuxt build tests
  nitro: {
    routeRules: {
      '/page1': { ssr: false }, // <== client rendered page
      '/page2': { prerender: true }, // <== server SSG page + payload
    },
  },

  // for testing purposes
  // imports: {
  //   autoImport: false,
  // },
  tres: {
    // for testing purposes, and so we test both deduplication + auto-detection capabilities
    // modules: ['@tresjs/cientos'],
    devtools: true,
    glsl: true,
  },
})
