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
      trescientos: './src/index.ts',
    },
    platform: 'neutral',
    fromVite: true,
    banner,
    // @tsdown/css defaults to 'style.css'; keep the published name to match the
    // "./styles.css" export -> "./dist/trescientos.css"
    css: {
      fileName: 'trescientos.css',
    },
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
])
