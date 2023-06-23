import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'pathe'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import glsl from 'vite-plugin-glsl'
import UnoCSS from 'unocss/vite'
import Tres from '../plugins/vite-plugin-tres/src/node/index.ts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    glsl(),
    vue({
      script: {
        propsDestructure: true,
      },
      template: {
        compilerOptions: {
          isCustomElement: tag => (tag.startsWith('Tres') && tag !== 'TresCanvas' && tag !== 'TresLeches') || tag === 'primitive',
        },
      },
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
    Tres({}),
  ],
  resolve: {
    alias: {
      '@tresjs/core': resolve(__dirname, '../src/index.ts'),
    },
    dedupe: ['three'],
  },
})
