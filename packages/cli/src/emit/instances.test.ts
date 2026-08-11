import type { EmitOptions } from './sfc'
import { describe, expect, it } from 'vitest'
import { buildIR } from '../gltf/build-ir'
import { loadGLTF } from '../gltf/load'
import {
  mixedInstancingGLB,
  morphAndMetaGLB,
  nestedGLB,
  objectAnimatedGLB,
  repeatedGeometryGLB,
  skinnedGLB,
} from '../gltf/__fixtures__/scenes'
import { emitSFC } from './sfc'

async function emit(glb: Promise<ArrayBuffer>, options: Partial<EmitOptions> = {}) {
  const ir = buildIR(await loadGLTF(await glb))
  return emitSFC(ir, { url: '/models/rocks.glb', name: 'Rocks', instance: true, ...options })
}

describe('--instance', () => {
  it('renders every mesh in a bucket against one batch key', async () => {
    const { code } = await emit(repeatedGeometryGLB())

    expect(code).toContain('<Instance batch="Rock_0" />')
    expect(code).toContain('<Instance batch="Rock_0" :position="[1, 0, 0]" />')
    expect(code).toContain('<Instance batch="Rock_0" :position="[2, 0, 0]" />')
  })

  it('allocates one batch per bucket in the provider', async () => {
    const { instances } = await emit(repeatedGeometryGLB())

    expect(instances).toContain('const meshes = computed(() => ({')
    expect(instances).toContain('  Rock_0: nodes.value.Rock_0,')
  })

  it('loads the model once, in the provider', async () => {
    const { code, instances } = await emit(repeatedGeometryGLB())

    expect(instances).toContain(`useGLTF<ModelNodes, ModelMaterials>('/models/rocks.glb')`)
    expect(code).not.toContain('useGLTF')
  })

  it('hands the parse to the model under a key named after the model', async () => {
    const { code, instances } = await emit(repeatedGeometryGLB())

    expect(instances).toContain(`provide('tres-gltf:Rocks', { nodes, materials })`)
    expect(code).toContain(`const context = inject<ModelContext>('tres-gltf:Rocks')`)
    expect(code).toContain('const { nodes, materials } = context')
  })

  it('imports the context shape rather than declaring it twice', async () => {
    const { code, instances } = await emit(repeatedGeometryGLB())

    expect(instances).toContain('export interface ModelContext {')
    expect(code).toContain(`import type { ModelContext } from './Rocks.instances.gen.vue'`)
  })

  it('says so rather than rendering nothing when the model is used on its own', async () => {
    const { code } = await emit(repeatedGeometryGLB())

    expect(code).toContain(`throw new Error('<Rocks> renders instanced meshes, so it only works inside <RocksInstances>.')`)
  })

  it('leaves a mesh nothing shares a geometry with alone', async () => {
    const { code } = await emit(mixedInstancingGLB())

    expect(code).toContain('<Instance batch="Rock_0"')
    expect(code).toContain(':geometry="nodes.Ground.geometry"')
    expect(code).not.toContain('<Instance batch="Ground"')
  })

  it('batches even the meshes that appear once with --instanceall', async () => {
    const { code, instances } = await emit(mixedInstancingGLB(), { instance: false, instanceAll: true })

    expect(code).toContain('<Instance batch="Ground"')
    expect(instances).toContain('  Ground: nodes.value.Ground,')
  })

  it('falls back to a single file when no two meshes share anything', async () => {
    const { code, instances, warnings } = await emit(nestedGLB())

    expect(instances).toBeUndefined()
    expect(code).toContain('useGLTF')
    expect(warnings).toContain(
      'Nothing in this model can be batched: no two meshes share a geometry and material. Generated the plain component instead.',
    )
  })

  it('never batches a skinned mesh, whose skeleton a batch has nowhere to put', async () => {
    const { code, instances } = await emit(skinnedGLB(), { instanceAll: true })

    expect(instances).toBeUndefined()
    expect(code).toContain(':skeleton="nodes.Body.skeleton"')
  })

  it('never batches a mesh with morph targets', async () => {
    const { code, instances } = await emit(morphAndMetaGLB(), { instanceAll: true })

    expect(instances).toBeUndefined()
    expect(code).toContain(':morph-target-influences="nodes.Face.morphTargetInfluences"')
  })

  it('warns that a passed-through node cannot survive a second copy of the model', async () => {
    const { warnings } = await emit(mixedInstancingGLB())

    expect(warnings.join('\n')).toContain('Sun is passed through as the parsed object')
  })

  it('sets shadows on the batch, which draws for every instance at once', async () => {
    const { code, instances } = await emit(repeatedGeometryGLB(), { shadows: true })

    expect(instances).toContain('<Merged v-if="!isLoading" :meshes="meshes" :limit="limit" cast-shadow receive-shadow>')
    expect(code).not.toContain('cast-shadow')
  })

  // `batch` is the bucket's first node and the same for every copy in it, so the node's own
  // name has to ride alongside rather than replace it.
  it('keeps the batch key and the node name apart under --keepnames', async () => {
    const { code } = await emit(repeatedGeometryGLB(), { keepNames: true })

    expect(code).toContain('<Instance batch="Rock_0" name="Rock_1" :position="[1, 0, 0]" />')
    expect(code).not.toContain('<Instance batch="Rock_1"')
  })

  it('leaves the node name off when nothing asks for it', async () => {
    const { code } = await emit(repeatedGeometryGLB())

    expect(code).not.toContain('<Instance batch="Rock_0" name=')
  })

  // Batching cannot cost a clip its target: the batch reads each instance's world matrix
  // every frame, so a named instance is one a mixer can still drive.
  it('names a batched instance a clip drives, without --keepnames', async () => {
    const { code } = await emit(objectAnimatedGLB(), { instance: false, instanceAll: true })

    expect(code).toContain('<Instance batch="Rock_0" name="Rock_0" />')
    expect(code).toContain('<TresGroup name="Rotor">')
    expect(code).toContain('<Instance batch="Rock_0" :position="[2, 0, 0]" />')
  })

  it('hands an override the batch it would be leaving', async () => {
    const { code } = await emit(repeatedGeometryGLB(), { slots: 'all' })

    expect(code).toContain(
      '<slot name="Rock_1" :batch="\'Rock_0\'" :geometry="nodes.Rock_1.geometry" :material="materials.Rock" :position="[1, 0, 0]">',
    )
    expect(code).toContain(
      '  Rock_1?: (props: { batch: string, geometry: BufferGeometry, material: MeshStandardMaterial, position: [number, number, number] }) => any',
    )
  })

  // The bucket is keyed by its first node, so `<Instance batch="Rock_1">` would join nothing
  // and render nothing. An override can only get it right if the slot hands the key over.
  it('hands an override the batch key rather than leaving it to guess the slot name', async () => {
    const { code } = await emit(repeatedGeometryGLB(), { slots: 'all' })

    expect(code).toContain('<slot name="Rock_2" :batch="\'Rock_0\'"')
    expect(code).not.toContain(':batch="\'Rock_2\'"')
  })

  it('tells the parent how to override a batched slot without leaving the batch', async () => {
    const { code } = await emit(repeatedGeometryGLB(), { slots: 'all' })

    expect(code).toContain('<template #Rock_0="{ batch }"><Instance :batch color="red" /></template>')
    expect(code).toContain(`import { Instance } from '@tresjs/cientos'`)
  })

  it('leaves the header alone when nothing batched got a slot', async () => {
    const { code } = await emit(repeatedGeometryGLB(), { slots: 'none' })

    expect(code).not.toContain('hands you `batch`')
  })

  it('leaves the model to gate on the provider rather than loading again', async () => {
    const { code } = await emit(repeatedGeometryGLB())

    expect(code).not.toContain('isLoading')
  })

  it('exports the model shapes from the provider, so only one file declares them', async () => {
    const { code, instances } = await emit(repeatedGeometryGLB())

    expect(instances).toContain('export interface ModelNodes {')
    expect(instances).toContain('export interface ModelMaterials {')
    expect(code).not.toContain('interface ModelNodes {')
  })

  it('imports only the three classes its slots hand out', async () => {
    const { code } = await emit(repeatedGeometryGLB(), { slots: 'all' })

    expect(code).toContain(`import type { BufferGeometry, MeshStandardMaterial } from 'three'`)
  })

  it('points at the provider it was told would be written', async () => {
    const { code } = await emit(repeatedGeometryGLB(), { instancesModule: '../models/Rocks.instances.gen.vue' })

    expect(code).toContain(`from '../models/Rocks.instances.gen.vue'`)
  })
})
