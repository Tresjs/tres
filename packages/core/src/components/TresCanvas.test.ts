import { mount } from '@vue/test-utils'
import { WebGLRenderer } from 'three'
import { describe, expect, it } from 'vitest'
import type { TresRenderer } from '../composables'
import { catalogue } from '../core/catalogue'
import BaseCanvas from './BaseCanvas.vue'
import Context from './Context.vue'
import TresCanvas from './TresCanvas.vue'
import { TresCanvasContext } from '.'

const mountCanvas = (props: Record<string, unknown> = {}) =>
  mount(TresCanvas, { props, global: { stubs: { BaseCanvas: true } } })

describe('root TresCanvas', () => {
  it('passes a default renderer factory to the base canvas', () => {
    const wrapper = mountCanvas()
    expect(wrapper.findComponent(BaseCanvas).props('renderer')).toBeTypeOf('function')
  })

  it('passes a user renderer factory unchanged', () => {
    const renderer = () => ({}) as unknown as TresRenderer
    const wrapper = mountCanvas({ renderer })
    expect(wrapper.findComponent(BaseCanvas).props('renderer')).toBe(renderer)
  })

  it('adds the three classes to the catalogue', () => {
    mountCanvas()
    expect(catalogue.value.WebGLRenderer).toBe(WebGLRenderer)
  })
})

describe('root TresCanvasContext', () => {
  const mountContext = (props: Record<string, unknown> = {}) =>
    mount(TresCanvasContext, { props: { canvas: document.createElement('canvas'), ...props }, global: { stubs: { Context: true } } })

  it('passes a default renderer factory to the context', () => {
    const wrapper = mountContext()
    expect(wrapper.findComponent(Context).props('renderer')).toBeTypeOf('function')
  })

  it('passes a user renderer factory unchanged', () => {
    const renderer = () => ({}) as unknown as TresRenderer
    const wrapper = mountContext({ renderer })
    expect(wrapper.findComponent(Context).props('renderer')).toBe(renderer)
  })
})
