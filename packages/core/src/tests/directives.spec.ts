import type { TresContext } from '../composables'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { setupMocks } from './util'
import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick } from 'vue'
import * as THREE from 'three'
import { extend } from '../core/catalogue'

// Reset module cache and apply mocks BEFORE importing mocked modules
vi.resetModules()
await setupMocks()

// Dynamic imports AFTER mocks are set up
const TresCanvas = (await import('../components/TresCanvas.vue')).default

describe('component: TresCanvas integration', () => {
  beforeAll(async () => {
    extend(THREE)
  })

  it('mounts with a box mesh and box exists in scene graph', async () => {
    let resolveReady: (ctx: TresContext) => void
    const readyPromise = new Promise<TresContext>((resolve) => {
      resolveReady = resolve
    })

    // Component that renders a TresCanvas with a box mesh
    const BoxScene = defineComponent({
      setup() {
        const onReady = (ctx: TresContext) => resolveReady(ctx)
        return () => h(TresCanvas, { windowSize: true, onReady }, {
          default: () => h('TresMesh', { name: 'TestBox' }, [
            h('TresBoxGeometry'),
            h('TresMeshBasicMaterial'),
          ]),
        })
      },
    })

    const wrapper = mount(BoxScene, {
      attachTo: document.body,
    })

    // Wait for the ready event
    const context = await readyPromise
    await nextTick()

    expect(context).toBeDefined()
    expect(context.scene?.value).toBeDefined()

    // Check if the box exists in the scene graph
    const scene = context.scene.value
    const box = scene.children[0]

    expect(box).toBeDefined()
    expect(box).toBeInstanceOf(THREE.Mesh)
    expect(box?.name).toBe('TestBox')

    wrapper.unmount()
  })
})
