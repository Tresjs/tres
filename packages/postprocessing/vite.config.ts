import { createRequire } from 'node:module'
import { templateCompilerOptions } from '@tresjs/core'
import vue from '@vitejs/plugin-vue'
import { bold, gray, lightGreen, magenta } from 'kolorist'
import { resolve } from 'pathe'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite-plus'
import pkg from './package.json' with { type: 'json' }

const require = createRequire(import.meta.url)
const pkgJson = require('./package.json')

// eslint-disable-next-line no-console
console.log(
  `${lightGreen('▲')} ${gray('■')} ${magenta('𝗫')} ${bold('Tres/post-processing')} v${pkg.version}`,
)

const banner = `/**
  * name: ${pkgJson.name}
  * version: v${pkgJson.version}
  * (c) ${new Date().getFullYear()}
  * description: ${pkgJson.description}
  * author: ${pkgJson.author}
  */`

// https://vitejs.dev/config/
export default defineConfig({
  pack: [
    {
      entry: {
        'tres-post-processing': './src/index.ts',
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
            __VERSION__: JSON.stringify(pkgJson.version),
          },
        },
      },
    },
  ],
  resolve: {
    alias: {
      '/@': resolve(import.meta.dirname, './src'),
    },
    dedupe: ['@tresjs/core', '@vueuse/core'],
  },
  plugins: [vue(templateCompilerOptions)],
  optimizeDeps: {
    exclude: ['three', 'vue', '@tresjs/core', 'postprocessing', '@vueuse/core'],
  },
})
