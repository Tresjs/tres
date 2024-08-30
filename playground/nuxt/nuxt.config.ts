// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'pathe'

export default defineNuxtConfig({
  modules: ['@tresjs/nuxt'],
  devtools: { enabled: true },
  vite: {
    resolve: {
      alias: {
        '@tresjs/core': resolve(__dirname, '../../src/'),
      },
    },
  },
  tres: {
    glsl: true,
  },
})
