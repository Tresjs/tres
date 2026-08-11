import type { IRNode } from './ir'
import { describe, expect, it } from 'vitest'
import { collidingNamesGLB, morphAndMetaGLB, multiPrimitiveGLB, nestedGLB, repeatedGeometryGLB, simpleGLB, skinnedGLB } from './__fixtures__/scenes'
import { buildIR } from './build-ir'
import { loadGLTF } from './load'

async function irOf(glb: Promise<ArrayBuffer>) {
  return buildIR(await loadGLTF(await glb))
}

function find(node: IRNode, name: string): IRNode | undefined {
  if (node.name === name) {
    return node
  }
  for (const child of node.children) {
    const match = find(child, name)
    if (match) {
      return match
    }
  }
  return undefined
}

describe('buildIR', () => {
  it('roots the tree at the scene', async () => {
    const ir = await irOf(simpleGLB())

    expect(ir.root.tag).toBe('TresGroup')
    expect(find(ir.root, 'Cube001')).toBeDefined()
  })

  it('maps three types to Tres tags', async () => {
    const ir = await irOf(simpleGLB())

    expect(find(ir.root, 'Cube001')?.tag).toBe('TresMesh')
  })

  it('keeps the authored name when sanitization changed it', async () => {
    const ir = await irOf(simpleGLB())

    expect(find(ir.root, 'Cube001')?.originalName).toBe('Cube.001')
  })

  it('omits originalName when nothing was sanitized', async () => {
    const ir = await irOf(nestedGLB())

    expect(find(ir.root, 'Body')?.originalName).toBeUndefined()
  })

  it('flags node keys that are not valid identifiers', async () => {
    const ir = await irOf(nestedGLB())

    expect(ir.nodes['Model-Toy-Rocket']).toMatchObject({ isVarName: false })
    expect(ir.nodes.Body).toMatchObject({ isVarName: true })
  })

  it('flags material keys that are not valid identifiers', async () => {
    const ir = await irOf(simpleGLB())

    expect(ir.materials['Autumm orange']).toMatchObject({ isVarName: false, type: 'MeshStandardMaterial' })
  })

  it('records only the transform channels that moved', async () => {
    const ir = await irOf(nestedGLB())

    expect(find(ir.root, 'Model-Toy-Rocket')?.transform).toEqual({ position: [1, 0, -3] })
  })

  it('records rotation and scale', async () => {
    const ir = await irOf(nestedGLB())

    const transform = find(ir.root, 'Body')?.transform
    expect(transform?.rotation?.[1]).toBeCloseTo(Math.PI / 2, 5)
    expect(transform?.scale).toEqual([2, 2, 2])
  })

  it('leaves transform off untransformed nodes', async () => {
    const ir = await irOf(repeatedGeometryGLB())

    expect(find(ir.root, 'Rock_0')?.transform).toBeUndefined()
  })

  it('points each mesh at its material key', async () => {
    const ir = await irOf(multiPrimitiveGLB())

    expect(find(ir.root, 'Cylinder001_1')?.material).toBe('Autumm orange')
    expect(find(ir.root, 'Cylinder001_2')?.material).toBe('Material.003')
  })

  it('leaves the wrapping group of a split mesh without a material', async () => {
    const ir = await irOf(multiPrimitiveGLB())

    const group = find(ir.root, 'Cylinder001')
    expect(group?.type).toBe('Group')
    expect(group?.material).toBeUndefined()
  })

  it('lists animation clip names', async () => {
    const ir = await irOf(skinnedGLB())

    expect(ir.animations).toEqual(['Idle'])
  })

  it('exposes bones as their own nodes', async () => {
    const ir = await irOf(skinnedGLB())

    expect(find(ir.root, 'Body')?.type).toBe('SkinnedMesh')
    expect(find(ir.root, 'handl')).toMatchObject({ type: 'Bone', originalName: 'hand.l' })
  })

  it('buckets meshes that share geometry and material', async () => {
    const ir = await irOf(repeatedGeometryGLB())

    expect(ir.instances).toEqual([
      expect.objectContaining({ material: 'Rock', nodes: ['Rock_0', 'Rock_1', 'Rock_2'] }),
    ])
  })

  it('keeps a geometry used once in a bucket of its own, for --instanceall', async () => {
    const ir = await irOf(simpleGLB())

    expect(ir.instances).toEqual([
      expect.objectContaining({ material: 'Autumm orange', nodes: ['Cube001'] }),
    ])
  })

  it('flags which nodes carry geometry', async () => {
    const ir = await irOf(simpleGLB())

    expect(find(ir.root, 'Cube001')?.geometry).toBe(true)
    expect(ir.root.geometry).toBeUndefined()
  })

  it('flags meshes with morph targets', async () => {
    const ir = await irOf(morphAndMetaGLB())

    expect(find(ir.root, 'Face')?.morphTargets).toBe(true)
  })

  it('carries glTF extras as userData', async () => {
    const ir = await irOf(morphAndMetaGLB())

    // `targetNames` rides along: the exporter stores morph names in the same extras bag.
    expect(find(ir.root, 'Face')?.userData).toMatchObject({ collider: 'trimesh' })
  })

  it('drops the loader-injected name from userData', async () => {
    const ir = await irOf(simpleGLB())

    expect(find(ir.root, 'Cube001')?.userData).toBeUndefined()
  })

  it('carries the draco flag through to the emitter', async () => {
    const ir = await irOf(simpleGLB())

    expect(ir.draco).toBe(false)
  })

  it('warns when a name was suffixed to resolve a sanitization collision', async () => {
    const ir = await irOf(collidingNamesGLB())

    expect(ir.warnings).toEqual([
      expect.objectContaining({ type: 'name-collision', name: 'foobar_1', originalName: 'foobar' }),
    ])
  })
})
