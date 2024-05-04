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

  it('should register a callback before render', () => {
    const callback = () => {}
    renderLoop.register(callback, 'before')
    expect(renderLoop.subscribersBefore.get(0)).toContain(callback)
  })

  it('should register callbacks in order before render', () => {
    const callback1 = () => {}
    const callback2 = () => {}
    const callback3 = () => {}
    const callback4 = () => {}
    renderLoop.register(callback1, 'before', -1)
    renderLoop.register(callback2, 'before', 0)
    renderLoop.register(callback3, 'before')
    renderLoop.register(callback4, 'before', 2)
    expect(Array.from(renderLoop.subscribersBefore.keys())).toEqual([-1, 0, 2])
  })

  it('should trigger callbacks before render in order', async () => {
    let executionOrder = ''
    const callback1 = () => { executionOrder += '-1' }
    const callback2 = () => { executionOrder += '0' }
    const callback3 = () => { executionOrder += '1' }
    const callback4 = () => { executionOrder += '2' }
    renderLoop.register(callback1, 'before', -1)
    renderLoop.register(callback2, 'before', 0)
    renderLoop.register(callback3, 'before', 0)
    renderLoop.register(callback4, 'before', 2)

    renderLoop.start()
    renderLoop.stop()

    expect(executionOrder).toBe('-1012')
  })

  it('should register a callback for render', () => {
    const callback = () => {}
    renderLoop.register(callback, 'render')
    expect(renderLoop.subscribersRender.get(0)).toContain(callback)
  })

  it('should take over the render loop', async () => {
    const originalRenderCallback = () => {}
    const takeOver = () => {}

    renderLoop.register(originalRenderCallback, 'render')
    renderLoop.register(takeOver, 'render')

    expect(renderLoop.subscribersRender.get(0)).toContain(takeOver)
  })

  it('should register a callback after render', () => {
    const callback = () => {}
    renderLoop.register(callback, 'after')
    expect(renderLoop.subscribersAfter.get(0)).toContain(callback)
  })

  it('should trigger callbacks after render in order', async () => {
    let executionOrder = ''
    const callback1 = () => { executionOrder += '-1' }
    const callback2 = () => { executionOrder += '0' }
    const callback3 = () => { executionOrder += '1' }
    const callback4 = () => { executionOrder += '2' }
    renderLoop.register(callback1, 'after', -1)
    renderLoop.register(callback2, 'after', 0)
    renderLoop.register(callback3, 'after', 0)
    renderLoop.register(callback4, 'after', 2)

    renderLoop.start()
    renderLoop.stop()

    expect(executionOrder).toBe('-1012')
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
