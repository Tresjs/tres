import { mkdir, mkdtemp, realpath, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { detectProject } from './project'

let tempDir: string

beforeEach(async () => {
  tempDir = await realpath(await mkdtemp(join(tmpdir(), 'tresjs-cli-')))
})

afterEach(async () => {
  await rm(tempDir, { recursive: true, force: true })
})

describe('detectProject', () => {
  it('walks up from a nested cwd to find the nearest package.json as root', async () => {
    await writeFile(join(tempDir, 'package.json'), JSON.stringify({ name: 'root-pkg' }))
    const nested = join(tempDir, 'a', 'b', 'c')
    await mkdir(nested, { recursive: true })

    const info = await detectProject(nested)

    expect(info.root).toBe(tempDir)
  })

  it('returns root: cwd and null/empty fields when no package.json exists up-tree', async () => {
    const info = await detectProject(tempDir)

    expect(info.root).toBe(tempDir)
    expect(info.packageManager).toBeNull()
    expect(info.framework).toBeNull()
    expect(info.configFiles).toEqual({})
    expect(info.versions).toEqual({})
  })

  it.each([
    ['pnpm-lock.yaml', 'pnpm'],
    ['yarn.lock', 'yarn'],
    ['bun.lock', 'bun'],
    ['bun.lockb', 'bun'],
    ['package-lock.json', 'npm'],
  ] as const)('maps %s to packageManager %s', async (lockfile, manager) => {
    await writeFile(join(tempDir, 'package.json'), '{}')
    await writeFile(join(tempDir, lockfile), '')

    const info = await detectProject(tempDir)

    expect(info.packageManager).toBe(manager)
  })

  it('returns null packageManager when no lockfile is present', async () => {
    await writeFile(join(tempDir, 'package.json'), '{}')

    const info = await detectProject(tempDir)

    expect(info.packageManager).toBeNull()
  })

  it('prefers pnpm, then yarn, then bun, then npm when multiple lockfiles exist', async () => {
    await writeFile(join(tempDir, 'package.json'), '{}')
    await writeFile(join(tempDir, 'pnpm-lock.yaml'), '')
    await writeFile(join(tempDir, 'yarn.lock'), '')
    await writeFile(join(tempDir, 'bun.lock'), '')
    await writeFile(join(tempDir, 'package-lock.json'), '')

    expect((await detectProject(tempDir)).packageManager).toBe('pnpm')

    await rm(join(tempDir, 'pnpm-lock.yaml'))
    expect((await detectProject(tempDir)).packageManager).toBe('yarn')

    await rm(join(tempDir, 'yarn.lock'))
    expect((await detectProject(tempDir)).packageManager).toBe('bun')

    await rm(join(tempDir, 'bun.lock'))
    expect((await detectProject(tempDir)).packageManager).toBe('npm')
  })

  it('detects nuxt from a dependency even without a config file', async () => {
    await writeFile(join(tempDir, 'package.json'), JSON.stringify({ dependencies: { nuxt: '^3.0.0' } }))

    const info = await detectProject(tempDir)

    expect(info.framework).toBe('nuxt')
    expect('nuxt' in info.configFiles).toBe(false)
  })

  it('detects vite when only a vite config file is present', async () => {
    await writeFile(join(tempDir, 'package.json'), '{}')
    await writeFile(join(tempDir, 'vite.config.mts'), '')

    const info = await detectProject(tempDir)

    expect(info.framework).toBe('vite')
    expect(info.configFiles.vite).toBe(join(tempDir, 'vite.config.mts'))
    expect('nuxt' in info.configFiles).toBe(false)
  })

  it('picks nuxt over vite when both a nuxt and a vite config file are present', async () => {
    await writeFile(join(tempDir, 'package.json'), '{}')
    await writeFile(join(tempDir, 'nuxt.config.ts'), '')
    await writeFile(join(tempDir, 'vite.config.ts'), '')

    const info = await detectProject(tempDir)

    expect(info.framework).toBe('nuxt')
    expect(info.configFiles.nuxt).toBe(join(tempDir, 'nuxt.config.ts'))
    expect(info.configFiles.vite).toBe(join(tempDir, 'vite.config.ts'))
  })

  it('returns null framework and omits configFiles keys when nothing matches', async () => {
    await writeFile(join(tempDir, 'package.json'), '{}')

    const info = await detectProject(tempDir)

    expect(info.framework).toBeNull()
    expect('vite' in info.configFiles).toBe(false)
    expect('nuxt' in info.configFiles).toBe(false)
    expect('tsconfig' in info.configFiles).toBe(false)
  })

  it('records an absolute tsconfig path when present', async () => {
    await writeFile(join(tempDir, 'package.json'), '{}')
    await writeFile(join(tempDir, 'tsconfig.json'), '{}')

    const info = await detectProject(tempDir)

    expect(info.configFiles.tsconfig).toBe(join(tempDir, 'tsconfig.json'))
  })

  it('collects versions for three and @tresjs/* packages from both dependency blocks, ignoring the rest', async () => {
    await writeFile(join(tempDir, 'package.json'), JSON.stringify({
      dependencies: {
        'three': '^0.180.0',
        '@tresjs/core': 'workspace:*',
        'vue': '^3.5.0',
      },
      devDependencies: {
        '@tresjs/cientos': 'catalog:',
        'typescript': '^5.0.0',
      },
    }))

    const info = await detectProject(tempDir)

    expect(info.versions).toEqual({
      'three': '^0.180.0',
      '@tresjs/core': 'workspace:*',
      '@tresjs/cientos': 'catalog:',
    })
  })

  it('prefers the dependencies range over devDependencies on a name clash', async () => {
    await writeFile(join(tempDir, 'package.json'), JSON.stringify({
      dependencies: { three: '^0.180.0' },
      devDependencies: { three: '^0.170.0' },
    }))

    const info = await detectProject(tempDir)

    expect(info.versions.three).toBe('^0.180.0')
  })
})
