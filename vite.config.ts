import vue from '@vitejs/plugin-vue'
import analyze from 'rollup-plugin-analyzer'
import banner from 'vite-plugin-banner'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite'
import { resolve } from 'pathe'
import { bold, gray, lightGreen, yellow } from 'kolorist'

import { templateCompilerOptions } from '@tresjs/core'

import pkg from './package.json'

// eslint-disable-next-line no-console
console.log(`${lightGreen('▲')} ${gray('■')} ${yellow('⚔')} ${bold('Tres/cientos')} v${pkg.version}`)

export default defineConfig({
  resolve: {
    dedupe: ['@tresjs/core'],
  },
  plugins: [
    vue({
      isProduction: false,
      ...templateCompilerOptions,
    }),
    dts({
      insertTypesEntry: true,
    }),
    banner({
      content: `/**\n * name: ${pkg.name}\n * version: v${
        pkg.version
      }\n * (c) ${new Date().getFullYear()}\n * description: ${
        pkg.description
      }\n * author: ${pkg.author}\n */`,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'tresrapier',
      fileName: 'tresrapier',
    },
    copyPublicDir: false,
    watch: {
      include: [resolve(__dirname, 'src')],
    },
    rollupOptions: {
      plugins: [
        analyze(),
        // TODO: Should be removed if not used.
        /* visualizer({
          gzipSize: true,
          brotliSize: true,
          open: true,
        }), */
      ],
      external: ['three', 'vue', '@tresjs/core'],
      output: {
        exports: 'named',
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          '@tresjs/core': 'TresjsCore',
          'three': 'Three',
          'vue': 'Vue',
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['three', 'vue', '@tresjs/core'],
  },
})
