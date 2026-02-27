import { defineConfig } from 'tsdown'
import { resolve } from 'node:path'
import Vue from 'unplugin-vue/rolldown'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  entry: {
    slim: './src/main-slim.ts',
  },
  outDir: 'dist-tsdown',
  platform: 'neutral',
  noExternal: [/./],
  /* minify: true, */
  plugins: [
    Vue({ isProduction: true }),
    visualizer({ filename: 'stats-tsdown-slim.html', open: false, gzipSize: true }),
  ],
  inputOptions: {
    resolve: {
      alias: {
        '@tresjs/core/slim': resolve('./../../packages/core/src/slim.ts'),
        '@tresjs/core': resolve('./../../packages/core/src/index.ts'),
      },
    },
  },
})
