import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { inferAssetURL } from './url'

describe('inferAssetURL', () => {
  let dir: string

  beforeAll(async () => {
    dir = await mkdtemp(join(tmpdir(), 'tres-url-'))
    await mkdir(join(dir, 'public', 'models', 'nested'), { recursive: true })
    await writeFile(join(dir, 'public', 'models', 'nested', 'robot.glb'), '')
    await mkdir(join(dir, 'loose'), { recursive: true })
    await writeFile(join(dir, 'loose', 'robot.glb'), '')
  })

  afterAll(async () => {
    await rm(dir, { recursive: true, force: true })
  })

  it('serves a model under public/ from the public root', async () => {
    const result = await inferAssetURL(join(dir, 'public', 'models', 'nested', 'robot.glb'))

    expect(result).toEqual({ url: '/models/nested/robot.glb', inferred: true })
  })

  it('falls back to the bare filename when there is no public/', async () => {
    const result = await inferAssetURL(join(dir, 'loose', 'robot.glb'))

    expect(result).toEqual({ url: '/robot.glb', inferred: false })
  })

  it('uses posix separators regardless of platform', async () => {
    const { url } = await inferAssetURL(join(dir, 'public', 'models', 'nested', 'robot.glb'))

    expect(url).not.toContain('\\')
  })
})
