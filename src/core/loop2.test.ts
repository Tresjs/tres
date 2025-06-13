import { afterEach, beforeEach, it } from 'vitest'
import { createRenderLoop } from './loop'

let renderLoop

describe('createRenderLoop', () => {
  beforeEach(() => {
    renderLoop = createRenderLoop()
  })
  afterEach(() => {
    renderLoop.stop()
  })

  it('should start and stop the loop', () => {
    // Spy
    const requestAnimationFrameSpy = vi.spyOn(window, 'requestAnimationFrame')
    requestAnimationFrameSpy.mockImplementation((_callback: FrameRequestCallback) => {
      return 0 // Return a number as a placeholder
    })

    renderLoop.start()
    expect(requestAnimationFrameSpy).toHaveBeenCalled()
    requestAnimationFrameSpy.mockClear()
    renderLoop.stop()
    expect(requestAnimationFrameSpy).not.toHaveBeenCalled()
  })

  it('should pause and resume the loop', () => {
    renderLoop.start()
    renderLoop.pause()
    expect(renderLoop.isActive.value).toBe(false)
    renderLoop.resume()
    expect(renderLoop.isActive.value).toBe(true)
  })
})
