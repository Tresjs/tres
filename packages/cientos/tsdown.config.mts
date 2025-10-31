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
      trescientos: './src/index.ts',
    },
    platform: 'neutral',
    fromVite: true,
    banner,
    // Enable tsdown to manage the package exports field automatically based on outputs
    exports: true,
    dts: {
      vue: true,
    },
    define: {
      __VERSION__: JSON.stringify(pkg.version),
    },
  },
])
