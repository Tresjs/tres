import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useLoop } from './index'
import { useRenderLoop } from '../useRenderLoop'

let loop: ReturnType<typeof useLoop>

describe('useRenderLoop', () => {
  beforeEach(() => {
    loop = useLoop()
    vi.mock('../useTresContextProvider', () => ({
      useTresContext: vi.fn(() => ({
        camera: {},
        scene: {},
        renderer: {
          loop: useRenderLoop(() => {}),
        },
        controls: {},
        events: {},
      })),
    }))
  })
  afterEach(() => {
    loop.stop()
  })

  it('should start and stop the loop', () => {
    vi.useFakeTimers()
    const requestAnimationFrameSpy = vi.spyOn(window, 'requestAnimationFrame')
    requestAnimationFrameSpy.mockImplementation((_callback: FrameRequestCallback) => 0)
    expect(loop.isActive.value).toBe(false)

    loop.start()
    expect(loop.isActive.value).toBe(true)

    expect(requestAnimationFrameSpy).toHaveBeenCalled()
    requestAnimationFrameSpy.mockClear()
    loop.stop()
    expect(loop.isActive.value).toBe(false)
    expect(requestAnimationFrameSpy).not.toHaveBeenCalled()

    requestAnimationFrameSpy.mockReset()
  })

  it('should call registered callbacks in the right order', async () => {
    vi.useFakeTimers()

    let toTest = ''

    const add = (num: number) => () => { toTest += num }

    loop.onBeforeRender(add(0), -1)
    loop.onBeforeRender(add(1), 0)
    loop.onBeforeRender(add(2), 1)

    loop.onAfterRender(add(3), -1)
    loop.onAfterRender(add(4), 0)
    loop.onAfterRender(add(5), 1)

    loop.start()
    vi.advanceTimersToNextFrame()

    expect(toTest).toBe('012345')
    vi.useRealTimers()
  })
})
