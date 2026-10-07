import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { coreEntry, findUnportedComponents, hasWebGPUEntry, isComponentExport, readExportNames, renderWebGPUStubs, selectEntry } from '../src/entries'

describe('coreEntry', () => {
  it('uses the root entry for webgl', () => {
    expect(coreEntry('webgl')).toBe('@tresjs/core')
  })

  it('uses the /webgpu entry for webgpu', () => {
    expect(coreEntry('webgpu')).toBe('@tresjs/core/webgpu')
  })
})

describe('hasWebGPUEntry', () => {
  it('is true when the exports map has ./webgpu', () => {
    expect(hasWebGPUEntry({ exports: { '.': './dist/a.js', './webgpu': { default: './dist/webgpu.js' } } })).toBe(true)
  })

  it('is false without ./webgpu, with string exports or without exports', () => {
    expect(hasWebGPUEntry({ exports: { '.': './dist/a.js' } })).toBe(false)
    expect(hasWebGPUEntry({ exports: './dist/a.js' })).toBe(false)
    expect(hasWebGPUEntry({})).toBe(false)
  })
})

describe('selectEntry', () => {
  const withWebGPU = { exports: { '.': './a.js', './webgpu': './webgpu.js' } }
  const rootOnly = { exports: { '.': './a.js' } }

  it('always uses the root entry for webgl', () => {
    expect(selectEntry('@tresjs/cientos', 'webgl', withWebGPU)).toBe('@tresjs/cientos')
    expect(selectEntry('@tresjs/post-processing', 'webgl', rootOnly)).toBe('@tresjs/post-processing')
  })

  it('uses the /webgpu subpath when the package has one', () => {
    expect(selectEntry('@tresjs/cientos', 'webgpu', withWebGPU)).toBe('@tresjs/cientos/webgpu')
  })

  it('falls back to the root entry for renderer-agnostic packages', () => {
    expect(selectEntry('@tresjs/leches', 'webgpu', rootOnly)).toBe('@tresjs/leches')
  })

  it('skips WebGL-only packages that have no /webgpu entry yet', () => {
    expect(selectEntry('@tresjs/post-processing', 'webgpu', rootOnly)).toBeNull()
  })

  it('uses /webgpu for a WebGL-only package once it ships one', () => {
    expect(selectEntry('@tresjs/post-processing', 'webgpu', withWebGPU)).toBe('@tresjs/post-processing/webgpu')
  })
})

describe('findUnportedComponents', () => {
  it('returns the PascalCase root exports missing from /webgpu', () => {
    const root = ['Grid', 'Stars', 'Sky', 'useFBO', 'useGLTF', 'pick']
    const webgpu = ['Stars', 'useGLTF', 'pick']
    expect(findUnportedComponents(root, webgpu)).toEqual(['Grid', 'Sky'])
  })

  it('returns nothing when everything is ported', () => {
    expect(findUnportedComponents(['Stars'], ['Stars'])).toEqual([])
  })
})

describe('renderWebGPUStubs', () => {
  it('exports one stub per unported component', () => {
    const code = renderWebGPUStubs('/runtime/webgpuStub', [
      { name: 'Grid', from: '@tresjs/cientos' },
      { name: 'Sky', from: '@tresjs/cientos' },
    ])
    expect(code).toContain('import { createWebGPUStub } from "/runtime/webgpuStub"')
    expect(code).toContain('export const Grid = /* #__PURE__ */ createWebGPUStub("Grid", "@tresjs/cientos")')
    expect(code).toContain('export const Sky = /* #__PURE__ */ createWebGPUStub("Sky", "@tresjs/cientos")')
  })
})

describe('isComponentExport', () => {
  it('is true for PascalCase names only', () => {
    expect(isComponentExport('OrbitControls')).toBe(true)
    expect(isComponentExport('useGLTF')).toBe(false)
    expect(isComponentExport('pick')).toBe(false)
  })
})

// The module reads export names from the built file instead of importing it. If a cientos build
// change hides an export from `findExportNames`, that export silently stops being auto-imported.
// nuxt does not depend on cientos, so this reads the workspace build. Run `nb` in packages/cientos first.
describe('readExportNames on the cientos build', () => {
  const cientosDir = new URL('../../cientos/', import.meta.url)
  const { exports } = JSON.parse(readFileSync(new URL('package.json', cientosDir), 'utf8'))
  const entries = {
    '.': exports['.'],
    './webgpu': exports['./webgpu'].default,
  }

  it.each(Object.entries(entries))('finds every export of %s', async (_, file) => {
    const entryUrl = new URL(file, cientosDir)
    const found = await readExportNames(fileURLToPath(entryUrl))
    const actual = Object.keys(await import(entryUrl.href))
    expect(actual.length).toBeGreaterThan(0)
    expect(found.toSorted()).toEqual(actual.toSorted())
  })

  it('resolves Grid from /webgpu (the TSL port)', async () => {
    const found = await readExportNames(fileURLToPath(new URL(entries['./webgpu'], cientosDir)))
    expect(found).toContain('Grid')
  })
})
