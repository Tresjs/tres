/// <reference types="vitest" />

import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import banner from 'vite-plugin-banner'
import Inspect from 'vite-plugin-inspect'
import dts from 'vite-plugin-dts'

import copy from 'rollup-plugin-copy'

/* import analyze from 'rollup-plugin-analyzer'
 */ /* import { visualizer } from 'rollup-plugin-visualizer' */
import { resolve } from 'pathe'

import { bold, gray, lightGreen, yellow } from 'kolorist'

import pkg from './package.json'

function noop() {}

const provider = process.env.PROVIDER || 'playwright'
const browser = process.env.BROWSER || (provider === 'playwright' ? 'chromium' : 'chrome')

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
    Inspect(),
  ],
  test: {
    alias: {
      '@tresjs/core': resolve(__dirname, 'src/index.ts'),
    },
    // environment: 'jsdom',
    // globals: true,
    // threads: false,
    // environment: process.env.BROWSER_TEST ? 'node' : 'jsdom',
    globals: true,
    // threads: false,
    // isolate: !process.env.BROWSER_TEST,
    browser: {
      enabled: true,
      name: browser,
      headless: false,
      provider,
      isolate: false,
    },
    open: false,
    outputFile: './browser.json',
    reporters: ['json', {
      onInit: noop,
      onPathsCollected: noop,
      onCollected: noop,
      onFinished: noop,
      onTaskUpdate: noop,
      onTestRemoved: noop,
      onWatcherStart: noop,
      onWatcherRerun: noop,
      onServerRestart: noop,
      onUserConsoleLog: noop,
    }, 'default'],
    env: {
      BROWSER: browser,
    },
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
    copyPublicDir: false,
    rollupOptions: {
      plugins: [
        copy({
          targets: [{ src: 'src/types/tres-components.d.ts', dest: 'dist/types' }],
        }),
        /*   analyze(), */
        /*    visualizer({
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
          'vue': 'Vue',
          '@vueuse/core': 'VueUseCore',
          'three': 'Three',
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['vue', 'three'],
  },
})
