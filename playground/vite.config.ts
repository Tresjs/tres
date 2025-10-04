import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'
import { presetIcons, presetTypography, presetUno, presetWebFonts, transformerDirectives } from 'unocss'
import { templateCompilerOptions } from '@tresjs/core'
import { qrcode } from 'vite-plugin-qrcode'
import { resolve } from 'node:path'
// https://vitejs.dev/config/
export default defineConfig({

  plugins: [
    vue({
      script: {
        propsDestructure: true,
      },
      ...templateCompilerOptions,
    }),
    // svgLoader(),
    AutoImport({
      dts: true,
      eslintrc: {
        enabled: true, // <-- this
      },
      imports: ['vue'],
    }),
    Components({
      /* options */
    }),
    UnoCSS({
      /* options */
      presets: [
        presetUno(),
        presetIcons({
          scale: 1.2,
          warn: true,
          extraProperties: {
            'display': 'inline-block',
            'vertical-align': 'middle',
            // ...
          },
        }),
        presetTypography({
          cssExtend: {
            'blockquote': {
              'padding': '1rem',
              'border-radius': '0.5rem',
              'background': '#efefef',
            },
            'pre': {
              background: '#333e50 !important',
            },
            'img': {
              'margin': '2rem auto',
              'border-radius': '0.5rem',
            },
            'code': {
              'font-family': 'DM Mono',
              'font-size': '0.875rem',
            },
            /*  code: {
              'font-family': 'Fira Code',
              'font-size': '0.875rem',
            }, */
            ':not(pre)>code': {
              background: '#e8e8e8 !important',
              padding: '0.25rem 0.5rem !important',
            },
            'code::after': {
              content: 'none',
            },
            'code::before': {
              content: 'none',
            },
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
    qrcode(),
  ],
  /*  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  }, */
  resolve: {
    alias: {
      /* '@tresjs/leches': resolve(__dirname, '../src/'), */
      '@leches/styles': resolve(__dirname, '../dist/tresleches.css'),
    },
    dedupe: ['three'],
  },
})
