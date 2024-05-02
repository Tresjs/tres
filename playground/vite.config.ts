import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'pathe'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import glsl from 'vite-plugin-glsl'
import UnoCSS from 'unocss/vite'
import { templateCompilerOptions } from '@tresjs/core'
import { qrcode } from 'vite-plugin-qrcode'
/* import VueDevTools from 'vite-plugin-vue-devtools' */

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    glsl(),
    /*     VueDevTools(), */
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
      theme: {
        colors: {
          'tres-primary': '#82dbc5',
        },
      },
    }),
    qrcode(), // only applies in dev mode
  ],
  resolve: {
    alias: {
      '@tresjs/core': resolve(__dirname, '../src/index.ts'),
    },
    dedupe: ['three'],
  },
})
