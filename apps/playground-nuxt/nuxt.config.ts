// `TRES_RENDERER=webgpu pnpm dev` to try the pages under /webgpu
const tresRenderer = process.env.TRES_RENDERER === 'webgpu' ? 'webgpu' : 'webgl'

export default defineNuxtConfig({
  modules: ['@tresjs/nuxt', '@nuxt/ui', '@nuxt/devtools'],

  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-07-16',

  // Lets the /webgpu pages show a notice when the playground runs in WebGL mode
  runtimeConfig: {
    public: {
      tresRenderer,
    },
  },

  icon: {
    serverBundle: {
      collections: ['heroicons', 'lucide'],
    },
  },

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
        /[\/]packages[\\/]cientos[\\/]dist[\\/]webgpu\.js$/,
        /[\/]packages[\\/]core[\\/]dist[\\/]tres\.js$/,
        /[\/]packages[\\/]core[\\/]dist[\\/]webgpu\.js$/,
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
    renderer: tresRenderer,
  },
})
