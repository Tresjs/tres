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
    entry: [
      './src/index.ts',
    ],
    platform: 'neutral',
    fromVite: true,
    banner,
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
      './src/unimport/index.ts',
      './src/unplugin-vue-components/index.ts',
    ],
    platform: 'node',
    banner,
    dts: true,
  },
])