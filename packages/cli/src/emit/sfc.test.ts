import type { EmitOptions } from './sfc'
import { describe, expect, it } from 'vitest'
import { buildIR } from '../gltf/build-ir'
import { loadGLTF } from '../gltf/load'
import {
  collidingNamesGLB,
  exporterNamedGLB,
  lightAndCameraGLB,
  morphAndMetaGLB,
  nestedGLB,
  objectAnimatedGLB,
  simpleGLB,
  sketchfabGLB,
  skinnedGLB,
} from '../gltf/__fixtures__/scenes'
import { emitSFC } from './sfc'

async function emit(glb: Promise<ArrayBuffer>, options: Partial<EmitOptions> = {}) {
  const ir = buildIR(await loadGLTF(await glb))
  return emitSFC(ir, { url: '/models/robot.glb', ...options })
}

describe('emitSFC', () => {
  it('loads the model from the given url', async () => {
    const { code } = await emit(simpleGLB())

    expect(code).toContain(`import { useGLTF } from '@tresjs/cientos'`)
    expect(code).toContain(`useGLTF<ModelNodes, ModelMaterials>('/models/robot.glb')`)
  })

  it('guards the tree until the model has loaded', async () => {
    const { code } = await emit(simpleGLB())

    expect(code).toContain('<template v-if="!isLoading">')
  })

  it('exposes nodes and materials to the parent', async () => {
    const { code } = await emit(simpleGLB())

    expect(code).toContain('defineExpose({ nodes, materials })')
  })

  it('binds geometry and material on a mesh', async () => {
    const { code } = await emit(nestedGLB())

    expect(code).toContain(':geometry="nodes.Body.geometry"')
    expect(code).toContain(':material="materials[\'Autumm orange\']"')
  })

  it('uses bracket access for node keys that are not identifiers', async () => {
    const { code } = await emit(nestedGLB(), { keepGroups: true })

    expect(code).toContain(`:node="nodes['Model-Toy-Rocket']"`)
  })

  it('wraps authored nodes in slots carrying node and material', async () => {
    const { code } = await emit(nestedGLB())

    expect(code).toContain('<slot name="Body" :node="nodes.Body" :material="materials[\'Autumm orange\']">')
  })

  it('emits no slots with --slots none', async () => {
    const { code, slots } = await emit(nestedGLB(), { slots: 'none' })

    expect(code).not.toContain('<slot')
    expect(slots).toEqual([])
  })

  it('skips exporter noise names with --slots named', async () => {
    const { slots } = await emit(exporterNamedGLB(), { slots: 'named' })

    expect(slots).toEqual([])
  })

  it('slots exporter noise names with --slots all', async () => {
    const { slots } = await emit(exporterNamedGLB(), { slots: 'all' })

    expect(slots).toEqual(['Object_2', 'Object_3'])
  })

  it('treats known exporter wrappers as noise even when they carry a transform', async () => {
    const { slots } = await emit(sketchfabGLB(), { slots: 'named' })

    expect(slots).toEqual([])
  })

  it('still warns when the only slot is a wrapper group', async () => {
    const { warnings } = await emit(sketchfabGLB(), { slots: 'named' })

    expect(warnings.join('\n')).toContain('--slots all')
  })

  it('warns when named mode filters every candidate away', async () => {
    const { warnings } = await emit(exporterNamedGLB(), { slots: 'named' })

    expect(warnings.join('\n')).toContain('--slots all')
  })

  it('does not warn about slots when the model has some', async () => {
    const { warnings } = await emit(nestedGLB(), { slots: 'named' })

    expect(warnings.join('\n')).not.toContain('--slots all')
  })

  it('records the command that produced the file', async () => {
    const { code } = await emit(simpleGLB(), { command: 'tres gltf robot.glb --shadows' })

    expect(code).toContain('tres gltf robot.glb --shadows')
  })

  it('names slots after the key the parent overrides', async () => {
    const { code, slots } = await emit(collidingNamesGLB(), { slots: 'all' })

    expect(slots).toContain('foobar_1')
    expect(code).toContain('<slot name="foobar_1"')
  })

  it('enables the draco decoder only when the model needs it', async () => {
    const { code } = await emit(simpleGLB())

    expect(code).not.toContain('draco')
  })

  it('passes lights and cameras through as primitives', async () => {
    const { code } = await emit(lightAndCameraGLB())

    expect(code).toContain('<primitive :object="nodes.Sun" />')
    expect(code).toContain('<primitive :object="nodes.Shot" />')
  })

  it('binds the skeleton of a skinned mesh and keeps bones as primitives', async () => {
    const { code } = await emit(skinnedGLB())

    expect(code).toContain('<TresSkinnedMesh')
    expect(code).toContain(':skeleton="nodes.Body.skeleton"')
    expect(code).toContain('<primitive :object="nodes.handl" />')
  })

  it('adds shadow flags to meshes with --shadows', async () => {
    const { code } = await emit(nestedGLB(), { shadows: true })

    expect(code).toContain('<TresMesh cast-shadow receive-shadow')
  })

  it('leaves name attributes out unless --keepnames', async () => {
    const plain = await emit(nestedGLB())
    const kept = await emit(nestedGLB(), { keepNames: true })

    // The slot itself is always `name="Body"`; this is about the element attribute.
    expect(plain.code).not.toContain('<TresMesh name="Body"')
    expect(kept.code).toContain('<TresMesh name="Body"')
  })

  it('drops pass-through groups but keeps ones that carry a transform', async () => {
    const { code } = await emit(nestedGLB())

    expect(code).not.toContain('name="Scene"')
    expect(code).toContain(':position="[1, 0, -3]"')
  })

  it('keeps every group with --keepgroups', async () => {
    const { code } = await emit(exporterNamedGLB(), { keepGroups: true, keepNames: true })

    expect(code).toContain('name="Scene"')
  })

  it('rounds transforms to --precision digits', async () => {
    const coarse = await emit(nestedGLB())
    const fine = await emit(nestedGLB(), { precision: 4 })

    expect(coarse.code).toContain(':rotation="[0, 1.57, 0]"')
    expect(fine.code).toContain(':rotation="[0, 1.5708, 0]"')
  })

  it('collapses a uniform scale to a single number', async () => {
    const { code } = await emit(nestedGLB())

    expect(code).toContain(':scale="2"')
  })

  it('emits userData only with --meta', async () => {
    const plain = await emit(morphAndMetaGLB())
    const withMeta = await emit(morphAndMetaGLB(), { meta: true })

    expect(plain.code).not.toContain('user-data')
    expect(withMeta.code).toContain(':user-data="')
    expect(withMeta.code).toContain('collider')
  })

  it('generates from a subtree with --root', async () => {
    const { code } = await emit(nestedGLB(), { root: 'Model-Toy-Rocket' })

    expect(code).toContain(':geometry="nodes.Body.geometry"')
    expect(code).not.toContain(':position="[1, 0, -3]"')
  })

  it('rejects a --root that is not in the model', async () => {
    await expect(emit(nestedGLB(), { root: 'Nope' })).rejects.toThrow(/Nope/)
  })

  it('wires useAnimations when the model has clips', async () => {
    const { code } = await emit(skinnedGLB())

    expect(code).toContain(`import { useAnimations, useGLTF } from '@tresjs/cientos'`)
    expect(code).toContain('const { actions } = useAnimations<AnimationClip, ActionName>(animations, modelRef)')
    expect(code).toContain('defineExpose({ nodes, materials, actions })')
  })

  // A mixer resolves a track against a node name in the rendered tree, so the nodes a clip
  // drives keep theirs whatever --keepnames says. Skeletal clips escape this because bones
  // are passed through as the parsed object, which is why it went unnoticed.
  it('keeps the name of every node a clip drives', async () => {
    const { code } = await emit(objectAnimatedGLB())

    expect(code).toContain('<TresMesh name="Rock_0"')
    expect(code).toContain('<TresGroup name="Rotor">')
  })

  it('leaves the names of nodes no clip drives alone', async () => {
    const { code } = await emit(objectAnimatedGLB())

    expect(code).toContain('<TresMesh :geometry="nodes.Rock_1.geometry"')
    expect(code).not.toContain('<TresGroup name="Scene"')
  })

  it('declares the type of every node the model names', async () => {
    const { code } = await emit(skinnedGLB())

    expect(code).toContain('interface ModelNodes {')
    expect(code).toContain('Body: SkinnedMesh')
    expect(code).toContain('handl: Bone')
  })

  it('declares the type of every material', async () => {
    const { code } = await emit(skinnedGLB())

    expect(code).toContain('interface ModelMaterials {')
    expect(code).toContain('Skin: MeshStandardMaterial')
  })

  it('quotes every key in a block once one of them needs quoting', async () => {
    const { code } = await emit(nestedGLB(), { keepGroups: true })

    // Matches `quote-props: consistent-as-needed`, so a lint --fix leaves the file be.
    expect(code).toContain(`'Model-Toy-Rocket': Object3D`)
    expect(code).toContain(`'Scene': Object3D`)
  })

  it('imports the three classes it names, as types', async () => {
    const { code } = await emit(skinnedGLB())

    expect(code).toContain(`import type { AnimationClip, Bone, Group, MeshStandardMaterial, Object3D, SkinnedMesh } from 'three'`)
  })

  it('hands the declared shapes to useGLTF', async () => {
    const { code } = await emit(skinnedGLB())

    expect(code).toContain(`useGLTF<ModelNodes, ModelMaterials>('/models/robot.glb')`)
  })

  it('names the clips in a union so actions are not string-indexed', async () => {
    const { code } = await emit(skinnedGLB())

    // One clip per line, `=` leading, matching how core writes its own unions.
    expect(code).toContain('type ActionName\n  = | \'Idle\'')
  })

  it('types the slot props so an override knows what it is given', async () => {
    const { code } = await emit(skinnedGLB())

    expect(code).toContain('defineSlots<{')
    expect(code).toContain('Body?: (props: { node: SkinnedMesh, material: MeshStandardMaterial }) => any')
  })

  it('quotes declared keys that are not identifiers', async () => {
    const { code } = await emit(nestedGLB(), { keepGroups: true })

    expect(code).toContain(`'Model-Toy-Rocket': Object3D`)
  })

  it('widens a type three does not export, rather than importing a name that does not exist', () => {
    const { code } = emitSFC({
      root: { name: 'Scene', type: 'Object3D', tag: 'TresGroup', children: [
        { name: 'Odd', type: 'MeshWeirdMaterialThing', tag: 'TresMesh', geometry: true, material: 'Paint', children: [] },
      ] },
      nodes: { Odd: { type: 'MeshWeirdMaterialThing', isVarName: true } },
      materials: { Paint: { type: 'ImaginaryMaterial', isVarName: true } },
      animations: [],
      animated: [],
      draco: false,
      instances: [],
      warnings: [],
    }, { url: '/models/robot.glb' })

    expect(code).toContain('Odd: Object3D')
    expect(code).toContain('Paint: Material')
    expect(code).not.toContain('MeshWeirdMaterialThing')
    expect(code).not.toContain('ImaginaryMaterial')
  })

  it('leaves the action union out when there are no clips', async () => {
    const { code } = await emit(simpleGLB())

    expect(code).not.toContain('ActionName')
  })

  it('declares no slot types with --slots none', async () => {
    const { code } = await emit(skinnedGLB(), { slots: 'none' })

    expect(code).not.toContain('defineSlots')
  })

  it('keeps the animated root mounted so its ref binds before the clips arrive', async () => {
    const { code } = await emit(skinnedGLB())

    // `ref` on a `v-if`ed element stays undefined until the model renders, which is
    // one flush after the clips land: useAnimations would build a mixer with no root.
    expect(code).toContain('<TresGroup ref="modelRef" :dispose="null">')
    expect(code).toContain('<template v-if="!isLoading">')
    expect(code).not.toContain('ref="modelRef" v-if')
  })

  it('leaves animation wiring out when there are no clips', async () => {
    const { code } = await emit(simpleGLB())

    expect(code).not.toContain('useAnimations')
    expect(code).not.toContain('modelRef')
  })

  it('produces a stable, readable file', async () => {
    const { code } = await emit(nestedGLB(), { shadows: true, command: 'tres gltf rocket.glb --shadows' })

    expect(code).toMatchInlineSnapshot(`
      "<script setup lang="ts">
      /*
      Auto-generated by @tresjs/cli. Do not edit.
      Command: tres gltf rocket.glb --shadows
      Override the named slots from the parent instead; regenerating keeps your overrides.
      */
      import type { Group, Mesh, MeshStandardMaterial, Object3D } from 'three'
      import { useGLTF } from '@tresjs/cientos'

      interface ModelNodes {
        'AuxScene': Group
        'Scene': Object3D
        'Model-Toy-Rocket': Object3D
        'Body': Mesh
      }

      interface ModelMaterials {
        'Autumm orange': MeshStandardMaterial
      }

      defineSlots<{
        'Body'?: (props: { node: Mesh, material: MeshStandardMaterial }) => any
        'Model-Toy-Rocket'?: (props: { node: Object3D }) => any
      }>()

      const { nodes, materials, isLoading } = useGLTF<ModelNodes, ModelMaterials>('/models/robot.glb')

      defineExpose({ nodes, materials })
      </script>

      <template>
        <TresGroup :dispose="null">
          <template v-if="!isLoading">
            <slot name="Model-Toy-Rocket" :node="nodes['Model-Toy-Rocket']">
              <TresGroup :position="[1, 0, -3]">
                <slot name="Body" :node="nodes.Body" :material="materials['Autumm orange']">
                  <TresMesh cast-shadow receive-shadow :geometry="nodes.Body.geometry" :material="materials['Autumm orange']" :rotation="[0, 1.57, 0]" :scale="2" />
                </slot>
              </TresGroup>
            </slot>
          </template>
        </TresGroup>
      </template>
      "
    `)
  })

  it('wires morph targets when a mesh has them', async () => {
    const { code } = await emit(morphAndMetaGLB())

    expect(code).toContain(':morph-target-dictionary="nodes.Face.morphTargetDictionary"')
    expect(code).toContain(':morph-target-influences="nodes.Face.morphTargetInfluences"')
  })
})
