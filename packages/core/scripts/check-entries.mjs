// Runs after `tsdown` and fails the build when the entries break their contract:
// 1. The root entry must not reach `three/webgpu` or `three/tsl` (peer range is `three >=0.133`).
// 2. Both entries must share the one file that defines the catalogue, else an app that
//    imports from both gets two catalogues.
import { readFileSync } from 'node:fs'
import { dirname, join } from 'pathe'
import { fileURLToPath } from 'node:url'
import { importGraph, report, WEBGPU_ONLY } from '../../../tools/guards/entry-graph.mjs'

const dist = join(dirname(fileURLToPath(import.meta.url)), '../dist')

const errors = []
const root = importGraph(dist, 'tres.js')
const webgpu = importGraph(dist, 'webgpu.js')

for (const specifier of WEBGPU_ONLY) {
  if (root.packages.has(specifier)) {
    errors.push(`dist/tres.js reaches "${specifier}". The root entry must work on three versions without this subpath.`)
  }
}

if (!webgpu.packages.has('three/webgpu')) {
  errors.push('dist/webgpu.js does not import "three/webgpu". The check reads the wrong graph or the entry is broken.')
}

const catalogueFiles = [...new Set([...root.files, ...webgpu.files])]
  .filter(file => /\bconst catalogue\s*=/.test(readFileSync(join(dist, file), 'utf8')))

if (catalogueFiles.length !== 1) {
  errors.push(`Expected the catalogue in one file, found it in: ${catalogueFiles.join(', ') || 'none'}.`)
}
else if (!root.files.has(catalogueFiles[0]) || !webgpu.files.has(catalogueFiles[0])) {
  errors.push(`dist/${catalogueFiles[0]} defines the catalogue but not both entries import it.`)
}

report('check-entries', errors, `root entry has no WebGPU imports, both entries share dist/${catalogueFiles[0]}`)
