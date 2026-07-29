import { Buffer } from 'node:buffer'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { collidingNamesGLB, multiPrimitiveGLB, simpleGLB, skinnedGLB, writeUnpackedGLTF } from './__fixtures__/scenes'
import { loadGLTF, loadGLTFFile } from './load'

function namesOf(root: { traverse: (cb: (o: { name: string }) => void) => void }): string[] {
  const names: string[] = []
  root.traverse(object => object.name && names.push(object.name))
  return names
}

describe('loadGLTF', () => {
  it('parses a GLB buffer with no browser present', async () => {
    const { scene } = await loadGLTF(await simpleGLB())

    expect(namesOf(scene)).toContain('Cube001')
  })

  it('keeps the unsanitized name in userData', async () => {
    const { scene } = await loadGLTF(await simpleGLB())

    const mesh = scene.getObjectByName('Cube001')
    expect(mesh?.userData.name).toBe('Cube.001')
  })

  it('splits a multi-primitive mesh into sibling meshes under a group', async () => {
    const { scene } = await loadGLTF(await multiPrimitiveGLB())

    const group = scene.getObjectByName('Cylinder001')
    expect(group?.type).toBe('Group')
    expect(group?.children.map(child => child.name)).toEqual(['Cylinder001_1', 'Cylinder001_2'])
  })

  it('gives the bare name to the first primitive when the node is unnamed', async () => {
    const { scene } = await loadGLTF(await multiPrimitiveGLB({ namedNode: false }))

    expect(scene.getObjectByName('Cylinder001')?.type).toBe('Mesh')
    expect(namesOf(scene)).toEqual(expect.arrayContaining(['Cylinder001', 'Cylinder001_1']))
  })

  it('suffixes names that collide after sanitization instead of dropping one', async () => {
    const { scene } = await loadGLTF(await collidingNamesGLB())

    expect(namesOf(scene)).toEqual(expect.arrayContaining(['foobar', 'foobar_1']))
  })

  it('parses skinned meshes and animation clips', async () => {
    const { scene, animations } = await loadGLTF(await skinnedGLB())

    expect(scene.getObjectByName('Body')?.type).toBe('SkinnedMesh')
    expect(animations.map(clip => clip.name)).toEqual(['Idle'])
  })
})

describe('loadGLTFFile', () => {
  let dir: string

  beforeAll(async () => {
    dir = await mkdtemp(join(tmpdir(), 'tres-gltf-'))
  })

  afterAll(async () => {
    await rm(dir, { recursive: true, force: true })
  })

  it('loads a .glb from disk', async () => {
    const path = join(dir, 'model.glb')
    await writeFile(path, Buffer.from(await simpleGLB()))

    const { scene } = await loadGLTFFile(path)

    expect(scene.getObjectByName('Cube001')).toBeDefined()
  })

  it('reports that a model needs the draco decoder at runtime', async () => {
    const path = fileURLToPath(new URL('./__fixtures__/cube-draco.glb', import.meta.url))

    await expect(loadGLTFFile(path).then(gltf => gltf.draco)).resolves.toBe(true)
    await expect(loadGLTF(await simpleGLB()).then(gltf => gltf.draco)).resolves.toBe(false)
  })

  it('decodes draco-compressed geometry', async () => {
    const path = fileURLToPath(new URL('./__fixtures__/cube-draco.glb', import.meta.url))

    const { scene } = await loadGLTFFile(path)

    let positions = 0
    scene.traverse((object: any) => {
      positions += object.geometry?.attributes.position?.count ?? 0
    })
    expect(positions).toBeGreaterThan(0)
  })

  it('resolves the sidecar .bin of an unpacked .gltf', async () => {
    const path = await writeUnpackedGLTF(join(dir, 'unpacked'))

    const { scene } = await loadGLTFFile(path)

    const mesh = scene.getObjectByName('Cube001') as { geometry?: { attributes: Record<string, unknown> } }
    expect(mesh.geometry?.attributes.position).toBeDefined()
  })
})
