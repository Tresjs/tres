import type { VNodeChild } from 'vue'
import { defineComponent, h } from 'vue'
import type { TresContext } from '../../../composables'
import { mount } from '@vue/test-utils'
import { setupMocks } from './mocking'

// Reset module cache and apply mocks BEFORE importing mocked modules
vi.resetModules()
await setupMocks()

// Dynamic imports AFTER mocks are set up
const TresCanvas = (await import('../../../components/TresCanvas.vue')).default

export const createScene = async (slotContent: () => VNodeChild) => {
  let resolveReady: (ctx: TresContext) => void
  const contextPromise = new Promise<TresContext>((resolve) => {
    resolveReady = resolve
  })

  const scene = defineComponent({
    setup() {
      const onReady = (ctx: TresContext) => resolveReady(ctx)
      return () => h(TresCanvas, { windowSize: true, onReady }, {
        default: slotContent,
      })
    },
  })

  const sceneWrapper = mount(scene, {
    attachTo: document.body,
  })

  const context = await contextPromise

  return { sceneWrapper, context }
}
