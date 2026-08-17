import type { IRNode } from './ir'
import { describe, expect, it } from 'vitest'
import { clipOnlyGLB, collidingNamesGLB, morphAndMetaGLB, multiPrimitiveGLB, nestedGLB, objectAnimatedGLB, repeatedGeometryGLB, simpleGLB, skinnedGLB, skinnedNoClipsGLB } from './__fixtures__/scenes'
import { buildIR } from './build-ir'
import { loadGLTF } from './load'

interface SourceFixture {
  path: string
  glb: Promise<ArrayBuffer>
}

async function irOf(glb: Promise<ArrayBuffer>, sources: SourceFixture[] = []) {
  return buildIR(
    await loadGLTF(await glb),
    await Promise.all(sources.map(async source => ({ path: source.path, gltf: await loadGLTF(await source.glb) }))),
  )
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

  describe('clips from separate files', () => {
    it('leaves the source list empty without --animations', async () => {
      const ir = await irOf(skinnedGLB())

      expect(ir.animationSources).toEqual([])
      expect(ir.clips).toEqual(['Idle'])
    })

    it('records what each source carries', async () => {
      const ir = await irOf(skinnedNoClipsGLB(), [
        { path: 'clips/Idle.glb', glb: clipOnlyGLB('Idle') },
        { path: 'clips/Run.glb', glb: clipOnlyGLB('Run') },
      ])

      expect(ir.animationSources).toEqual([
        { path: 'clips/Idle.glb', draco: false, clips: ['Idle'], bound: ['Idle'] },
        { path: 'clips/Run.glb', draco: false, clips: ['Run'], bound: ['Run'] },
      ])
    })

    it('merges the model own clips first, then each source in order', async () => {
      const ir = await irOf(skinnedGLB(), [
        { path: 'clips/Run.glb', glb: clipOnlyGLB('Run') },
        { path: 'clips/Jump.glb', glb: clipOnlyGLB('Jump') },
      ])

      expect(ir.animations).toEqual(['Idle'])
      expect(ir.clips).toEqual(['Idle', 'Run', 'Jump'])
    })

    it('lists a name carried by two files once', async () => {
      const ir = await irOf(skinnedGLB(), [{ path: 'clips/Idle.glb', glb: clipOnlyGLB('Idle') }])

      expect(ir.clips).toEqual(['Idle'])
    })

    it('warns that the later file is the one reachable through actions', async () => {
      const ir = await irOf(skinnedGLB(), [{ path: 'clips/Idle.glb', glb: clipOnlyGLB('Idle') }])

      expect(ir.warnings).toContainEqual(
        expect.objectContaining({ type: 'clip-collision', name: 'Idle', source: 'clips/Idle.glb' }),
      )
    })

    it('keeps the names an external clip drives alive through pruning', async () => {
      const ir = await irOf(skinnedNoClipsGLB(), [{ path: 'clips/Idle.glb', glb: clipOnlyGLB('Idle') }])

      expect(ir.animated).toContain('handl')
    })

    /**
     * The retarget check tests a track's node name against the IR's node keys, so those keys
     * have to be the names a mixer resolves and not a form of our own. Three does the work:
     * `sanitizeNodeName` runs before we see the object (`hand.l` in the fixture is `handl`
     * here), and a track's target is that same `Object3D.name`. Key the IR by anything
     * derived and every external clip silently stops binding.
     */
    it('keys nodes by the name a mixer resolves, verbatim', async () => {
      const loaded = await loadGLTF(await skinnedNoClipsGLB())
      // A set, not a list: two nodes sharing a name collapse to one key, which is a separate
      // case with a warning of its own.
      const scene = new Set<string>()
      loaded.scene.traverse(object => object.name && scene.add(object.name))

      expect(Object.keys(buildIR(loaded).nodes).sort()).toEqual([...scene].sort())
      expect(scene).toContain('handl')
    })

    it('binds a clip whose node names three had to sanitize', async () => {
      const ir = await irOf(skinnedNoClipsGLB(), [
        { path: 'clips/Idle.glb', glb: clipOnlyGLB('Idle', ['hand.l']) },
      ])

      expect(ir.clips).toEqual(['Idle'])
      expect(ir.warnings.filter(warning => warning.type === 'retarget-mismatch')).toEqual([])
    })

    it('warns when only some of a clip tracks bind, and keeps the clip', async () => {
      const ir = await irOf(skinnedNoClipsGLB(), [
        { path: 'clips/Run.glb', glb: clipOnlyGLB('Run', ['hand.l', 'mixamorigHips']) },
      ])

      expect(ir.clips).toEqual(['Run'])
      expect(ir.warnings).toContainEqual(
        expect.objectContaining({ type: 'retarget-mismatch', name: 'Run', missing: ['mixamorigHips'], dropped: false }),
      )
    })

    it('drops a clip no track of which binds, so ActionName never offers it', async () => {
      const ir = await irOf(skinnedNoClipsGLB(), [
        { path: 'clips/Run.glb', glb: clipOnlyGLB('Run', ['mixamorigHips', 'mixamorigSpine']) },
      ])

      expect(ir.clips).toEqual([])
      expect(ir.animationSources[0]).toMatchObject({ clips: ['Run'], bound: [] })
      expect(ir.warnings).toContainEqual(
        expect.objectContaining({ type: 'retarget-mismatch', name: 'Run', dropped: true }),
      )
    })

    it('never retarget-checks the model own clips', async () => {
      const ir = await irOf(skinnedGLB())

      expect(ir.warnings).toEqual([])
    })

    it('points a skinned model with no clips at the flag', async () => {
      const ir = await irOf(skinnedNoClipsGLB())

      expect(ir.warnings).toContainEqual(
        expect.objectContaining({ type: 'no-clips', message: expect.stringContaining('--animations') }),
      )
    })

    it('stays quiet about a model with no skin and no clips', async () => {
      const ir = await irOf(simpleGLB())

      expect(ir.warnings).toEqual([])
    })

    it('stays quiet once the clips are wired in', async () => {
      const ir = await irOf(skinnedNoClipsGLB(), [{ path: 'clips/Idle.glb', glb: clipOnlyGLB('Idle') }])

      expect(ir.warnings.filter(warning => warning.type === 'no-clips')).toEqual([])
    })

    it('carries a source own draco flag, which the model one says nothing about', async () => {
      const ir = await irOf(objectAnimatedGLB(), [{ path: 'clips/Idle.glb', glb: clipOnlyGLB('Idle', ['Rock_0']) }])

      expect(ir.draco).toBe(false)
      expect(ir.animationSources[0].draco).toBe(false)
    })
  })
})
