import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

import banner from 'vite-plugin-banner'
import dts from 'vite-plugin-dts'
/* import analyze from 'rollup-plugin-analyzer' */

/* import { visualizer } from 'rollup-plugin-visualizer' */
import { templateCompilerOptions } from '@tresjs/core'

import { bold, gray, lightGreen, yellow } from 'kolorist'

import { resolve } from 'pathe'
import glsl from 'vite-plugin-glsl'
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
      isProduction: false,
      ...templateCompilerOptions,
    }),
    dts({
      insertTypesEntry: true,
      compilerOptions: {
        skipLibCheck: true, // Make DTS plugin skip lib check too
      },
    }),
    glsl(),
    banner({
      content: `/**\n * name: ${pkg.name}\n * version: v${
        pkg.version
      }\n * (c) ${new Date().getFullYear()}\n * description: ${pkg.description}\n * author: ${pkg.author}\n */`,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'trescientos',
      fileName: 'trescientos',
      formats: ['es'],
    },
    copyPublicDir: false,
    watch: {
      include: [resolve(__dirname, 'src')],
    },
    rollupOptions: {
      plugins: [
        /*  analyze(), */
        /* visualizer({
          gzipSize: true,
          brotliSize: true,
          open: true,
        }), */
      ],
      external: ['three', 'vue', '@tresjs/core'],
      output: {
        exports: 'named',
      },
    },
  },
  optimizeDeps: {
    exclude: ['three', 'vue', '@tresjs/core'],
  },
})
