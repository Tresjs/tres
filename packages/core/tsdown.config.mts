import { defineConfig } from 'tsdown'
import { createRequire } from 'node:module'
import { visualizer } from 'rollup-plugin-visualizer'

const require = createRequire(import.meta.url)

const pkg = require('./package.json')

const banner = `/**
  * name: ${pkg.name}
  * version: v${pkg.version}
  * (c) ${new Date().getFullYear()}
  * description: ${pkg.description}
  * author: ${pkg.author}
  */`

export default defineConfig([
  {
    entry: {
      tres: './src/index.ts',
    },
    platform: 'neutral',
    fromVite: true,
    banner,
    plugins: [
      process.env.ANALYZE && visualizer({ open: true, gzipSize: true, filename: 'dist/stats.html' }),
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
  {
    entry: [
      './src/utils/template-compiler-options.ts',
    ],
    platform: 'node',
    banner,
    dts: true,
  },
])
