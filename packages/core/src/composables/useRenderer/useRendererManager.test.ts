import type { RendererOptions, RenderMode } from './useRendererManager'
import type { TresCamera } from '../../types'
import type { ShallowRef } from 'vue'
import { mount } from '@vue/test-utils'
import { Scene } from 'three'
import { computed, defineComponent, h, nextTick, reactive, ref, shallowRef } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { setupMocks } from '../../utils/test/mocking'
import { useCameraManager } from '../useCamera'
import { useRendererManager } from './useRendererManager'

const createRendererDouble = () => ({
  domElement: { width: 800, height: 600 },
  render: vi.fn(),
  setSize: vi.fn(),
  setPixelRatio: vi.fn(),
  getPixelRatio: vi.fn(() => 1),
  setClearColor: vi.fn(),
  setClearAlpha: vi.fn(),
  dispose: vi.fn(),
  forceContextLoss: vi.fn(),
  shadowMap: { enabled: false, type: 0 },
  toneMapping: 0,
  toneMappingExposure: 1,
  outputColorSpace: '',
})

const cleanups: Array<() => void> = []

const createHarness = (renderMode: RenderMode) => {
  const sizes = {
    width: ref(800),
    height: ref(600),
    pixelRatio: ref(1),
    aspectRatio: computed(() => 800 / 600),
  }
  const camera = useCameraManager({ sizes })
  camera.registerCamera({ isCamera: true, uuid: 'camera-double' } as unknown as TresCamera)

  const scene = shallowRef(new Scene()) as ShallowRef<never>
  const canvas = ref(document.createElement('canvas'))
  const renderer = createRendererDouble()
  const options = reactive<RendererOptions>({
    renderMode,
    renderer: () => renderer as never,
  })

  const manager = useRendererManager({
    scene,
    canvas,
    options,
    contextParts: { sizes, camera },
  })

  return { manager, options, renderer }
}

const mountHarness = async (renderMode: RenderMode) => {
  let harness!: ReturnType<typeof createHarness>
  const wrapper = mount(defineComponent({
    setup() {
      harness = createHarness(renderMode)
      return () => h('div')
    },
  }))
  cleanups.push(() => wrapper.unmount())

  await nextTick()
  await nextTick()
  await nextTick()

  return harness
}

describe('useRendererManager render-mode lifecycle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    cleanups.splice(0).forEach(cleanup => cleanup())
    vi.useRealTimers()
  })

  it('on-demand renders the initial frame and then idles', async () => {
    const { manager, renderer } = await mountHarness('on-demand')
    expect(manager.loop.isActive.value).toBe(true)

    vi.advanceTimersToNextFrame()
    expect(renderer.render).toHaveBeenCalledTimes(1)

    vi.advanceTimersToNextFrame()
    vi.advanceTimersToNextFrame()
    expect(renderer.render).toHaveBeenCalledTimes(1)
  })

  it('resumes rendering when renderMode switches from on-demand to always after draining', async () => {
    const { options, renderer } = await mountHarness('on-demand')

    vi.advanceTimersToNextFrame()
    vi.advanceTimersToNextFrame()
    expect(renderer.render).toHaveBeenCalledTimes(1)

    options.renderMode = 'always'
    await nextTick()

    vi.advanceTimersToNextFrame()
    vi.advanceTimersToNextFrame()
    vi.advanceTimersToNextFrame()
    expect(renderer.render).toHaveBeenCalledTimes(4)
  })

  it('resumes rendering when renderMode switches from manual to always after draining', async () => {
    const { manager, options, renderer } = await mountHarness('manual')

    manager.advance()
    vi.advanceTimersToNextFrame()
    expect(renderer.render).toHaveBeenCalledTimes(1)
    vi.advanceTimersToNextFrame()
    expect(renderer.render).toHaveBeenCalledTimes(1)

    options.renderMode = 'always'
    await nextTick()

    vi.advanceTimersToNextFrame()
    vi.advanceTimersToNextFrame()
    expect(renderer.render).toHaveBeenCalledTimes(3)
  })

  it('drains to idle when renderMode switches from always to on-demand', async () => {
    const { options, renderer } = await mountHarness('always')

    vi.advanceTimersToNextFrame()
    vi.advanceTimersToNextFrame()
    expect(renderer.render).toHaveBeenCalledTimes(2)

    options.renderMode = 'on-demand'
    await nextTick()

    vi.advanceTimersToNextFrame()
    expect(renderer.render).toHaveBeenCalledTimes(3)
    vi.advanceTimersToNextFrame()
    vi.advanceTimersToNextFrame()
    expect(renderer.render).toHaveBeenCalledTimes(3)
  })

  it('on-demand settles when the custom render function does not declare notifySuccess', async () => {
    const { manager } = await mountHarness('on-demand')

    const customRender = vi.fn(() => {})
    manager.replaceRenderFunction(customRender)

    vi.advanceTimersToNextFrame()
    vi.advanceTimersToNextFrame()
    vi.advanceTimersToNextFrame()
    expect(customRender).toHaveBeenCalledTimes(1)
  })

  it('always keeps calling a custom render function without notifySuccess every frame', async () => {
    const { manager } = await mountHarness('always')

    const customRender = vi.fn(() => {})
    manager.replaceRenderFunction(customRender)

    vi.advanceTimersToNextFrame()
    vi.advanceTimersToNextFrame()
    vi.advanceTimersToNextFrame()
    expect(customRender).toHaveBeenCalledTimes(3)
  })

  it('keeps the explicit notifySuccess contract for render functions that declare it', async () => {
    const { manager } = await mountHarness('on-demand')

    const notifyingRender = vi.fn((notifySuccess: () => void) => {
      notifySuccess()
    })
    manager.replaceRenderFunction(notifyingRender)

    vi.advanceTimersToNextFrame()
    vi.advanceTimersToNextFrame()
    expect(notifyingRender).toHaveBeenCalledTimes(1)

    const nonNotifyingRender = vi.fn((_notifySuccess: () => void) => {})
    manager.replaceRenderFunction(nonNotifyingRender)
    manager.invalidate()

    vi.advanceTimersToNextFrame()
    vi.advanceTimersToNextFrame()
    expect(nonNotifyingRender).toHaveBeenCalledTimes(2)
  })
})

describe('tres-canvas render-mode switching (integration)', () => {
  it('switching render-mode on-demand to always resumes the loop', async () => {
    vi.resetModules()
    await setupMocks()
    const TresCanvas = (await import('../../components/TresCanvas.vue')).default

    const renderMode = ref<'always' | 'on-demand'>('on-demand')
    let renderCount = 0

    const wrapper = mount(defineComponent({
      setup: () => () => h(TresCanvas, {
        windowSize: true,
        renderMode: renderMode.value,
        onRender: () => {
          renderCount++
        },
      }),
    }), { attachTo: document.body })

    await vi.waitFor(() => expect(renderCount).toBeGreaterThan(0))
    const idleCount = renderCount

    await new Promise(resolve => setTimeout(resolve, 100))
    expect(renderCount).toBe(idleCount)

    renderMode.value = 'always'
    await nextTick()

    await vi.waitFor(() => expect(renderCount).toBeGreaterThan(idleCount))

    wrapper.unmount()
  })
})
