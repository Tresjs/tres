import svgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/ui-pro',
    'nuxt-svgo',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/devtools',
    '@tresjs/nuxt',
    '@nuxt/scripts',
  ],

  css: ['~/assets/styles/main.css'],
  declare: ['*.glsl'],
  uiPro: {
    license: process.env.NUXT_UI_PRO_LICENSE
  },
  tres: {
    devtools: true,
    glsl: true,
  },

  fonts: {
    families: [
      { name: 'Manrope', provider: 'google' },
      { name: 'Inter', provider: 'google' },
    ],
  },

  routeRules: {
    '/': { prerender: true },
  },

  image: {
    format: ['webp', 'avif'],
  },

  content: {
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: 'github-dark',
        // Theme used if `html.sepia`
        sepia: 'monokai',
      },
      preload: ['bash', 'css', 'javascript', 'json', 'markdown', 'scss', 'vue', 'glsl'],
    },
  },

  vite: {
    plugins: [svgLoader()],
  },

  compatibilityDate: '2024-08-29',
  $production: {
    scripts: {
      registry: {
        fathomAnalytics: {
          site: 'RCNYLVAZ',
        },
      },
    },
  },
})