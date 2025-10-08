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
    dts({
      insertTypesEntry: true,
    }),
    banner({
      content: `/**\n * name: ${pkg.name}\n * version: v${
        pkg.version
      }\n * (c) ${new Date().getFullYear()}\n * description: ${pkg.description}\n * author: ${pkg.author}\n */`,
    }),
    // Inspect(),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
  },
  build: {
    // vite.config.ts
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'tres',
      fileName: 'tres',
      formats: ['es'],
    },
    watch: {
      include: [resolve(__dirname, 'src')],
    },
    copyPublicDir: false,
    rollupOptions: {
      plugins: [
        copy({
          targets: [{ src: 'src/types/tres-components.d.ts', dest: 'dist/types' }],
        }),
        /*   analyze(), */
        /* visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true,
        }), */
      ],

      external: ['vue', '@vueuse/core', 'three'],
      output: {
        exports: 'named',
      },
    },
  },
  optimizeDeps: {
    exclude: ['vue', 'three'],
  },
})
