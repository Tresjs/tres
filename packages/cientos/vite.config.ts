import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

/* import analyze from 'rollup-plugin-analyzer' */

/* import { visualizer } from 'rollup-plugin-visualizer' */
import { templateCompilerOptions } from '@tresjs/core'

import { bold, gray, lightGreen, yellow } from 'kolorist'

import glsl from 'vite-plugin-glsl'
import pkg from './package.json' with { type: 'json' }

// eslint-disable-next-line no-console
console.log(`${lightGreen('▲')} ${gray('■')} ${yellow('♥')} ${bold('Tres/cientos')} v${pkg.version}`)
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    dedupe: ['@tresjs/core'],
  },
  plugins: [
    vue({
      isProduction: false,
      ...templateCompilerOptions,
    }),
    glsl(),
  ],
  optimizeDeps: {
    exclude: ['three', 'vue', '@tresjs/core'],
  },
})
