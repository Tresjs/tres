import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/cli.ts',
  ],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  shims: true,
})