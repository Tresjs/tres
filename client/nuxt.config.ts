import { resolve } from 'pathe'

export default defineNuxtConfig({

  modules: [
    '@nuxt/devtools-ui-kit',
    '@unocss/nuxt',
    '@nuxt/ui',
    '@nuxt/icon',
  ],
  ssr: false,

  app: {
    baseURL: '/__tres_nuxt_devtools',
  },

  compatibilityDate: '2024-12-19',

  nitro: {
    output: {
      publicDir: resolve(__dirname, '../dist/client'),
    },
  },

  icon: {
    size: '24px', // default <Icon> size applied
    class: 'icon', // default <Icon> class applied
    aliases: {
      mesh: 'carbon:cube',
    },
  },
})
