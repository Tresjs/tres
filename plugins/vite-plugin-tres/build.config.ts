import { defineBuildConfig } from 'unbuild'

import pkg from './package.json' assert { type: 'json' }

const externals = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies || {}),
  'vite',
  'fs',
  'events',
  'pathe',
  'fast-glob',
]

export default defineBuildConfig({
  entries: [{ input: 'src/node/cli', name: 'node/cli' }],
  clean: true,
  declaration: false,
  externals,
  rollup: {
    alias: {
      entries: [{ find: /^node:(.+)$/, replacement: '$1' }],
    },
    emitCJS: false,
    inlineDependencies: true,
  },
})
