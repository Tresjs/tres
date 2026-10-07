// Runs after `tsdown` and fails the build when the entries break their contract:
// 1. The root entry must not reach `three/webgpu` or `three/tsl` (peer range is `three >=0.133`).
// 2. Both entries must share the one file that defines the catalogue, else an app that
//    imports from both gets two catalogues.
import { readFileSync } from 'node:fs'
import { dirname, join } from 'pathe'
import { fileURLToPath } from 'node:url'

const dist = join(dirname(fileURLToPath(import.meta.url)), '../dist')
const WEBGPU_ONLY = ['three/webgpu', 'three/tsl']

// Dynamic `import('x')` counts too: bundlers resolve a literal specifier at build time, so
// `import('three/webgpu')` in the root graph breaks apps on old three just like a static import.
const importSpecifiers = (code) => {
  const specifiers = []
  for (const match of code.matchAll(/(?:^|\n)\s*(?:import|export)\s[^;]*?from\s*["']([^"']+)["']|(?:^|\n)\s*import\s*["']([^"']+)["']|\bimport\s*\(\s*["']([^"']+)["']\s*\)/g)) {
    specifiers.push(match[1] ?? match[2] ?? match[3])
  }
  return specifiers
}

// Walks the relative imports (static and dynamic) of an entry. Returns the dist files it
// reaches and the bare specifiers (packages) they import.
const importGraph = (entry) => {
  const files = new Set()
  const packages = new Set()
  const visit = (file) => {
    if (files.has(file)) { return }
    files.add(file)
    for (const specifier of importSpecifiers(readFileSync(join(dist, file), 'utf8'))) {
      if (specifier.startsWith('.')) { visit(join(dirname(file), specifier)) }
      else { packages.add(specifier) }
    }
  }
  visit(entry)
  return { files, packages }
}

const errors = []
const root = importGraph('tres.js')
const webgpu = importGraph('webgpu.js')

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

if (errors.length) {
  console.error(`[check-entries] ${errors.length} problem(s):\n${errors.map(e => `  - ${e}`).join('\n')}`)
  process.exit(1)
}

console.log(`[check-entries] OK: root entry has no WebGPU imports, both entries share dist/${catalogueFiles[0]}`)
