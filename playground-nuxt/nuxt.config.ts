import { resolve } from 'pathe'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@tresjs/nuxt',
  ],
  vite: {
    resolve: {
      alias: {
        '@tresjs/post-processing/pmndrs': resolve(__dirname, '../src/core/pmndrs'),
        '@tresjs/post-processing/three': resolve(__dirname, '../src/core/three'),
      },
      dedupe: ['three', '@tresjs/core', '@vueuse/core'],
    },
  },
})
