import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

// fix d.mts imports
const mDtsModule = resolve('dist/types.d.mts')
const mDtsModuleContent = readFileSync(mDtsModule, 'utf-8')
writeFileSync(
  mDtsModule,
  mDtsModuleContent.replaceAll(
    'from \'./module\'',
    'from \'./module.js\'',
  ),
  'utf-8',
)
