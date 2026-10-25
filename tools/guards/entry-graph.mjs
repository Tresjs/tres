/**
 * Reads the import graph of a built entry, for the post-build `check-entries` scripts of the
 * packages that ship a `/webgpu` entry next to the root one.
 */

import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

// Subpaths that do not exist on old three versions. A root entry that reaches one of them
// breaks apps on `three <0.167`, which the `three >=0.133` peer range still allows.
export const WEBGPU_ONLY = ['three/webgpu', 'three/tsl']

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
export const importGraph = (dist, entry) => {
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

export const report = (name, errors, ok) => {
  if (errors.length) {
    console.error(`[${name}] ${errors.length} problem(s):\n${errors.map(e => `  - ${e}`).join('\n')}`)
    process.exit(1)
  }
  console.log(`[${name}] OK: ${ok}`)
}
