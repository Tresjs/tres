import { createRequire } from 'node:module'
import { templateCompilerOptions } from '@tresjs/core'
import vue from '@vitejs/plugin-vue'
import { bold, gray, lightGreen, yellow } from 'kolorist'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite-plus'
import glsl from 'vite-plugin-glsl'
import pkg from './package.json' with { type: 'json' }

const require = createRequire(import.meta.url)
const pkgJson = require('./package.json')

// eslint-disable-next-line no-console
console.log(
  `${lightGreen('▲')} ${gray('■')} ${yellow('♥')} ${bold('Tres/cientos')} v${pkg.version}`,
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
        trescientos: './src/index.ts',
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
    dedupe: ['@tresjs/core'],
  },
  plugins: [
    vue({
      isProduction: false,
      ...templateCompilerOptions,
    }),
    glsl(),
  ],
  optimizeDeps: {
    exclude: ['three', 'vue', '@tresjs/core'],
  },
})
