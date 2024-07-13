import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import banner from 'vite-plugin-banner'
import dts from 'vite-plugin-dts'
import analyze from 'rollup-plugin-analyzer'
import { visualizer } from 'rollup-plugin-visualizer'
import { resolve } from 'pathe'

import { bold, gray, lightGreen, magenta } from 'kolorist'

import pkg from './package.json'

// eslint-disable-next-line no-console
console.log(`${lightGreen('▲')} ${gray('■')} ${magenta('𝗫')} ${bold('Tres/post-processing')} v${pkg.version}`)

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '/@': resolve(__dirname, './src'),
    },
    dedupe: ['@tresjs/core', '@vueuse/core'],
  },
  plugins: [
    vue({
      script: {
        propsDestructure: true,
      },
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('Tres') && tag !== 'TresCanvas',
        },
      },
    }),
    dts({
      insertTypesEntry: true,
    }),
    banner({
      content: `/**\n * name: ${pkg.name}\n * version: v${
        pkg.version
      }\n * (c) ${new Date().getFullYear()}\n * description: ${pkg.description}\n * author: ${pkg.author}\n */`,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'tres-postprocessing',
      fileName: 'tres-postprocessing',
    },
    copyPublicDir: false,
    watch: {
      include: [resolve(__dirname, 'src')],
    },
    rollupOptions: {
      plugins: [
        analyze(),
        visualizer({
          gzipSize: true,
          brotliSize: true,
          open: false,
        }),
      ],
      external: ['three', 'vue', '@tresjs/core', 'postprocessing', '@vueuse/core'],
      output: {
        exports: 'named',
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          '@tresjs/core': 'TresjsCore',
          'three': 'Three',
          'vue': 'Vue',
          'postprocessing': 'Postprocessing',
          '@vueuse/core': 'VueUseCore',
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['three', 'vue', '@tresjs/core', 'postprocessing', '@vueuse/core'],
  },
})
