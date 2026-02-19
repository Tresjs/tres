import { Mesh } from 'three'
import { defineComponent, h } from 'vue'
import type { TresContext } from '../../composables'
import { mount } from '@vue/test-utils'
import { setupMocks } from '../../utils/test/mocking'

const createScene = async (extendsOption?: Record<string, unknown>) => {
  vi.resetModules()
  await setupMocks()

  const { catalogue } = await import('../../core/catalogue')
  const TresCanvas = (await import('../TresCanvas.vue')).default

  let resolveReady: (ctx: TresContext) => void
  const contextPromise = new Promise<TresContext>((resolve) => {
    resolveReady = resolve
  })

  const canvasProps: Record<string, unknown> = {
    windowSize: true,
    onReady: (ctx: TresContext) => resolveReady(ctx),
  }
  if (extendsOption !== undefined) {
    canvasProps.extends = extendsOption
  }

  const scene = defineComponent({
    setup() {
      return () => h(TresCanvas, canvasProps, { default: () => [] })
    },
  })

  const sceneWrapper = mount(scene, { attachTo: document.body })
  const context = await contextPromise

  return { sceneWrapper, context, catalogue }
}

describe('context - extends prop', () => {
  it('extends all of THREE by default when no extends prop is given', async () => {
    const { catalogue, sceneWrapper } = await createScene(undefined)
    expect(catalogue.value).toHaveProperty('Mesh')
    expect(catalogue.value).toHaveProperty('BoxGeometry')
    sceneWrapper.unmount()
  })

  it('only registers provided classes when extends is given', async () => {
    const { catalogue, sceneWrapper } = await createScene({ Mesh })
    expect(catalogue.value).toHaveProperty('Mesh')
    expect(catalogue.value).not.toHaveProperty('BoxGeometry')
    sceneWrapper.unmount()
  })

  it('registers nothing when extends is an empty object', async () => {
    const { catalogue, sceneWrapper } = await createScene({})
    expect(catalogue.value).not.toHaveProperty('Mesh')
    expect(catalogue.value).not.toHaveProperty('BoxGeometry')
    sceneWrapper.unmount()
  })
})
