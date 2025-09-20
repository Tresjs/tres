import { resolve } from 'pathe'

export default defineNuxtConfig({

  modules: [
    '@nuxt/ui-pro',
    '@vueuse/nuxt',
    /*   '@nuxt/devtools-ui-kit', */
    '@nuxt/icon',
  ],
  ssr: false,

  app: {
    baseURL: '/__tres_nuxt_devtools',
  },
  css: ['~/assets/css/main.css'],

  nitro: {
    output: {
      publicDir: resolve(__dirname, '../dist/client'),
    },
  },
  vite: {
    optimizeDeps: {
      include: [
        '@nuxt/devtools-kit/iframe-client',
      ],
    },
    server: {
      hmr: {
        // Instead of go through proxy, we directly connect real port of the client app
        clientPort: +(process.env.PORT || 3300),
      },
    },
  },

  uiPro: {
    license: process.env.NUXT_UI_PRO_LICENSE,
  },
})
