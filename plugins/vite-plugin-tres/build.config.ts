import { defineBuildConfig } from 'unbuild'

import pkg from './package.json' assert { type: 'json' }

const externals = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies || {}),
  'vite',
]

export default defineBuildConfig({
  entries: [{ input: 'src/index' }],
  clean: true,
  declaration: true,
  externals,
  rollup: {
    alias: {
      entries: [{ find: /^node:(.+)$/, replacement: '$1' }],
    },
    emitCJS: true,
    inlineDependencies: true,
  },
})