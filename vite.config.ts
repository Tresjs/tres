import { templateCompilerOptions } from '@tresjs/core'
import vue from '@vitejs/plugin-vue'
import { bold, gray, lightGreen, yellow } from 'kolorist'
import { resolve } from 'pathe'
import { defineConfig } from 'vite'
import banner from 'vite-plugin-banner'

import dts from 'vite-plugin-dts'

import pkg from './package.json'

// eslint-disable-next-line no-console
console.log(`${lightGreen('▲')} ${gray('■')} ${yellow('⚔')} ${bold('Tres/rapier')} v${pkg.version}`)

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
        /*  analyze(), */
        // TODO: Should be removed if not used.
        /* visualizer({
          gzipSize: true,
          brotliSize: true,
          open: true,
        }), */
      ],
      external: ['three', 'vue', '@tresjs/core', '@dimforge/rapier3d-compat'],
      output: {
        exports: 'named',
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          '@tresjs/core': 'TresjsCore',
          'three': 'Three',
          'vue': 'Vue',
          '@dimforge/rapier3d-compat': 'Rapier3dCompat',
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['three', 'vue', '@tresjs/core', '@dimforge/rapier3d-compat'],
  },
})
