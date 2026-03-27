/// <reference types="vitest" />

import { createRequire } from 'node:module'
import vue from '@vitejs/plugin-vue'
import { bold, gray, lightGreen, yellow } from 'kolorist'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite-plus'
import pkg from './package.json' with { type: 'json' }

const require = createRequire(import.meta.url)
const pkgJson = require('./package.json')

// eslint-disable-next-line no-console
console.log(`${lightGreen('▲')} ${gray('■')} ${yellow('●')} ${bold('Tres')} v${pkg.version}`)

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
        tres: './src/index.ts',
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
    {
      entry: ['./src/utils/template-compiler-options.ts'],
      platform: 'node',
      banner,
      dts: true,
    },
  ],
  server: {
    port: 5174,
  },
  plugins: [
    vue({
      isProduction: false,
      template: {
        compilerOptions: {
          isCustomElement: (tag: string) => /^Tres[A-Z]/.test(tag) || tag.startsWith('tres-'),
        },
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
  },
  optimizeDeps: {
    exclude: ['vue', 'three'],
  },
})
