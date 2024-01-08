import { resolve } from 'pathe'

export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@unocss/nuxt',
    '@nuxt/ui',
    'nuxt-icon',
    '@nuxt/devtools-ui-kit',
  ],
  nitro: {
    output: {
      publicDir: resolve(__dirname, '../dist/client'),
    },
  },
  css: ['splitpanes/dist/splitpanes.css'],
  nuxtIcon: {
    size: '30px', // default <Icon> size applied
    class: 'icon', // default <Icon> class applied
    aliases: {
      mesh: 'carbon:cube',
    },
  },
  app: {
    baseURL: '/__tres_devtools',
  },
})
