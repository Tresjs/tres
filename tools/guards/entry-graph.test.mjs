// The check-entries scripts trust importGraph. If it misses an import form that rolldown emits,
// the guard passes silently and the root entry ships `three/webgpu` to apps on old three.
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { after, test } from 'node:test'
import assert from 'node:assert/strict'
import { importGraph } from './entry-graph.mjs'

const dist = mkdtempSync(join(tmpdir(), 'entry-graph-'))
after(() => rmSync(dist, { recursive: true, force: true }))

const write = files => Object.entries(files).forEach(([name, code]) => writeFileSync(join(dist, name), code))

test('finds WebGPU subpaths reached through shared chunks, re-exports and dynamic imports', () => {
  write({
    'root.js': 'import { a } from "./shared.js";\nexport * from "./reexport.js";\nconst lazy = () => import("./lazy.js");\nexport { a as A, lazy };\n',
    'shared.js': 'import { Mesh } from "three";\nimport "three/tsl";\nexport const a = Mesh;\n',
    'reexport.js': 'export { WebGPURenderer } from "three/webgpu";\n',
    'lazy.js': 'export default 1;\n',
  })

  const { files, packages } = importGraph(dist, 'root.js')

  assert.deepEqual([...files].sort(), ['lazy.js', 'reexport.js', 'root.js', 'shared.js'])
  assert.deepEqual([...packages].sort(), ['three', 'three/tsl', 'three/webgpu'])
})

test('does not reach files that only another entry imports', () => {
  write({
    'clean.js': 'import { a } from "./shared-clean.js";\nexport { a };\n',
    'shared-clean.js': 'import { Mesh } from "three";\nexport const a = Mesh;\n',
    'webgpu.js': 'import { a } from "./shared-clean.js";\nimport { WebGPURenderer } from "three/webgpu";\nexport { a, WebGPURenderer };\n',
  })

  const { packages } = importGraph(dist, 'clean.js')

  assert.deepEqual([...packages], ['three'])
})
