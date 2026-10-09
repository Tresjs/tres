import { readFile } from 'node:fs/promises'
import { findExportNames } from 'mlly'

export type TresRenderer = 'webgl' | 'webgpu'

interface PackageWithExports {
  exports?: unknown
}

export interface WebGPUStub {
  name: string
  from: string
}

// Their root entry only works with WebGLRenderer. Without a `/webgpu` entry, WebGPU mode skips them.
// Other packages without `/webgpu` (leches, rapier) do not touch the renderer, so the root entry is safe.
export const WEBGL_ONLY_PACKAGES = ['@tresjs/post-processing']

export function coreEntry(renderer: TresRenderer) {
  return renderer === 'webgpu' ? '@tresjs/core/webgpu' : '@tresjs/core'
}

export function hasWebGPUEntry(pkg: PackageWithExports) {
  return typeof pkg.exports === 'object' && pkg.exports !== null && './webgpu' in pkg.exports
}

/**
 * The entry to auto-import `mod` from, or `null` when `mod` must not be auto-imported.
 */
export function selectEntry(mod: string, renderer: TresRenderer, pkg: PackageWithExports) {
  if (renderer === 'webgl') {
    return mod
  }
  if (hasWebGPUEntry(pkg)) {
    return `${mod}/webgpu`
  }
  return WEBGL_ONLY_PACKAGES.includes(mod) ? null : mod
}

export async function readExportNames(entryPath: string) {
  return findExportNames(await readFile(entryPath, 'utf8'))
}

export function isComponentExport(name: string) {
  return /^[A-Z]/.test(name)
}

export function findUnportedComponents(rootNames: string[], webgpuNames: string[]) {
  const ported = new Set(webgpuNames)
  return rootNames.filter(name => isComponentExport(name) && !ported.has(name))
}

export function renderWebGPUStubs(runtimePath: string, stubs: WebGPUStub[]) {
  return [
    `import { createWebGPUStub } from ${JSON.stringify(runtimePath)}`,
    ...stubs.map(({ name, from }) =>
      `export const ${name} = /* #__PURE__ */ createWebGPUStub(${JSON.stringify(name)}, ${JSON.stringify(from)})`),
  ].join('\n')
}
