import { templateCompilerOptions } from '@tresjs/core'
import vue from '@vitejs/plugin-vue'
import { bold, gray, lightGreen, magenta } from 'kolorist'
import { resolve } from 'pathe'
import { defineConfig } from 'vite'
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
  optimizeDeps: {
    exclude: ['three', 'vue', '@tresjs/core', 'postprocessing', '@vueuse/core'],
  },
})
