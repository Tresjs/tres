import { mount } from '@vue/test-utils'
import { ACESFilmicToneMapping, NeutralToneMapping, NoColorSpace, NoToneMapping, Scene, SRGBColorSpace, WebGLRenderer } from 'three'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, nextTick, reactive } from 'vue'
import type { TresScene } from '../../types'
import { createStubRenderer } from '../../utils/test/tresContext'
import { useBaseTresContextProvider } from '../useTresContextProvider'
import type { RendererOptions, TresRenderer } from './useRendererManager'

vi.mock('@pmndrs/pointer-events', async () => {
  const { Object3D } = await import('three')
  return { forwardHtmlEvents: () => ({ update: () => {}, destroy: () => {} }), getVoidObject: () => new Object3D() }
})

const mountWithOptions = async (initial: Partial<RendererOptions>, rendererOverrides: Record<string, unknown> = {}) => {
  const renderer = createStubRenderer({ toneMapping: ACESFilmicToneMapping, toneMappingExposure: 1, ...rendererOverrides })
  const options = reactive<RendererOptions>({ renderMode: 'manual', renderer: () => renderer as unknown as TresRenderer, ...initial })
  mount(defineComponent({
    setup() {
      useBaseTresContextProvider({
        scene: new Scene() as TresScene,
        canvas: document.createElement('canvas'),
        windowSize: false,
        rendererOptions: options,
      })
      return () => null
    },
  }))
  await nextTick()
  return { renderer, options }
}

// jsdom has no WebGL context, so the stub borrows the real `WebGLRenderer` color space accessors.
const withWebGLColorSpaceSetter = (renderer: Record<string, unknown>) => {
  const { get, set } = Object.getOwnPropertyDescriptor(WebGLRenderer.prototype, 'outputColorSpace')!
  Object.defineProperty(renderer, 'outputColorSpace', { get, set, configurable: true })
  return renderer
}

describe('renderer options', () => {
  it('applies NoToneMapping after another tone mapping', async () => {
    const { renderer, options } = await mountWithOptions({ toneMapping: NeutralToneMapping })
    expect(renderer.toneMapping).toBe(NeutralToneMapping)

    options.toneMapping = NoToneMapping
    await nextTick()

    expect(renderer.toneMapping).toBe(NoToneMapping)
  })

  it('applies NoToneMapping as the initial value', async () => {
    const { renderer } = await mountWithOptions({ toneMapping: NoToneMapping })

    expect(renderer.toneMapping).toBe(NoToneMapping)
  })

  it('applies a tone mapping exposure of 0', async () => {
    const { renderer, options } = await mountWithOptions({ toneMappingExposure: 2 })
    expect(renderer.toneMappingExposure).toBe(2)

    options.toneMappingExposure = 0
    await nextTick()

    expect(renderer.toneMappingExposure).toBe(0)
  })

  it('applies NoColorSpace on a WebGPU renderer', async () => {
    const { renderer, options } = await mountWithOptions({ outputColorSpace: SRGBColorSpace })

    options.outputColorSpace = NoColorSpace
    await nextTick()

    expect(renderer.outputColorSpace).toBe(NoColorSpace)
  })

  it('skips NoColorSpace on a WebGLRenderer, whose setter throws on it', async () => {
    const webglStub = () => withWebGLColorSpaceSetter(createStubRenderer({ isRenderer: undefined, isWebGLRenderer: true, getContext: () => ({}), _outputColorSpace: SRGBColorSpace }))
    expect(() => { webglStub().outputColorSpace = NoColorSpace }).toThrow()

    const { renderer, options } = await mountWithOptions({ outputColorSpace: SRGBColorSpace }, { isRenderer: undefined, isWebGLRenderer: true, getContext: () => ({}), _outputColorSpace: SRGBColorSpace })
    withWebGLColorSpaceSetter(renderer)

    options.outputColorSpace = NoColorSpace
    await nextTick()

    expect(renderer.outputColorSpace).toBe(SRGBColorSpace)
  })

  it('keeps the renderer values while the options are not set', async () => {
    const { renderer } = await mountWithOptions({})

    expect(renderer.toneMapping).toBe(ACESFilmicToneMapping)
    expect(renderer.toneMappingExposure).toBe(1)
  })
})
