import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { resolve } from 'pathe'
import glsl from 'vite-plugin-glsl'
import UnoCSS from 'unocss/vite'
import { templateCompilerOptions } from '@tresjs/core'
import { qrcode } from 'vite-plugin-qrcode'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    glsl(),
    vue(templateCompilerOptions),
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
      theme: {
        colors: {
          'cientos-blue': '#82dbc5',
          'cientos-orange': '#fbb03b',
        },
      },
    }),
    qrcode(),
  ],
  resolve: {
    alias: {
      '@tresjs/cientos': resolve(__dirname, '../src/'),
    },
  },
})
