import { defineComponent, h, nextTick, ref } from 'vue'
import * as THREE from 'three'
import { extend } from '../core/catalogue'
import { createScene } from './utils/scene'
import { beforeAll, describe, expect, it } from './utils/testing'

describe('component: TresCanvas integration', () => {
  beforeAll(async () => {
    extend(THREE)
  })

  it('mounts with a box mesh and box exists in scene graph', async () => {
    const { sceneWrapper, context } = await createScene(
      () => h('TresMesh', { name: 'TestBox' }),
    )

    expect(context).toBeDefined()
    expect(context.scene?.value).toBeDefined()

    // Check if the box exists in the scene graph
    const box = context.scene.value.children[0]

    expect(box).toBeDefined()
    expect(box).toBeInstanceOf(THREE.Mesh)
    expect(box?.name).toBe('TestBox')

    sceneWrapper.unmount()
  })

  it('renders boxes using v-for with correct and reacts to changes', async () => {
    const count = ref(5)

    const VForBoxes = defineComponent({
      setup: () => ({ count }),
      template: `<TresMesh v-for="i in count" :key="i" :name="'Box' + i" />`,
    })

    const { sceneWrapper, context } = await createScene(
      () => h(VForBoxes),
    )

    const checkBoxes = (count: number) => {
      expect(context.scene.value.children).toHaveLength(count)

      for (let i = 1; i <= count; i++) {
        const child = context.scene.value.children[i - 1]
        expect(child).toBeInstanceOf(THREE.Mesh)
        expect(child.name).toBe(`Box${i}`)
      }
    }

    checkBoxes(5)

    count.value = 0
    await nextTick()
    checkBoxes(0)

    count.value = 2
    await nextTick()
    checkBoxes(2)

    sceneWrapper.unmount()
  })
})
