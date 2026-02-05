/// <reference types="histoire" />
/// <reference types="vitest" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import banner from 'vite-plugin-banner'
import dts from 'vite-plugin-dts'
import svgLoader from 'vite-svg-loader'
import { resolve } from 'pathe'
import UnoCSS from 'unocss/vite'
import { presetIcons, presetUno, presetWebFonts, transformerDirectives } from 'unocss'
import { bold, gray, lightGreen, magenta } from 'kolorist'

import pkg from './package.json' with { type: 'json' }
import { presetScrollbar } from 'unocss-preset-scrollbar'

import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
// eslint-disable-next-line no-console
console.log(`${lightGreen('▲')} ${gray('■')} ${magenta('🍰')} ${bold('Tres/leches')} v${pkg.version}`)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    dts({
      insertTypesEntry: true,
    }),
    banner({
      content: `/**\n * name: ${pkg.name}\n * version: v${
        pkg.version
      }\n * (c) ${new Date().getFullYear()}\n * description: ${pkg.description}\n * author: ${pkg.author}\n */`,
    }),
    UnoCSS({
      mode: 'vue-scoped',
      /* options */
      shortcuts: {
        'tl-leches-input': 'tl-p-2 tl-rounded tl-text-left tl-text-xs tl-text-gray-400 tl-bg-gray-100 dark:tl-bg-dark-300 dark:tl-text-gray-400 tl-outline-none tl-border-none focus:tl-ring-2 focus:tl-border-gray-200 focus:tl-ring focus:tl-ring-gray-200 tl-font-sans',
      },
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
        presetScrollbar({
          prefix: 'tl-',
        }),
        presetWebFonts({
          fonts: {
            sans: 'Roboto Mono',
          },
        }),
      ],
      transformers: [transformerDirectives()],
    }),
    cssInjectedByJsPlugin(),
    /*  Inspect({
      build: true,
      outputDir: 'dist/inspect',
    }), */
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'tresleches',
      fileName: 'tresleches',
      formats: ['es'],
    },
    cssCodeSplit: false, // <--- important!
    watch: {
      include: [resolve(__dirname, 'src')],
    },
    rollupOptions: {
      plugins: [
      /*   analyze(),
        visualizer({
          gzipSize: true,
          brotliSize: true,
          open: false,
        }), */
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
