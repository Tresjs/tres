export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  tres: {
    // for testing purposes, and so we test both deduplication + auto-detection capabilities
    modules: ['@tresjs/cientos'],
  },
})
