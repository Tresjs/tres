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
        '@tresjs/post-processing': resolve(__dirname, '../src/'),
      },
      dedupe: ['three', '@tresjs/core'],
    },
  },
})
