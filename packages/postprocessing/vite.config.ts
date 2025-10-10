import { templateCompilerOptions } from '@tresjs/core'
import vue from '@vitejs/plugin-vue'
import { bold, gray, lightGreen, magenta } from 'kolorist'
import { resolve } from 'pathe'
import { defineConfig } from 'vite'
import banner from 'vite-plugin-banner'
import dts from 'vite-plugin-dts'
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
    vue(templateCompilerOptions),
  ],
  build: {
    copyPublicDir: false,
    watch: {
      include: [resolve(__dirname, 'src')],
    },
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'tres-post-processing',
      fileName: 'tres-post-processing',
    },
    rollupOptions: {
      plugins: [
        /* analyze(),
        visualizer({
          gzipSize: true,
          brotliSize: true,
          open: false,
        }), */
      ],
      external: ['three', 'vue', '@tresjs/core', 'postprocessing', '@vueuse/core'],
      output: {
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
