/// <reference types="vitest" />
import fs from 'fs'

import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import banner from 'vite-plugin-banner'
import Inspect from 'vite-plugin-inspect'
import dts from 'vite-plugin-dts'

import copy from 'rollup-plugin-copy'

/* import analyze from 'rollup-plugin-analyzer'
 */ /* import { visualizer } from 'rollup-plugin-visualizer' */
import { resolve, join } from 'pathe'

import { lightGreen, yellow, gray, bold } from 'kolorist'
import { ViteTresPlugin } from './plugins/vite-tres-types-plugin'

import pkg from './package.json'

function noop() {}

// eslint-disable-next-line no-console
console.log(`${lightGreen('▲')} ${gray('■')} ${yellow('●')} ${bold('Tres')} v${pkg.version}`)
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5174,
  },
  resolve: {
    alias: {
      '/@': resolve(__dirname, './src'),
    },
    dedupe: ['@tresjs/cientos', 'vue'],
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
      afterBuild() {
        console.log('🪄 ✨ Magically generating types for TresJS')
        const outputDir = join(__dirname, 'dist/types')
        const outputFile = join(outputDir, 'index.d.ts')
        if (fs.existsSync(outputFile)) {
          const index = fs.readFileSync(outputFile, 'utf-8')
          fs.writeFileSync(outputFile, `import './tres-components';\n${index}`)
        }
      },
    }),
    ViteTresPlugin(),
    banner({
      content: `/**\n * name: ${pkg.name}\n * version: v${
        pkg.version
      }\n * (c) ${new Date().getFullYear()}\n * description: ${pkg.description}\n * author: ${pkg.author}\n */`,
    }),
    Inspect(),
  ],
  test: {
    environment: process.env.BROWSER_TEST ? 'node' : 'jsdom',
    globals: true,
    threads: false,
    alias: {
      '/@': resolve(__dirname, './src'),
    },
    isolate: !process.env.BROWSER_TEST,
    browser: {
      enabled: !!process.env.BROWSER_TEST,

      // @ts-expect-error ignore, we don't have the type here in vitest
      enableUI: true,
      name: 'chrome',
      headless: !!process.env.HEADLESS,
      provider: 'webdriverio',
    },
    reporters: process.env.BROWSER_TEST
      ? [
          'json',
          {
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
          },
          'default',
        ]
      : undefined,
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
