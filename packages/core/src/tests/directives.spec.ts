import { defineComponent, h, nextTick, ref } from 'vue'
import * as THREE from 'three'
import { extend } from '../core/catalogue'
import { createScene } from './utils/scene'
import { beforeAll, describe, expect, it } from './utils/testing'

describe('component: TresCanvas integration', () => {
  beforeAll(async () => {
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

  it('handles v-for correctly and reacts to changes', async () => {
    const count = ref(5)

    const VForBoxes = defineComponent({
      setup: () => ({ count }),
      template: `<TresMesh v-for="i in count" :key="i" :name="'Box' + i" />`,
    })

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
          <TresMesh v-for="i in count" :key="i" :name="'Box' + i" />
        </SlotSimple>
      `,
    })

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
})
