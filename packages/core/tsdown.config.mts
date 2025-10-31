import { defineConfig } from 'tsdown'
import { createRequire } from 'node:module'

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
    exports: true,
    dts: {
      vue: true,
    },
    define: {
      __VERSION__: JSON.stringify(pkg.version),
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
