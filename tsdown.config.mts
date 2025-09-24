import { defineConfig } from 'tsdown'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

const pkg = require('./package.json')

const banner = `/**\n * name: ${pkg.name}\n * version: v${
  pkg.version
}\n * (c) ${new Date().getFullYear()}\n * description: ${pkg.description}\n * author: ${pkg.author}\n */`

export default defineConfig([
  {
    entry: ['./src/index.ts'],
    platform: 'neutral',
    fromVite: true,
    banner,
    dts: {
      vue: true,
      banner,
    },
    define: {
      __VERSION__: JSON.stringify(pkg.version),
    },
  },
  {
    entry: [
      './src/components/index.ts',
      './src/composables/index.ts',
      './src/utils/index.ts',
      './src/types/index.ts',
    ],
    platform: 'neutral',
    fromVite: true,
    banner,
    dts: {
      vue: true,
      banner,
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
    dts: {
      banner,
    },
  },
])
