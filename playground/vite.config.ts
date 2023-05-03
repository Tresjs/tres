import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'pathe'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import glsl from 'vite-plugin-glsl'
import UnoCSS from 'unocss/vite'
import { presetIcons, presetWebFonts } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    glsl(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => (tag.startsWith('Tres') && tag !== 'TresCanvas') || tag === 'primitive',
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
  ],
  resolve: {
    alias: {
      '/@': resolve(__dirname, '../src'),
    },
    dedupe: ['@tresjs/core', 'three'],
  },
})
