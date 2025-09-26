/// <reference types="vitest" />

import vue from '@vitejs/plugin-vue'

import { defineConfig } from 'vite'

/* import analyze from 'rollup-plugin-analyzer' */

import { bold, gray, lightGreen, yellow } from 'kolorist'

import pkg from './package.json'

// eslint-disable-next-line no-console
console.log(`${lightGreen('▲')} ${gray('■')} ${yellow('●')} ${bold('Tres')} v${pkg.version}`)
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5174,
  },
  define: {
    __VERSION__: JSON.stringify(pkg.version),
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
    // Inspect(),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
  },
  optimizeDeps: {
    exclude: ['vue', 'three'],
  },
})
