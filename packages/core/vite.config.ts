/// <reference types="vitest" />

import vue from '@vitejs/plugin-vue'

import copy from 'rollup-plugin-copy'
import { defineConfig } from 'vite'
import banner from 'vite-plugin-banner'
import dts from 'vite-plugin-dts'

/* import analyze from 'rollup-plugin-analyzer' */

import { bold, gray, lightGreen, yellow } from 'kolorist'
import { resolve } from 'pathe'

import pkg from './package.json'

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
          isCustomElement: tag => tag.startsWith('Tres') && tag !== 'TresCanvas',
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
