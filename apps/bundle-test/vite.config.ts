import { templateCompilerOptions } from '@tresjs/core'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(({ mode }) => ({
  plugins: [
    vue(templateCompilerOptions),
    visualizer({ filename: `stats-${mode}.html`, open: false }),
  ],
  resolve: {
    alias: {
      '@tresjs/core/slim': resolve(__dirname, '../../packages/core/src/slim.ts'),
      '@tresjs/core': resolve(__dirname, '../../packages/core/src/index.ts'),
    },
  },
  build: {
    rollupOptions: {
      input: resolve(__dirname, mode === 'full' ? 'full.html' : mode === 'slim' ? 'slim.html' : 'index.html'),
    },
  },
}))
