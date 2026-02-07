import { defineComponent, h, nextTick, ref } from 'vue'
import * as THREE from 'three'
import { extend } from '../../core/catalogue'
import { initializeSceneCreator } from './util'

describe('directives', () => {
  beforeAll(() => {
    extend(THREE)
  })

  const checkBoxes = (childrenArray: THREE.Object3D[], count: number) => {
    expect(childrenArray).toHaveLength(count)

    for (let i = 1; i <= count; i++) {
      const child = childrenArray[i - 1]
      expect(child).toBeInstanceOf(THREE.Mesh)
      expect(child.name).toBe(`Box${i}`)
    }
  }

  it('handles v-for correctly and reacts to changes', async () => {
    const count = ref(5)

    const VForBoxes = defineComponent({
      setup: () => ({ count }),
      template: `<TresMesh v-for="i in count" :key="i" :name="'Box' + i" />`,
    })

    const { createScene } = await initializeSceneCreator()
    const { sceneWrapper, context } = await createScene(
      () => h(VForBoxes),
    )

    checkBoxes(context.scene.value.children, 5)

    count.value = 0
    await nextTick()
    checkBoxes(context.scene.value.children, 0)

    count.value = 2
    await nextTick()
    checkBoxes(context.scene.value.children, 2)

    sceneWrapper.unmount()
  })

  // @see https://github.com/tresjs/tres/issues/1005
  it('it handles v-if in combination with v-for in slots correctly', async () => {
    const count = ref(5)
    const exists = ref(true)

    const SlotSimple = defineComponent({
      template: `<slot></slot>`,
    })

    const Group = defineComponent({
      components: {
        SlotSimple,
      },
      setup: () => ({ count, exists }),
      template: `
        <SlotSimple v-if="exists">
          <!-- comments should work too -->
          <TresMesh v-for="i in count" :key="i" :name="'Box' + i" />
        </SlotSimple>
      `,
    })

    const { createScene } = await initializeSceneCreator()
    const { sceneWrapper, context } = await createScene(
      () => h(Group),
    )

    checkBoxes(context.scene.value.children, 5)

    exists.value = false
    await nextTick()
    expect(context.scene.value.children).toHaveLength(0)

    count.value = 2
    await nextTick()
    expect(context.scene.value.children).toHaveLength(0)

    exists.value = true
    await nextTick()

    checkBoxes(context.scene.value.children, 2)

    sceneWrapper.unmount()
  })

  it('can swap materials and geometries via v-if', async () => {
    const isBasicMaterial = ref(true)
    const isBoxGeometry = ref(true)

    const SwapMaterial = defineComponent({
      setup: () => ({ isBasicMaterial, isBoxGeometry }),
      template: `
        <TresMesh name="swapMesh">
          <TresBoxGeometry v-if="isBoxGeometry" />
          <TresSphereGeometry v-else />
          <TresMeshBasicMaterial v-if="isBasicMaterial" color="red" />
          <TresMeshStandardMaterial v-else color="blue" />
        </TresMesh>
      `,
    })

    const { createScene } = await initializeSceneCreator()
    const { sceneWrapper, context } = await createScene(
      () => h(SwapMaterial),
    )

    const mesh = context.scene.value.children[0] as THREE.Mesh
    expect(mesh.name).toBe('swapMesh')
    expect(mesh.material).toBeInstanceOf(THREE.MeshBasicMaterial)
    expect(mesh.geometry).toBeInstanceOf(THREE.BoxGeometry)

    isBasicMaterial.value = false
    await nextTick()

    expect(mesh.material).toBeInstanceOf(THREE.MeshStandardMaterial)

    isBasicMaterial.value = true
    await nextTick()

    expect(mesh.material).toBeInstanceOf(THREE.MeshBasicMaterial)

    isBoxGeometry.value = false
    await nextTick()

    expect(mesh.geometry).toBeInstanceOf(THREE.SphereGeometry)

    sceneWrapper.unmount()
  })
})
