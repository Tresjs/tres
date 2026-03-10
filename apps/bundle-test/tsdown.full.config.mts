import { defineConfig } from 'tsdown'
import { resolve } from 'node:path'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  entry: {
    full: './src/main-full.ts',
  },
  outDir: 'dist-tsdown',
  platform: 'browser',
  plugins: [
    visualizer({ filename: 'stats-tsdown-full.html', open: false, gzipSize: true }),
  ],
  resolve: {
    alias: {
      '@tresjs/core/slim': resolve('./../../packages/core/src/slim.ts'),
      '@tresjs/core': resolve('./../../packages/core/src/index.ts'),
    },
  },
})
