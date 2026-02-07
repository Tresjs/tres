import * as THREE from 'three'
import { extend } from '../../core/catalogue'
import { initializeSceneCreator } from './util'
import { defineComponent, h } from 'vue'
import { isBufferGeometry, isFog, isGroup, isMaterial, isMesh } from '../../utils/is'
import type { Mesh } from 'three'

describe('hierarchy', async () => {
  extend(THREE)

  const mesh = new THREE.Mesh()
  mesh.uuid = 'mesh1'

  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshBasicMaterial()

  const Component = defineComponent({
    template: `
      <TresGroup>
        <TresMesh uuid="mesh0">
          <TresBoxGeometry />
          <TresMeshBasicMaterial />
        </TresMesh>

        <primitive :object="mesh" />

        <TresMesh uuid="mesh2">
          <primitive :object="geometry" />
          <TresMeshBasicMaterial />
        </TresMesh>

        <TresMesh uuid="mesh3">
          <TresBoxGeometry />
          <primitive :object="material" />
        </TresMesh>
      </TresGroup>
      <TresFog />
  `,
    setup: () => ({
      mesh,
      geometry,
      material,
    }),
  })

  const { createScene } = await initializeSceneCreator()
  const { sceneWrapper, context } = await createScene(() => h(Component))
  const scene = context.scene.value

  it('adds scene fog', () => {
    expect(isFog(scene.fog)).toBe(true)
  })

  it('adds a group and its children', () => {
    expect(scene.children.length).toBe(1)

    const group = scene.children[0]
    expect(isGroup(scene.children[0])).toBe(true)
    expect(group.children.length).toBe(4)
  })

  const group = scene.children[0]
  if (!isGroup(group)) { throw new Error('never') }

  const checkMesh = (mesh: Mesh, uuid: string) => {
    expect(isMesh(mesh)).toBe(true)
    if (!isMesh(mesh)) { throw new Error('never') } // to satisfy typescript

    expect(mesh.children.length).toBe(0)
    expect(isMaterial(mesh.material!)).toBe(true)
    expect(isBufferGeometry(mesh.geometry!)).toBe(true)
    expect(mesh.uuid).toBe(uuid)
  }

  [
    'adds a mesh and its children',
    'adds a primitive and its children',
    'adds a mesh and its primitive geometry',
    'adds a mesh and its primitive material',
  ].forEach((test, index) =>
    it(test, () => checkMesh(group.children[index] as Mesh, `mesh${index}`)))

  afterAll(() => sceneWrapper.unmount())
})
