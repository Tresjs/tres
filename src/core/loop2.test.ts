import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useCreateRenderLoop } from './loop'
import { useRafFn } from '@vueuse/core'

let renderLoop: ReturnType<typeof useCreateRenderLoop>

describe('useCreateRenderLoop', () => {
  beforeEach(() => {
    renderLoop = useCreateRenderLoop(() => undefined)
  })
  afterEach(() => {
    renderLoop.stop()
  })

  it('should start and stop the loop', () => {
    vi.useFakeTimers()
    const requestAnimationFrameSpy = vi.spyOn(window, 'requestAnimationFrame')
    requestAnimationFrameSpy.mockImplementation((_callback: FrameRequestCallback) => 0)
    expect(renderLoop.isActive.value).toBe(false)

    renderLoop.start()
    expect(renderLoop.isActive.value).toBe(true)

    expect(requestAnimationFrameSpy).toHaveBeenCalled()
    requestAnimationFrameSpy.mockClear()
    renderLoop.stop()
    expect(renderLoop.isActive.value).toBe(false)
    expect(requestAnimationFrameSpy).not.toHaveBeenCalled()

    requestAnimationFrameSpy.mockReset()
  })

  it('should call registered callbacks in the right order', async () => {
    vi.useFakeTimers()

    let toTest = ''

    const add = (num: number) => () => { toTest += num }

    renderLoop.onBeforeRender(add(0), -1)
    renderLoop.onBeforeRender(add(1), 0)
    renderLoop.onBeforeRender(add(2), 1)

    renderLoop.onAfterRender(add(3), -1)
    renderLoop.onAfterRender(add(4), 0)
    renderLoop.onAfterRender(add(5), 1)

    renderLoop.start()
    vi.advanceTimersToNextFrame()

    expect(toTest).toBe('012345')
    vi.useRealTimers()
  })

  // TODO remove?
  //   it('should return the right context in the callbacks', async () => {
  //     vi.useFakeTimers()

  //     const x = 0

  //     const renderLoopWithContext = useCreateRenderLoop(() => x)

  //     renderLoopWithContext.start()

  //     const beforeRender = vi.fn(ctx =>
  //       expect(ctx).toBe(x),
  //     )

  //     renderLoopWithContext.onBeforeRender(beforeRender)

  //     vi.advanceTimersToNextFrame()

  //     await vi.waitFor(() => {
  //       expect(beforeRender).toHaveBeenCalled()
  //     })

//     vi.useRealTimers()
//   })
})
