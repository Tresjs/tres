/// <reference types="vitest" />

import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import banner from 'vite-plugin-banner'
import dts from 'vite-plugin-dts'
import analyze from 'rollup-plugin-analyzer'
/* import { visualizer } from 'rollup-plugin-visualizer' */
import glsl from 'vite-plugin-glsl'
import { resolve } from 'pathe'

import { lightGreen, yellow, gray, bold } from 'kolorist'

import pkg from './package.json'

// eslint-disable-next-line no-console
console.log(`${lightGreen('▲')} ${gray('■')} ${yellow('●')} ${bold('Tres')} v${pkg.version}`)
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '/@': resolve(__dirname, './src'),
    },
    dedupe: ['@tresjs/cientos'],
  },
  plugins: [
    vue({}),
    dts({
      insertTypesEntry: true,
    }),
    glsl(),
    banner({
      content: `/**\n * name: ${pkg.name}\n * version: v${
        pkg.version
      }\n * (c) ${new Date().getFullYear()}\n * description: ${pkg.description}\n * author: ${pkg.author}\n */`,
    }),
  ],
  test: {
    environment: 'happy-dom',
    globals: true,
    threads: false,
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'tres',
      fileName: 'tres',
    },
    watch: {
      include: [resolve(__dirname, 'src')],
    },
    rollupOptions: {
      plugins: [
        analyze(),
        /*  visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true,
        }), */
      ],
      external: ['vue', '@vueuse/core', 'three'],
      output: {
        exports: 'named',
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          '@vueuse/core': 'VueUseCore',
          three: 'Three',
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['vue', 'three'],
  },
})
