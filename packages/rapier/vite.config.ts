import { createRequire } from 'node:module'
import { templateCompilerOptions } from '@tresjs/core'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite-plus'

const require = createRequire(import.meta.url)
const pkg = require('./package.json')

const banner = `/**
  * name: ${pkg.name}
  * version: v${pkg.version}
  * (c) ${new Date().getFullYear()}
  * description: ${pkg.description}
  * author: ${pkg.author}
  */`

export default defineConfig({
  pack: [
    {
      entry: {
        tresrapier: './src/index.ts',
      },
      platform: 'neutral',
      fromVite: true,
      banner,
      plugins: [
        process.env.ANALYZE &&
          visualizer({ open: true, gzipSize: true, filename: 'dist/stats.html' }),
      ].filter(Boolean),
      dts: {
        vue: true,
      },
      inputOptions: {
        transform: {
          define: {
            __VERSION__: JSON.stringify(pkg.version),
          },
        },
      },
    },
  ],
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
