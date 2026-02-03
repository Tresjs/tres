import { h } from 'vue'
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
})
