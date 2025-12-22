export default defineNuxtConfig({
  modules: ['@tresjs/nuxt', '@nuxt/ui', '@nuxt/devtools'],

  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-07-16',

  // for testing purposes: include some nuxt build tests
  nitro: {
    routeRules: {
      '/basic/simple': { ssr: false }, // <== client rendered page
      '/basic/primitives': { prerender: true }, // <== server SSG page + payload
    },
  },

  imports: {
    transform: {
      exclude: [
        /[\/]packages[\\/]cientos[\\/]dist[\\/]trescientos\.js$/,
        /[\/]packages[\\/]core[\\/]dist[\\/]tres\.js$/,
        /[\/]packages[\\/]leches[\\/]dist[\\/]tresleches\.js$/,
        /[\/]packages[\\/]postprocessing[\\/]dist[\\/]tres-post-processing\.js$/,
      ],
    }
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
