import type { EmitOptions } from './sfc'
import { describe, expect, it } from 'vitest'
import { buildIR } from '../gltf/build-ir'
import { loadGLTF } from '../gltf/load'
import { physicsGLB, simpleGLB } from '../gltf/__fixtures__/scenes'
import { emitSFC } from './sfc'

async function emit(glb: Promise<ArrayBuffer>, options: Partial<EmitOptions> = {}) {
  const ir = buildIR(await loadGLTF(await glb))
  return emitSFC(ir, { url: '/models/level.glb', physics: 'rapier', ...options })
}

describe('--physics rapier', () => {
  it('generates nothing physical without the flag', async () => {
    const { code } = await emit(physicsGLB(), { physics: undefined })

    expect(code).not.toContain('RigidBody')
    expect(code).not.toContain('@tresjs/rapier')
  })

  it('wraps a -convcol mesh in a fixed body with a convex hull', async () => {
    const { code } = await emit(physicsGLB())

    expect(code).toContain('<RigidBody type="fixed" collider="convexHull">')
    expect(code).toContain(`<TresMesh :geometry="nodes['Floor-convcol'].geometry" :material="materials.Prototype" />`)
  })

  it('gives -col a trimesh, which only a body that never moves can afford', async () => {
    const { code } = await emit(physicsGLB())

    expect(code).toContain('<RigidBody type="fixed" collider="trimesh"')
  })

  it('makes -rigid a dynamic body', async () => {
    const { code } = await emit(physicsGLB())

    expect(code).toContain('<RigidBody type="dynamic" collider="convexHull"')
  })

  it('reads the suffix through a Blender duplicate counter', async () => {
    const { code } = await emit(physicsGLB())

    // `Can_A-rigid.001` sanitizes to `Can_A-rigid001`, suffix buried mid-name.
    expect(code).toContain(`:geometry="nodes['Can_A-rigid001'].geometry"`)
    expect(code.match(/<RigidBody type="dynamic"/g)).toHaveLength(3)
  })

  it('hides a -convcolonly proxy instead of drawing it', async () => {
    const { code } = await emit(physicsGLB())

    expect(code).toContain(`<TresMesh :geometry="nodes['Stairs_Collision-convcolonly'].geometry" :visible="false" />`)
  })

  it('keeps a -col mesh visible', async () => {
    const { code } = await emit(physicsGLB())

    expect(code).not.toContain(`nodes['table_medium-col'].geometry" :material="materials.Prototype" :visible="false"`)
  })

  it('makes a bare -sensor an invisible trigger volume', async () => {
    const { code } = await emit(physicsGLB())

    expect(code).toContain('<RigidBody type="fixed" collider="convexHull" sensor>')
    expect(code).toContain(`nodes['Exit-sensor'].geometry" :material="materials.Prototype" :visible="false"`)
  })

  it('moves position and rotation onto the body, and leaves scale on the mesh', async () => {
    const { code } = await emit(physicsGLB())

    expect(code).toContain('<RigidBody type="fixed" collider="trimesh" :position="[1, 0, -3]" :rotation="[0, 1.57, 0]">')
    expect(code).toContain(`:material="materials.Prototype" :scale="2"`)
    expect(code).not.toContain('collider="trimesh" :position="[1, 0, -3]" :rotation="[0, 1.57, 0]" :scale="2"')
  })

  it('imports RigidBody once, and only when a body was generated', async () => {
    const { code } = await emit(physicsGLB())

    expect(code.match(/from '@tresjs\/rapier'/g)).toHaveLength(1)
    expect(code).toContain(`import { RigidBody } from '@tresjs/rapier'`)
  })

  it('says in the file that the consumer owns the Physics world', async () => {
    const { code } = await emit(physicsGLB())

    expect(code).toContain('<Physics>')
  })

  it('wraps the whole body in the slot, so an override can replace the physics', async () => {
    const { code } = await emit(physicsGLB())

    expect(code).toMatch(/<slot name="Floor-convcol"[^>]*>\s*<RigidBody/)
  })

  it('reports a suffix it could not read rather than dropping it silently', async () => {
    const { code, warnings } = await emit(physicsGLB())

    expect(warnings.join('\n')).toContain('"dynmic" is not a body type')
    expect(code).toContain(`<TresMesh :geometry="nodes['Barrel-rb-dynmic'].geometry"`)
    expect(code).not.toMatch(/<RigidBody[^>]*>\s*<TresMesh :geometry="nodes\['Barrel-rb-dynmic'\]/)
  })

  it('refuses a suffix on a group, which a body has no geometry to read', async () => {
    const { code, warnings } = await emit(physicsGLB())

    expect(warnings.join('\n')).toContain('a group carries no geometry')
    expect(code).not.toMatch(/<RigidBody[^>]*>\s*<TresGroup/)
  })

  it('warns about a body under a transform, which rapier places as if it were not there', async () => {
    const { warnings } = await emit(physicsGLB())

    expect(warnings.join('\n')).toContain('Crate-rigid sits under Props')
  })

  it('warns when the flag finds no suffix to act on', async () => {
    const { warnings } = await emit(simpleGLB())

    expect(warnings.join('\n')).toContain('No node in this model names a collider')
  })

  it('hands a batched body its geometry back, since an Instance carries none', async () => {
    const { code } = await emit(physicsGLB(), { instance: true })

    expect(code).toMatch(
      /<RigidBody type="dynamic" collider="convexHull" :position="\[0, 4, 0\]">\s*<Instance batch="[^"]+" \/>\s*<TresMesh :geometry="nodes\['Can_A-rigid'\]\.geometry" :visible="false" \/>\s*<\/RigidBody>/,
    )
  })

  it('scales the proxy with the Instance, since rapier sizes the collider off it', async () => {
    const { code } = await emit(physicsGLB(), { instance: true })

    expect(code).toMatch(
      /<Instance batch="[^"]+" :scale="2" \/>\s*<TresMesh :geometry="nodes\['Can_A-rigid001'\]\.geometry" :visible="false" :scale="2" \/>/,
    )
  })

  it('leaves shadow flags off a proxy that never draws', async () => {
    const { code } = await emit(physicsGLB(), { shadows: true })

    expect(code).not.toContain(`<TresMesh cast-shadow receive-shadow :geometry="nodes['Stairs_Collision-convcolonly']`)
  })
})
