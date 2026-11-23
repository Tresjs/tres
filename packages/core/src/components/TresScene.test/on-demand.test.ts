import type { App } from 'vue'
import type { Scene } from 'three'
import type { TresRenderer } from '../../composables/useRenderer/useRendererManager'
import { createApp, defineComponent, h, nextTick, ref, unref } from 'vue'
import { PerspectiveCamera } from 'three'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import TresCanvas from '../TresCanvas.vue'
import { mockConsoleWarn } from '../../utils/test/mocking'

describe('on-demand rendering', () => {
  let app: App
  let renderFrame: () => Promise<void>

  beforeEach(() => {
    mockConsoleWarn()
    let nextId = 0
    let timestamp = 0
    const pending = new Map<number, FrameRequestCallback>()
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      pending.set(++nextId, callback)
      return nextId
    })
    vi.stubGlobal('cancelAnimationFrame', (id: number) => pending.delete(id))
    renderFrame = async () => {
      timestamp += 16
      const callbacks = [...pending.values()]
      pending.clear()
      callbacks.forEach(callback => callback(timestamp))
      await nextTick()
    }
  })

  afterEach(() => {
    app?.unmount()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('rests after a prop update and renders again only when the scene changes', async () => {
    const position = ref(0)
    const draw = vi.fn<(scene: Scene) => void>()
    const content = defineComponent({
      setup() {
        return () => h('TresGroup', { name: 'subject', position: [position.value, 0, 0] })
      },
    })
    app = createApp({
      render: () => h(TresCanvas, {
        renderMode: 'on-demand',
        windowSize: true,
        camera: new PerspectiveCamera(),
        // Keep Tres's real prop patching and loop; only replace GPU drawing.
        renderer: ({ canvas }) => {
          const domElement = unref(canvas)
          domElement.setPointerCapture = vi.fn()
          return {
            domElement,
            render: draw,
            setSize: vi.fn(),
            setClearColor: vi.fn(),
            shadowMap: {},
            dispose: vi.fn(),
          } as unknown as TresRenderer
        },
      }, { default: () => h(content) }),
    })
    app.mount(document.createElement('div'))
    await nextTick()
    await nextTick()
    await renderFrame()
    expect(draw).toHaveBeenCalledOnce()

    draw.mockClear()
    position.value = 1
    await nextTick()
    await renderFrame()
    expect(draw).toHaveBeenCalledOnce()
    expect(draw.mock.calls[0][0].getObjectByName('subject')?.position.x).toBe(1)

    await renderFrame()
    await renderFrame()
    expect(draw).toHaveBeenCalledOnce()

    position.value = 2
    await nextTick()
    await renderFrame()
    expect(draw).toHaveBeenCalledTimes(2)
    expect(draw.mock.calls[1][0].getObjectByName('subject')?.position.x).toBe(2)
    await renderFrame()
    expect(draw).toHaveBeenCalledTimes(2)
  })
})
