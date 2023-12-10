export default defineNuxtConfig({
  modules: ['../src/module', '@nuxt/devtools'],
  tres: {
    // for testing purposes, and so we test both deduplication + auto-detection capabilities
    modules: ['@tresjs/cientos'],
    devtools: true,
    glsl: true,
  },
})
