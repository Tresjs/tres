import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, reactive } from 'vue'
import type { TresContext, UseRendererManagerReturn } from '../composables'
import { setupMocks } from '../utils/test/mocking'

const setup = async ({ withRendererOption = false } = {}) => {
  vi.resetModules()
  await setupMocks()
  const { Scene, WebGLRenderer } = await import('three')
  const { useRendererManager, useTresContextProvider } = await import('./renderer')
  const createRenderer = vi.fn(() => new WebGLRenderer())
  const rendererOptions = withRendererOption ? { renderer: createRenderer } : {}

  let context!: TresContext
  let manager!: UseRendererManagerReturn
  mount(defineComponent({
    setup() {
      const canvas = document.createElement('canvas')
      context = useTresContextProvider({ scene: new Scene(), canvas, windowSize: false, rendererOptions: reactive(rendererOptions) })
      manager = useRendererManager({
        scene: context.scene,
        canvas,
        options: reactive(rendererOptions),
        contextParts: { sizes: context.sizes, camera: context.camera },
      })
      return () => null
    },
  }))

  return { context, manager, WebGLRenderer, createRenderer }
}

describe('root entry composables', () => {
  it('create a WebGLRenderer when the renderer option is not set', async () => {
    const { context, manager, WebGLRenderer, createRenderer } = await setup()
    expect(createRenderer).not.toHaveBeenCalled()
    expect(context.renderer.instance).toBeInstanceOf(WebGLRenderer)
    expect(manager.instance).toBeInstanceOf(WebGLRenderer)
  })

  it('use the renderer option when it is set', async () => {
    const { context, manager, createRenderer } = await setup({ withRendererOption: true })
    expect(context.renderer.instance).toBe(createRenderer.mock.results[0]?.value)
    expect(manager.instance).toBe(createRenderer.mock.results[1]?.value)
  })
})
