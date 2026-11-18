import vue from '@vitejs/plugin-vue'
import { resolve } from 'pathe'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    // Core's source, so tests share one module graph with core's test utils. The subpath goes first.
    alias: [
      { find: '@tresjs/core/webgpu', replacement: resolve(import.meta.dirname, '../core/src/webgpu/index.ts') },
      { find: /^@tresjs\/core$/, replacement: resolve(import.meta.dirname, '../core/src/index.ts') },
    ],
  },
  test: {
    environment: 'jsdom',
  },
})
