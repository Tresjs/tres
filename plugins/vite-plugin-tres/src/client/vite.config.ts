import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { TresPlugin } from '../node/plugin'
import { resolve } from 'pathe'
import { fileURLToPath } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        tres: resolve(fileURLToPath(import.meta.url), '../tres.html'),
        'tres-ci': resolve(fileURLToPath(import.meta.url), '../tres-ci.html'),
      },
    },
    outDir: '../../dist/client',
  },
  plugins: [
    vue(),
    TresPlugin(false, {
      vite: {
        server: {
          open: true,
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@tresjs/core': resolve(__dirname, '../../../../src/index.ts'),
    },
    dedupe: ['three'],
  },
})
