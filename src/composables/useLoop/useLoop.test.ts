import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useLoop } from './index'
import { useCreateRafLoop } from '../useCreateRafLoop'

let loop: ReturnType<typeof useLoop>

describe(useLoop.name, () => {
  beforeEach(() => {
    vi.useFakeTimers()
    loop = useLoop()
    vi.mock('../useTresContextProvider', () => ({
      useTresContext: vi.fn(() => ({
        camera: {},
        scene: {},
        renderer: {
          loop: useCreateRafLoop(() => {}, () => {}),
        },
        controls: {},
        events: {},
      })),
    }))
  })
  afterEach(() => {
    loop.stop()
    vi.useRealTimers()
  })

  it('should start and stop the loop', () => {
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
    let toTest = ''

    const add = (num: number) => () => { toTest += num }

    loop.onBeforeLoop(add(0), -1)
    loop.onBeforeLoop(add(1), 0)
    loop.onBeforeLoop(add(2), 1)

    loop.onLoop(add(3), -1)
    loop.onLoop(add(4), 0)
    loop.onLoop(add(5), 1)

    // check if elements with the same index are called by insertion order
    loop.onLoop(add(6), 1)
    loop.onLoop(add(7), 1)

    loop.start()
    vi.advanceTimersToNextFrame()

    expect(toTest).toBe('01234567')
    vi.useRealTimers()
  })

  it('should be possible to replace the loop function', () => {
    let toTest = 0
    loop.start()
    loop.render(() => {
      toTest++
    })
    vi.advanceTimersToNextFrame()
    vi.advanceTimersToNextFrame()
    vi.advanceTimersToNextFrame()
    expect(toTest).toBe(3)
  })
})
