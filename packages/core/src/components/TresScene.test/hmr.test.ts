import { h, nextTick } from 'vue'
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
})
