import { templateCompilerOptions } from '@tresjs/core'

export default defineNuxtConfig({
  modules: ['@nuxt/ui-pro'],
  css: ['~/assets/css/main.css'],
  fonts: {
    families: [
      { name: 'Manrope', provider: 'google', weights: ['500', '600', '800'] },
      { name: 'Inter', provider: 'google' },
    ],
  },
  vue: {
    compilerOptions: {
      isCustomElement: templateCompilerOptions.template.compilerOptions.isCustomElement,
    },
  },
})
