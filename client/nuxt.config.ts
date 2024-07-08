import { resolve } from 'pathe'

export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@nuxt/devtools-ui-kit',
    '@unocss/nuxt',
    '@nuxt/ui',
    '@nuxt/icon',
  ],
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
  app: {
    baseURL: '/__tres_nuxt_devtools',
  },
})
