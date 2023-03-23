import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'pathe'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: tag => tag.startsWith('Tres') && tag !== 'TresCanvas',
      },
    },
  })],
  resolve: {
    alias: {
      '/@': resolve(__dirname, '../src'),
      
    },
    dedupe: ['@tresjs/core', 'three'],
  },
})
