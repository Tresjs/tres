import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

import banner from 'vite-plugin-banner'
import dts from 'vite-plugin-dts'
import analyze from 'rollup-plugin-analyzer'
import { visualizer } from 'rollup-plugin-visualizer'

import { resolve } from 'pathe'

import { lightGreen, yellow, gray, bold } from 'kolorist'

import pkg from './package.json'

// eslint-disable-next-line no-console
console.log(`${lightGreen('▲')} ${gray('■')} ${yellow('♥')} ${bold('Tres/cientos')} v${pkg.version}`)
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    dedupe: ['@tresjs/core'],
  },
  plugins: [
    vue({
      script: {
        propsDestructure: true,
      },
      isProduction: false,
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
      content: `/**\n * name: ${pkg.name}\n * version: v${pkg.version
        }\n * (c) ${new Date().getFullYear()}\n * description: ${pkg.description}\n * author: ${pkg.author}\n */`,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'trescientos',
      fileName: 'trescientos',
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
          open: true,
        }),
      ],
      external: ['three', 'vue', '@tresjs/core', 'tweakpane', '@tweakpane/core', '@tweakpane/plugin-essentials'],
      output: {
        exports: 'named',
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          '@tresjs/core': 'TresjsCore',
          three: 'Three',
          vue: 'Vue',
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['three', 'vue', '@tresjs/core', 'tweakpane', '@tweakpane/core', '@tweakpane/plugin-essentials'],
  },
})
