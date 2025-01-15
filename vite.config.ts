/// <reference types="histoire" />
/// <reference types="vitest" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import banner from 'vite-plugin-banner'
import dts from 'vite-plugin-dts'
import analyze from 'rollup-plugin-analyzer'
import { visualizer } from 'rollup-plugin-visualizer'
import { resolve } from 'pathe'
import UnoCSS from 'unocss/vite'
import { presetIcons, presetUno, presetWebFonts, transformerDirectives } from 'unocss'
import { bold, gray, lightGreen, magenta } from 'kolorist'

import pkg from './package.json'

// eslint-disable-next-line no-console
console.log(`${lightGreen('▲')} ${gray('■')} ${magenta('🍰')} ${bold('Tres/leches')} v${pkg.version}`)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
    }),
    banner({
      content: `/**\n * name: ${pkg.name}\n * version: v${
        pkg.version
      }\n * (c) ${new Date().getFullYear()}\n * description: ${pkg.description}\n * author: ${pkg.author}\n */`,
    }),
    UnoCSS({
      /* options */
      presets: [
        presetUno({
          prefix: 'tl-',
          variablePrefix: 'tl-',
        }),
        presetIcons({
          scale: 1.2,
          warn: true,
          extraProperties: {
            'display': 'inline-block',
            'vertical-align': 'middle',
            // ...
          },
        }),

        presetWebFonts({
          fonts: {
            sans: 'Roboto Mono',
          },
        }),
      ],
      transformers: [transformerDirectives()],
    }),
    /*  cssInjectedByJsPlugin(), */

  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'tresleches',
      fileName: 'tresleches',
    },
    watch: {
      include: [resolve(__dirname, 'src')],
    },
    rollupOptions: {
      plugins: [
        analyze(),
        visualizer({
          gzipSize: true,
          brotliSize: true,
          open: false,
        }),
      ],
      external: ['vue', '@vueuse/core'],
      output: {
        exports: 'named',
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          '@vueuse/core': 'VueUseCore',
          'vue': 'Vue',
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['vue', '@vueuse/core'],
  },
})
