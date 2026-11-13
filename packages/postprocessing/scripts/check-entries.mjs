// Runs after `tsdown` and fails the build when the root entry reaches `three/webgpu`, `three/tsl` or
// `@tresjs/core/webgpu`: the root entry must keep working on three versions without WebGPU.
import { dirname, join } from 'pathe'
import { fileURLToPath } from 'node:url'
import { importGraph, report, WEBGPU_ONLY } from '../../../tools/guards/entry-graph.mjs'

const dist = join(dirname(fileURLToPath(import.meta.url)), '../dist')
const FORBIDDEN_IN_ROOT = [...WEBGPU_ONLY, '@tresjs/core/webgpu']
const errors = []

const root = importGraph(dist, 'tres-post-processing.js')
const webgpu = importGraph(dist, 'webgpu.js')

for (const specifier of FORBIDDEN_IN_ROOT) {
  if (root.packages.has(specifier)) {
    errors.push(`dist/tres-post-processing.js reaches "${specifier}". The root entry must work on three versions without WebGPU.`)
  }
}

if (!webgpu.packages.has('@tresjs/core/webgpu')) {
  errors.push('dist/webgpu.js does not import "@tresjs/core/webgpu". The check reads the wrong graph or the entry is broken.')
}

report('check-entries', errors, 'root entry has no WebGPU imports')
