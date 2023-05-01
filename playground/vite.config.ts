import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { resolve } from 'pathe'
import UnoCSS from 'unocss/vite'
import { presetUno, presetIcons, presetWebFonts, presetTypography, transformerDirectives } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '/@': resolve(__dirname, './src'),
      '@leches': resolve(__dirname, '../src/'),
    },
  },
  plugins: [
    vue(),
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
            display: 'inline-block',
            'vertical-align': 'middle',
            // ...
          },
        }),
        presetTypography({
          cssExtend: {
            blockquote: {
              padding: '1rem',
              'border-radius': '0.5rem',
              background: '#efefef',
            },
            pre: {
              background: '#333e50 !important',
            },
            img: {
              margin: '2rem auto',
              'border-radius': '0.5rem',
            },
            code: {
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
  ],
})
