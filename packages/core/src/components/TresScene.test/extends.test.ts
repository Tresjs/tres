import { defineComponent, h } from 'vue'
import type { TresContext } from '../../composables'
import { mount } from '@vue/test-utils'
import { setupMocks } from '../../utils/test/mocking'

const createScene = async () => {
  vi.resetModules()
  await setupMocks()

  const { catalogue } = await import('../../core/catalogue')
  const TresCanvas = (await import('../TresCanvas.vue')).default

  let resolveReady: (ctx: TresContext) => void
  const contextPromise = new Promise<TresContext>((resolve) => {
    resolveReady = resolve
  })

  const scene = defineComponent({
    setup() {
      return () => h(TresCanvas, {
        windowSize: true,
        onReady: (ctx: TresContext) => resolveReady(ctx),
      }, { default: () => [] })
    },
  })

  const sceneWrapper = mount(scene, { attachTo: document.body })
  const context = await contextPromise

  return { sceneWrapper, context, catalogue }
}

describe('tresCanvas - catalogue', () => {
  it('extends all of THREE by default', async () => {
    const { catalogue, sceneWrapper } = await createScene()
    expect(catalogue.value).toHaveProperty('Mesh')
    expect(catalogue.value).toHaveProperty('BoxGeometry')
    sceneWrapper.unmount()
  })
})
