/// <reference types="vitest" />

import vue from '@vitejs/plugin-vue'

import { defineConfig } from 'vite'

/* import analyze from 'rollup-plugin-analyzer' */

import { bold, gray, lightGreen, yellow } from 'kolorist'

import pkg from './package.json' with { type: 'json' }

// eslint-disable-next-line no-console
console.log(`${lightGreen('▲')} ${gray('■')} ${yellow('●')} ${bold('Tres')} v${pkg.version}`)
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5174,
  },
  plugins: [
    vue({
      isProduction: false,
      template: {
        compilerOptions: {
          isCustomElement: (tag: string) => ((/^Tres[A-Z]/.test(tag) || tag.startsWith('tres-'))),
        },
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
  },
  optimizeDeps: {
    exclude: ['vue', 'three'],
  },
})
