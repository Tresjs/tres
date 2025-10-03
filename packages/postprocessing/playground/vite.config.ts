import { templateCompilerOptions } from '@tresjs/core'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'pathe'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
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
      '@tresjs/post-processing': resolve(__dirname, '../src/index.ts'),
    },
    dedupe: ['three', '@tresjs/core'],
  },
})
