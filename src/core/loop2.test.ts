import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useCreateRenderLoop } from './loop'
import { useRafFn } from '@vueuse/core'

let renderLoop: ReturnType<typeof useCreateRenderLoop>

describe('useCreateRenderLoop', () => {
  beforeEach(() => {
    renderLoop = useCreateRenderLoop()
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

  //   it('deleteme', () => {
  //     vi.useFakeTimers()
  //     let frameRendered = false

  //     requestAnimationFrame(() => {
  //       frameRendered = true
  //     })

  //     vi.advanceTimersToNextFrame()

  //     expect(frameRendered).toBe(true)
  //   })

  it('should call registered callbacks in the right order', async () => {
    vi.useFakeTimers()

    let toTest = ''
    const beforeRender = () => { toTest += '0' }
    const render = () => { toTest += '1' }
    const afterRender = () => { toTest += '2' }

    renderLoop.onBeforeRender(beforeRender, 0)
    renderLoop.onRender(render)
    renderLoop.onAfterRender(afterRender, 0)

    renderLoop.start()
    vi.advanceTimersToNextFrame()

    expect(toTest).toBe('012')
    vi.useRealTimers()
  })
})
