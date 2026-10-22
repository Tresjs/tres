import { mount } from '@vue/test-utils'
import type { WebGPURenderer } from 'three/webgpu'
import { MeshStandardNodeMaterial } from 'three/webgpu'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, reactive } from 'vue'
import BaseCanvas from '../components/BaseCanvas.vue'
import Context from '../components/Context.vue'
import { catalogue } from '../core/catalogue'
import type { TresContext } from '../index'
import { setupMocks } from '../utils/test/mocking'
import { isWebGPURenderer } from '../utils/is'
import { toWebGPURendererParameters } from './renderer'
import { TresCanvas, TresCanvasContext } from '.'

const mountCanvas = (props: Record<string, unknown> = {}) =>
  mount(TresCanvas, { props, global: { stubs: { BaseCanvas: true } } })

describe('toWebGPURendererParameters', () => {
  it('passes the WebGPURenderer options that are set', () => {
    expect(toWebGPURendererParameters({ antialias: true, alpha: false, depth: true, stencil: false, powerPreference: 'high-performance', logarithmicDepthBuffer: true }))
      .toEqual({ antialias: true, alpha: false, depth: true, stencil: false, powerPreference: 'high-performance', logarithmicDepthBuffer: true })
  })

  it('drops undefined options so three keeps its own defaults', () => {
    expect(toWebGPURendererParameters({ antialias: true, alpha: undefined })).toEqual({ antialias: true })
  })

  it('drops the WebGL-only powerPreference value "default"', () => {
    expect(toWebGPURendererParameters({ antialias: true, powerPreference: 'default' })).toEqual({ antialias: true })
  })

  it('ignores options WebGPURenderer does not take', () => {
    expect(toWebGPURendererParameters({ antialias: true, precision: 'highp', preserveDrawingBuffer: true })).toEqual({ antialias: true })
  })
})

describe('webgpu TresCanvas', () => {
  // At import, not at mount: the `GlobalComponents` types apply as soon as the entry is
  // imported, so root canvases must resolve node tags even if no WebGPU canvas has mounted.
  it('adds the three/webgpu classes to the catalogue before any canvas mounts', () => {
    expect(catalogue.value.MeshStandardNodeMaterial).toBe(MeshStandardNodeMaterial)
  })

  it('passes a default renderer factory to the base canvas', () => {
    const wrapper = mountCanvas()
    expect(wrapper.findComponent(BaseCanvas).props('renderer')).toBeTypeOf('function')
  })

  it('passes a user renderer factory unchanged', () => {
    const renderer = () => ({}) as unknown as WebGPURenderer
    const wrapper = mountCanvas({ renderer })
    expect(wrapper.findComponent(BaseCanvas).props('renderer')).toBe(renderer)
  })

  it('does not add the WebGL-only three classes to the catalogue', () => {
    mountCanvas()
    expect(catalogue.value.WebGLRenderer).toBeUndefined()
  })

  it('re-emits the events of the base canvas', () => {
    const wrapper = mountCanvas()
    const base = wrapper.findComponent(BaseCanvas)
    const payload = {}
    base.vm.$emit('beforeLoop', payload)
    base.vm.$emit('wheel', payload)
    expect(wrapper.emitted('beforeLoop')).toEqual([[payload]])
    expect(wrapper.emitted('wheel')).toEqual([[payload]])
  })
})

describe('webgpu TresCanvasContext', () => {
  const mountContext = (props: Record<string, unknown> = {}) =>
    mount(TresCanvasContext, { props: { canvas: document.createElement('canvas'), ...props }, global: { stubs: { Context: true } } })

  it('passes a default renderer factory to the context', () => {
    const wrapper = mountContext()
    expect(wrapper.findComponent(Context).props('renderer')).toBeTypeOf('function')
  })

  it('passes a user renderer factory unchanged', () => {
    const renderer = () => ({}) as unknown as WebGPURenderer
    const wrapper = mountContext({ renderer })
    expect(wrapper.findComponent(Context).props('renderer')).toBe(renderer)
  })
})

describe('webgpu useTresContextProvider', () => {
  it('creates a WebGPURenderer when the renderer option is not set', async () => {
    vi.resetModules()
    await setupMocks()
    // jsdom has no GPU, so the async `init()` of the renderer fails and logs.
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const { Scene } = await import('three')
    const { useTresContextProvider } = await import('./renderer')

    let context!: TresContext
    mount(defineComponent({
      setup() {
        context = useTresContextProvider({ scene: new Scene(), canvas: document.createElement('canvas'), windowSize: false, rendererOptions: reactive({}) })
        return () => null
      },
    }))

    expect(isWebGPURenderer(context.renderer.instance)).toBe(true)
  })
})
