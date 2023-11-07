import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { resolve } from 'pathe'
import UnoCSS from 'unocss/vite'
import { templateCompilerOptions } from '@tresjs/core'
import { qrcode } from 'vite-plugin-qrcode'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        propsDestructure: true,
      },
      ...templateCompilerOptions,
    }),
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
    }),
    qrcode(),
  ],
  resolve: {
    alias: {
      '@tresjs/post-processing': resolve(__dirname, '../src/'),
    },
    dedupe: ['three', '@tresjs/core'],
  },
})
