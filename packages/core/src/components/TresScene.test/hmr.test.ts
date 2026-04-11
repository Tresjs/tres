import { h, nextTick, ref } from 'vue'
import * as THREE from 'three'
import { beforeAll, describe, expect, it } from 'vitest'
import { initializeSceneCreator } from './util'
import { extend } from '../../core/catalogue'

describe('hMR', () => {
  beforeAll(() => {
    extend(THREE)
  })

  it('does not duplicate scene children after simulated HMR tick', async () => {
    const { createScene, getRoot } = await initializeSceneCreator()

    const { context, sceneWrapper } = await createScene(() => [
      h('TresMesh', null, [
        h('TresBoxGeometry'),
        h('TresMeshBasicMaterial'),
      ]),
    ])

    expect(context.scene.value.children).toHaveLength(1)

    // Simulate HMR: bump the tick on the registered root
    const canvas = sceneWrapper.find('canvas').element as HTMLCanvasElement
    const root = getRoot(canvas)
    expect(root).toBeDefined()
    root!.hmrTick.value++
    await nextTick()

    expect(context.scene.value.children).toHaveLength(1)
    sceneWrapper.unmount()
  })

  it('diffs slot content cleanly between HMR ticks', async () => {
    const { createScene, getRoot } = await initializeSceneCreator()

    const useSphere = ref(false)
    const slotContent = () => (useSphere.value
      ? [h('TresMesh', null, [h('TresSphereGeometry'), h('TresMeshBasicMaterial')])]
      : [h('TresMesh', null, [h('TresBoxGeometry'), h('TresMeshBasicMaterial')])])

    const { context, sceneWrapper } = await createScene(slotContent)

    const firstChild = context.scene.value.children[0]
    expect(firstChild).toBeDefined()
    expect((firstChild as any).geometry.type).toBe('BoxGeometry')

    // Swap slot content (simulates template HMR replacing Box with Sphere)
    useSphere.value = true
    await nextTick()

    // Bump HMR tick to force internal component re-render
    const canvas = sceneWrapper.find('canvas').element as HTMLCanvasElement
    getRoot(canvas)!.hmrTick.value++
    await nextTick()

    expect(context.scene.value.children).toHaveLength(1)
    expect((context.scene.value.children[0] as any).geometry.type).toBe('SphereGeometry')

    sceneWrapper.unmount()
  })
})
