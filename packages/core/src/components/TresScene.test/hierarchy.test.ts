import * as THREE from 'three'
import { extend } from '../../core/catalogue'
import { initializeSceneCreator } from './util'
import { defineComponent, h } from 'vue'
import { isBufferGeometry, isGroup, isMaterial, isMesh } from '../../utils/is'
import type { Mesh } from 'three'

describe('hierarchy', async () => {
  beforeAll(() => {
    extend(THREE)
  })

  it('instanciates and attaches three.js elements correctly', async () => {
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

    expect(scene.children.length).toBe(1)
    const group = scene.children[0]

    expect(isGroup(group)).toBe(true)

    const checkMesh = (mesh: Mesh, uuid: string) => {
      expect(isMesh(mesh)).toBe(true)
      if (!isMesh(mesh)) { throw new Error('never') } // to satisfy typescript

      expect(mesh.children.length).toBe(0)
      expect(isMaterial(mesh.material!)).toBe(true)
      expect(isBufferGeometry(mesh.geometry!)).toBe(true)
      expect(mesh.uuid).toBe(uuid)
    }

    expect(group.children.length).toBe(4)
    group.children.forEach((mesh, index) => checkMesh(mesh as Mesh, `mesh${index}`))

    sceneWrapper.unmount()
  })
})
