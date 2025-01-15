import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import UnoCSS from 'unocss/vite'
import { presetIcons, presetUno, presetWebFonts, transformerDirectives } from 'unocss'

export default defineConfig({
  plugins: [
    vue(),
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
  ],
  test: {
    environment: process.env.BROWSER_TEST ? 'node' : 'jsdom',

    globals: true,
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
  resolve: {
    alias: {
      '/@': resolve(__dirname, './src'),
    },
  },
})
