/* import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import { unoConfig } from '@vue/devtools-ui/theme'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/__tres_vue_devtools/' : '/',
  server: {
    port: 3333,
    host: 'localhost',
  },
  plugins: [
    UnoCSS(unoConfig),
    Vue(),
    Components({
      dirs: 'client/components',
      dts: 'client/components.d.ts',
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
      ],
      dts: 'client/auto-imports.d.ts',
    }),
  ],
  build: {
    outDir: 'dist/client',
  },
})) */