import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    index: './src/index.ts',
  },
  format: 'esm',
  platform: 'node',
  dts: false,
  banner: '#!/usr/bin/env node',
  // Pin explicitly: relying on tsdown's current default .mjs extension would
  // silently break the `bin` entry in package.json if that default ever changes.
  outExtensions: () => ({ js: '.mjs' }),
})
