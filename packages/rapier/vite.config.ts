import { templateCompilerOptions } from '@tresjs/core'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    dedupe: ['@tresjs/core'],
  },
  plugins: [
    vue({
      isProduction: false,
      ...templateCompilerOptions,
    }),
  ],
  optimizeDeps: {
    exclude: ['three', 'vue', '@tresjs/core'],
  },
})
