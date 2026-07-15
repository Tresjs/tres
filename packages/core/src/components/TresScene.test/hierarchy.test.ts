import * as THREE from 'three'
import { extend } from '../../core/catalogue'
import { initializeSceneCreator } from './util'
import { defineComponent, h } from 'vue'
import { isBufferGeometry, isFog, isGroup, isMaterial, isMesh } from '../../utils/is'
import type { Mesh } from 'three'
import type { TresContext } from '../../composables'

describe('hierarchy', () => {
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

  let scene: TresContext['scene']['value']
  let sceneWrapper: { unmount: () => void }
  let group: THREE.Group

  beforeAll(async () => {
    const { createScene } = await initializeSceneCreator()
    const result = await createScene(() => h(Component))
    sceneWrapper = result.sceneWrapper
    scene = result.context.scene.value
    group = scene.children[0] as THREE.Group
  })

  it('adds scene fog', () => {
    expect(isFog(scene.fog)).toBe(true)
  })

  it('adds a group and its children', () => {
    expect(scene.children.length).toBe(1)
    expect(isGroup(group)).toBe(true)
    expect(group.children.length).toBe(4)
  })

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
