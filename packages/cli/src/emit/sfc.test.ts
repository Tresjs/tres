import type { EmitOptions } from './sfc'
import { describe, expect, it } from 'vitest'
import { buildIR } from '../gltf/build-ir'
import { loadGLTF } from '../gltf/load'
import {
  clipOnlyGLB,
  collidingNamesGLB,
  exporterNamedGLB,
  lightAndCameraGLB,
  morphAndMetaGLB,
  nestedGLB,
  objectAnimatedGLB,
  repeatedGeometryGLB,
  simpleGLB,
  sketchfabGLB,
  skinnedGLB,
  skinnedNoClipsGLB,
} from '../gltf/__fixtures__/scenes'
import { emitSFC } from './sfc'

async function emit(glb: Promise<ArrayBuffer>, options: Partial<EmitOptions> = {}) {
  const ir = buildIR(await loadGLTF(await glb))
  return emitSFC(ir, { url: '/models/robot.glb', ...options })
}

/** The `--animations` path: the model in one file, the clips in others. */
async function emitWithClips(
  glb: Promise<ArrayBuffer>,
  sources: { path: string, glb: Promise<ArrayBuffer> }[],
  options: Partial<EmitOptions> = {},
) {
  const ir = buildIR(
    await loadGLTF(await glb),
    await Promise.all(sources.map(async source => ({ path: source.path, gltf: await loadGLTF(await source.glb) }))),
  )

  return {
    ir,
    ...emitSFC(ir, {
      url: '/models/dummy.glb',
      animationURLs: sources.map(source => `/clips/${source.path.split('/').pop()}`),
      ...options,
    }),
  }
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

    expect(code).toContain('defineExpose({ nodes, materials, isReady })')
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
    expect(code).toContain('defineExpose({ nodes, materials, actions, isReady })')
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

    expect(code).toContain(`import type { AnimationAction, AnimationClip, Bone, Group, MeshStandardMaterial, Object3D, SkinnedMesh } from 'three'`)
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
      animationSources: [],
      clips: [],
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
      import { ref, watch } from 'vue'

      interface ModelNodes {
        'AuxScene': Group
        'Scene': Object3D
        'Model-Toy-Rocket': Object3D
        'Body': Mesh
      }

      interface ModelMaterials {
        'Autumm orange': MeshStandardMaterial
      }

      const emit = defineEmits<{
        ready: [{ nodes: ModelNodes, materials: ModelMaterials }]
      }>()

      defineSlots<{
        'Body'?: (props: { node: Mesh, material: MeshStandardMaterial }) => any
        'Model-Toy-Rocket'?: (props: { node: Object3D }) => any
      }>()

      const { state, nodes, materials, isLoading } = useGLTF<ModelNodes, ModelMaterials>('/models/robot.glb')

      const isReady = ref(false)
      watch(
        () => !isLoading.value
          && state.value !== null,
        (ready) => {
          if (!ready) {
            isReady.value = false
            return
          }
          if (isReady.value) { return }
          isReady.value = true
          emit('ready', { nodes: nodes.value, materials: materials.value })
        },
        { flush: 'post', immediate: true },
      )

      defineExpose({ nodes, materials, isReady })
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

  describe('--animations', () => {
    it('loads every clip file beside the model', async () => {
      const { code } = await emitWithClips(skinnedNoClipsGLB(), [
        { path: 'clips/Idle.glb', glb: clipOnlyGLB('Idle') },
        { path: 'clips/Running_A.glb', glb: clipOnlyGLB('Running_A') },
      ])

      expect(code).toContain(`const { state: idle, isLoading: idleLoading } = useGLTF('/clips/Idle.glb')`)
      expect(code).toContain(`const { state: runningA, isLoading: runningALoading } = useGLTF('/clips/Running_A.glb')`)
    })

    // Real clip libraries are named `Rig_Medium_MovementBasic`; lowercasing past the first
    // letter of each part would read as `rigMediumMovementbasic`.
    it('keeps the casing the filename authored', async () => {
      const { code } = await emitWithClips(skinnedNoClipsGLB(), [
        { path: 'clips/Rig_Medium_MovementBasic.glb', glb: clipOnlyGLB('Walking_A') },
      ])

      expect(code).toContain('const { state: rigMediumMovementBasic, isLoading: rigMediumMovementBasicLoading } =')
    })

    it('merges the clips in one array, model first', async () => {
      const { code } = await emitWithClips(skinnedGLB(), [{ path: 'clips/Run.glb', glb: clipOnlyGLB('Run') }])

      expect(code).toContain([
        '  return [',
        '    ...(state.value?.animations ?? []),',
        '    ...(run.value?.animations ?? []),',
        '  ]',
      ].join('\n'))
    })

    // A clip library is a fraction of the size of the model, so its files land first. A mixer
    // handed clips before the tree exists binds every track to nothing and caches the miss.
    it('holds the clips back until the model they drive has rendered', async () => {
      const { code } = await emitWithClips(skinnedNoClipsGLB(), [{ path: 'clips/Idle.glb', glb: clipOnlyGLB('Idle') }])

      expect(code).toContain('if (isLoading.value) {')
      expect(code).toContain('return []')
    })

    it('never merges clips out of a state the model has none in', async () => {
      const { code } = await emitWithClips(skinnedNoClipsGLB(), [{ path: 'clips/Idle.glb', glb: clipOnlyGLB('Idle') }])

      // `state` is still destructured — the ready gate reads it to tell a failed load from a
      // finished one — but a model with no clips of its own contributes none to the array.
      expect(code).toContain('    ...(idle.value?.animations ?? []),')
      expect(code).not.toContain('state.value?.animations')
    })

    it('unions the clip names across every file', async () => {
      const { code } = await emitWithClips(skinnedGLB(), [
        { path: 'clips/Run.glb', glb: clipOnlyGLB('Run') },
        { path: 'clips/Jump.glb', glb: clipOnlyGLB('Jump') },
      ])

      expect(code).toContain(`type ActionName\n  = | 'Idle'\n    | 'Run'\n    | 'Jump'`)
    })

    it('wires useAnimations for a model that carries no clips of its own', async () => {
      const { code } = await emitWithClips(skinnedNoClipsGLB(), [{ path: 'clips/Idle.glb', glb: clipOnlyGLB('Idle') }])

      expect(code).toContain(`import { useAnimations, useGLTF } from '@tresjs/cientos'`)
      expect(code).toContain('const { actions } = useAnimations<AnimationClip, ActionName>(animations, modelRef)')
      expect(code).toContain('<TresGroup ref="modelRef" :dispose="null">')
    })

    it('keeps the name of a node only an external clip drives', async () => {
      const { code } = await emitWithClips(repeatedGeometryGLB(), [
        { path: 'clips/Spin.glb', glb: clipOnlyGLB('Spin', ['Rock_0']) },
      ])

      expect(code).toContain('<TresMesh name="Rock_0"')
      expect(code).not.toContain('<TresMesh name="Rock_1"')
    })

    it('asks for the decoder per file, since only some of them are compressed', async () => {
      const { ir } = await emitWithClips(skinnedNoClipsGLB(), [{ path: 'clips/Idle.glb', glb: clipOnlyGLB('Idle') }])
      ir.animationSources[0].draco = true

      const { code } = emitSFC(ir, { url: '/models/dummy.glb', animationURLs: ['/clips/Idle.glb'] })

      expect(code).toContain(`const { state: idle, isLoading: idleLoading } = useGLTF('/clips/Idle.glb', { draco: true })`)
      expect(code).toContain(`useGLTF<ModelNodes, ModelMaterials>('/models/dummy.glb')`)
    })

    it('names a file that is not an identifier after its position instead', async () => {
      const { code } = await emitWithClips(skinnedNoClipsGLB(), [
        { path: 'clips/1H_Melee_Chop.glb', glb: clipOnlyGLB('1H_Melee_Chop') },
      ])

      expect(code).toContain(`const { state: clips0, isLoading: clips0Loading } = useGLTF('/clips/1H_Melee_Chop.glb')`)
    })

    it('never shadows an identifier the generated file already owns', async () => {
      const { code } = await emitWithClips(skinnedNoClipsGLB(), [
        { path: 'clips/nodes.glb', glb: clipOnlyGLB('Idle') },
      ])

      expect(code).not.toContain('const { state: nodes,')
      expect(code).toContain('const { state: nodes0, isLoading: nodes0Loading }')
    })

    /**
     * `emit`, `isReady` and the vue imports are declared by the ready wiring, so a clip file
     * named after one of them would redeclare it. `const { state: emit } = …` beside
     * `const emit = defineEmits<…>()` does not compile.
     */
    it.each(['emit', 'isReady', 'watch', 'ref', 'computed', 'useGLTF'])(
      'never shadows %s, which the ready wiring declares',
      async (owned) => {
        const { code } = await emitWithClips(skinnedNoClipsGLB(), [
          { path: `clips/${owned}.glb`, glb: clipOnlyGLB('Idle') },
        ])

        expect(code).not.toContain(`const { state: ${owned},`)
        expect(code).toContain(`const { state: ${owned}0, isLoading: ${owned}0Loading }`)
      },
    )

    it('leaves out a file whose clips reach nothing in this model', async () => {
      const { code } = await emitWithClips(skinnedGLB(), [
        { path: 'clips/Wrong.glb', glb: clipOnlyGLB('Wrong', ['mixamorigHips']) },
      ])

      // Loading a file to merge nothing out of it is a request for nothing.
      expect(code).not.toContain('/clips/Wrong.glb')
      expect(code).toContain('const animations = computed(() => state.value?.animations ?? [])')
    })
  })

  describe('@ready / isReady', () => {
    it('emits ready and exposes isReady on a static model', async () => {
      const { code } = await emit(simpleGLB())

      expect(code).toContain('const emit = defineEmits<{')
      expect(code).toContain('ready: [{ nodes: ModelNodes, materials: ModelMaterials }]')
      expect(code).toContain('const isReady = ref(false)')
      expect(code).toContain(`emit('ready', { nodes: nodes.value, materials: materials.value })`)
      expect(code).toContain('defineExpose({ nodes, materials, isReady })')
    })

    it('gates static ready on the load and resets it on a refetch', async () => {
      const { code } = await emit(simpleGLB())

      expect(code).toContain([
        '  (ready) => {',
        '    if (!ready) {',
        '      isReady.value = false',
        '      return',
        '    }',
        '    if (isReady.value) { return }',
        '    isReady.value = true',
      ].join('\n'))
    })

    /**
     * `isLoading` is cleared in a `finally`, so a 404 clears it exactly like a success. Only
     * `state` tells the two apart: it is set on success and nulled on every refetch, so a
     * failed load must never reach a `ready` handler with empty nodes and materials.
     */
    it('never calls a static model ready when the load failed', async () => {
      const { code } = await emit(simpleGLB())

      expect(code).toContain('const { state, nodes, materials, isLoading } = useGLTF<ModelNodes, ModelMaterials>')
      expect(code).toContain([
        '  () => !isLoading.value',
        '    && state.value !== null,',
      ].join('\n'))
    })

    it('waits for every clip source and bound actions before an animated model is ready', async () => {
      const { code } = await emitWithClips(skinnedNoClipsGLB(), [
        { path: 'clips/Rig_Medium_General.glb', glb: clipOnlyGLB('Idle_A') },
        { path: 'clips/Rig_Medium_MovementBasic.glb', glb: clipOnlyGLB('Jump_Start') },
      ])

      expect(code).toContain('const { state: rigMediumGeneral, isLoading: rigMediumGeneralLoading } =')
      expect(code).toContain('const { state: rigMediumMovementBasic, isLoading: rigMediumMovementBasicLoading } =')
      expect(code).toContain([
        '  () => !isLoading.value',
        '    && !rigMediumGeneralLoading.value',
        '    && !rigMediumMovementBasicLoading.value',
        '    && state.value !== null',
        '    && Object.keys(actions).length > 0,',
      ].join('\n'))
      expect(code).toContain('ready: [{ nodes: ModelNodes, materials: ModelMaterials, actions: Record<ActionName, AnimationAction | undefined> }]')
      expect(code).toContain(`emit('ready', { nodes: nodes.value, materials: materials.value, actions })`)
      expect(code).toContain('defineExpose({ nodes, materials, actions, isReady })')
    })

    /**
     * The actions bind against the root group, which stays mounted whatever the load did, so
     * clips from a `--animations` file populate `actions` even when the model itself 404s.
     * Without the `state` term the handler would fire on a model that never arrived.
     */
    it('never calls an animated model ready when only its clip files loaded', async () => {
      const { code } = await emitWithClips(skinnedNoClipsGLB(), [
        { path: 'clips/Idle.glb', glb: clipOnlyGLB('Idle') },
      ])

      expect(code).toContain('&& state.value !== null')
      expect(code).toContain('const { state, nodes, materials, isLoading } = useGLTF<ModelNodes, ModelMaterials>')
    })

    /**
     * `vue/define-macros-order` wants `defineEmits` above `defineSlots`, and a generated file
     * the consumer's linter rewrites is a generated file that fights them on every run.
     */
    it('declares the emits above the slots, the order the linter wants', async () => {
      const { code } = await emit(nestedGLB(), { slots: 'all' })

      expect(code.indexOf('defineEmits<{')).toBeLessThan(code.indexOf('defineSlots<{'))
    })

    it('reads only the model load when the animated model carries its own clips', async () => {
      const { code } = await emit(skinnedGLB())

      expect(code).toContain([
        '  () => !isLoading.value',
        '    && state.value !== null',
        '    && Object.keys(actions).length > 0,',
      ].join('\n'))
      expect(code).toContain(`import type { AnimationAction, AnimationClip,`)
    })
  })
})
