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

  it('should pause and resume the renderer', () => {
    renderLoop.start()
    renderLoop.pauseRender()
    expect(renderLoop.isRenderPaused.value).toBe(true)
    renderLoop.resumeRender()
    expect(renderLoop.isRenderPaused.value).toBe(false)
  })

  it('should register a callback before render', () => {
    let result = ''
    const callback = () => { result += '0' }
    renderLoop.register(callback, 'before')
    renderLoop.start()
    expect(result).toBe('0')
  })

  it('should register callbacks in order before render', () => {
    const callbackIndexes = []
    const callback1 = () => { callbackIndexes.push(-1) }
    const callback2 = () => { callbackIndexes.push(0) }
    const callback3 = () => { callbackIndexes.push(1) }
    const callback4 = () => { callbackIndexes.push(2) }
    renderLoop.register(callback2, 'before')
    renderLoop.register(callback1, 'before', -1)
    renderLoop.register(callback3, 'before')
    renderLoop.register(callback4, 'before', 2)
    renderLoop.start()
    expect(callbackIndexes).toStrictEqual([-1, 0, 1, 2])
  })

  it('should register a callback for render', () => {
    let result = ''
    const callback = () => { result += '0' }
    renderLoop.register(callback, 'render')
    renderLoop.start()
    expect(result).toBe('0')
  })

  it('should take over the render loop', async () => {
    let result = ''
    const originalRenderCallback = () => { result = 'original' }
    const takeOver = () => { result = 'takeover' }

    renderLoop.register(originalRenderCallback, 'render')
    renderLoop.register(takeOver, 'render')

    renderLoop.start()
    expect(result).toBe('takeover')
  })

  it('does not register the same callback twice', () => {
    let result = ''
    const callback1 = () => { result += '1' }
    renderLoop.register(callback1, 'before', 0)
    renderLoop.register(callback1, 'before', 0)
    renderLoop.start()
    renderLoop.stop()
    expect(result).toEqual('1')
  })

  it('should register a callback after render', () => {
    let result = ''
    const callback = () => { result += '0' }
    renderLoop.register(callback, 'after')
    renderLoop.start()
    expect(result).toBe('0')
  })

  it('should render first all before render callbacks, then render callbacks, and finally after render callbacks', async () => {
    const executionOrder = []
    const beforeCb = () => { executionOrder.push('before') }
    const fboCb = () => { executionOrder.push('fbo') }
    const renderCb = () => { executionOrder.push('render') }
    const afterCb = () => { executionOrder.push('after') }
    renderLoop.register(beforeCb, 'before')
    renderLoop.register(fboCb, 'before', Number.POSITIVE_INFINITY)
    renderLoop.register(renderCb, 'render')
    renderLoop.register(afterCb, 'after', -1)

    renderLoop.start()
    renderLoop.stop()

    expect(executionOrder).toEqual(['before', 'fbo', 'render', 'after'])
  })
})
