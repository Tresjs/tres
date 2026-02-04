import { defineComponent, h, nextTick, ref } from 'vue'
import { createScene } from './utils/scene'
import { beforeAll, describe, expect, it } from './utils/testing'
import { isBufferGeometry, isMaterial, isMesh } from '../utils/is'
import { extend } from '../core/catalogue'
import * as THREE from 'three'

describe('disposal', () => {
  beforeAll(() => {
    extend(THREE)
  })

  it('should dispose of a mesh, geometry and renderer when a scene is unmounted', async () => {
    const exists = ref(true)
    const VForBoxes = defineComponent({
      setup: () => ({ exists }),
      template: `
      <TresMesh v-if="exists" >
        <TresBoxGeometry />
        <TresMeshBasicMaterial />
      </TresMesh>
      `,
    })
    const { sceneWrapper, context } = await createScene(
      () => h(VForBoxes),
    )
    const mesh = context.scene.value.children[0]

    expect(isMesh(mesh)).toBe(true)
    if (!isMesh(mesh)) { return }

    expect(isBufferGeometry(mesh.geometry)).toBe(true)
    if (!isBufferGeometry(mesh.geometry)) { return }

    expect(isMaterial(mesh.material)).toBe(true)
    if (!isMaterial(mesh.material)) { return }

    const disposalSpies = [
      mesh.geometry,
      mesh.material,
      context.renderer.instance,
    ].map(item => vi.spyOn(item, 'dispose'))

    sceneWrapper.unmount()

    disposalSpies.forEach(spy => expect(spy).toHaveBeenCalledOnce())
  })

  it('should dispose of a mesh and geometry when the parent component is unmounted', async () => {
    const exists = ref(true)
    const Group = defineComponent({
      setup: () => ({ exists }),
      template: `
      <TresGroup v-if="exists">
        <TresMesh>
          <TresBoxGeometry />
          <TresMeshBasicMaterial />
        </TresMesh>
      </TresGroup>
    `,
    })
    const { sceneWrapper, context } = await createScene(
      () => h(Group),
    )
    const mesh = context.scene.value.children[0].children[0]

    expect(isMesh(mesh)).toBe(true)
    if (!isMesh(mesh)) { return }

    expect(isBufferGeometry(mesh.geometry)).toBe(true)
    if (!isBufferGeometry(mesh.geometry)) { return }

    expect(isMaterial(mesh.material)).toBe(true)
    if (!isMaterial(mesh.material)) { return }

    const disposalSpies = [
      mesh.geometry,
      mesh.material,
    ].map(item => vi.spyOn(item, 'dispose'))

    exists.value = false
    await nextTick()

    disposalSpies.forEach(spy => expect(spy).toHaveBeenCalledOnce())

    sceneWrapper.unmount()
  })
})
