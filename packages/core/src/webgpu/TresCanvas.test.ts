import { mount } from '@vue/test-utils'
import { MeshStandardNodeMaterial } from 'three/webgpu'
import { describe, expect, it } from 'vitest'
import RootTresCanvas from '../components/TresCanvas.vue'
import { catalogue } from '../core/catalogue'
import type { TresRenderer } from '../index'
import { toWebGPURendererParameters } from './renderer'
import TresCanvas from './TresCanvas.vue'

const mountCanvas = (props: Record<string, unknown> = {}) =>
  mount(TresCanvas, { props, global: { stubs: { TresCanvas: true } } })

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
  it('adds the three/webgpu classes to the catalogue', () => {
    mountCanvas()
    expect(catalogue.value.MeshStandardNodeMaterial).toBe(MeshStandardNodeMaterial)
  })

  it('passes a default renderer factory to the root TresCanvas', () => {
    const wrapper = mountCanvas()
    expect(wrapper.findComponent(RootTresCanvas).props('renderer')).toBeTypeOf('function')
  })

  it('passes a user renderer factory unchanged', () => {
    const renderer = () => ({}) as unknown as TresRenderer
    const wrapper = mountCanvas({ renderer })
    expect(wrapper.findComponent(RootTresCanvas).props('renderer')).toBe(renderer)
  })

  it('re-emits the events of the root TresCanvas', () => {
    const wrapper = mountCanvas()
    const root = wrapper.findComponent(RootTresCanvas)
    const payload = {}
    root.vm.$emit('beforeLoop', payload)
    root.vm.$emit('wheel', payload)
    expect(wrapper.emitted('beforeLoop')).toEqual([[payload]])
    expect(wrapper.emitted('wheel')).toEqual([[payload]])
  })
})
