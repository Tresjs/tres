import { templateCompilerOptions } from '@tresjs/core'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'pathe'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'
import { qrcode } from 'vite-plugin-qrcode'
import VueDevTools from 'vite-plugin-vue-devtools'

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
          'tres-cientos': '#FBB03B',
          'tres-postprocessing': '#FF7BAC',
        },
      },
    }),
    qrcode(), // only applies in dev mode,
    VueDevTools(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      ...(process.env.NODE_ENV === 'development'
        ? {
          '@tresjs/core': resolve(__dirname, '../../packages/core/src/index.ts'),
          '@tresjs/cientos': resolve(__dirname, '../../packages/cientos/src/index.ts'),
          '@tresjs/post-processing': resolve(__dirname, '../../packages/postprocessing/src/index.ts'),
        }
        : {}),
    },
    dedupe: ['three'],
  },
})
