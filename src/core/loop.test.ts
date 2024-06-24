import { afterEach, beforeEach, it } from 'vitest'
import type { TresContext } from '../composables/useTresContextProvider'
import { createRenderLoop } from './loop'

let renderLoop

describe('createRenderLoop', () => {
  beforeEach(() => {
    renderLoop = createRenderLoop({} as TresContext)
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

  describe('`stop`, `start`, `pause`, `resume` call order', () => {
    it('does not trigger a callback on `start()` unless `stop()`ped', () => {
      const callbackBefore = vi.fn()
      const callbackRender = vi.fn()
      const callbackAfter = vi.fn()
      renderLoop.register(callbackBefore, 'before')
      renderLoop.register(callbackRender, 'render')
      renderLoop.register(callbackAfter, 'after')
      renderLoop.start()
      expect(callbackBefore).toBeCalledTimes(1)
      expect(callbackRender).toBeCalledTimes(1)
      expect(callbackAfter).toBeCalledTimes(1)

      renderLoop.start()
      renderLoop.start()
      renderLoop.start()
      renderLoop.start()
      expect(callbackBefore).toBeCalledTimes(1)
      expect(callbackRender).toBeCalledTimes(1)
      expect(callbackAfter).toBeCalledTimes(1)

      renderLoop.stop()
      renderLoop.start()
      expect(callbackBefore).toBeCalledTimes(2)
      expect(callbackRender).toBeCalledTimes(2)
      expect(callbackAfter).toBeCalledTimes(2)
    })

    it('can `start()` even if `resume()`d while `stop()`ped', () => {
      const callbackBefore = vi.fn()
      const callbackRender = vi.fn()
      const callbackAfter = vi.fn()
      renderLoop.register(callbackBefore, 'before')
      renderLoop.register(callbackRender, 'render')
      renderLoop.register(callbackAfter, 'after')
      renderLoop.stop()
      renderLoop.resume()
      expect(callbackBefore).toBeCalledTimes(0)
      expect(callbackRender).toBeCalledTimes(0)
      expect(callbackAfter).toBeCalledTimes(0)

      renderLoop.start()
      expect(callbackBefore).toBeCalledTimes(1)
      expect(callbackRender).toBeCalledTimes(1)
      expect(callbackAfter).toBeCalledTimes(1)
    })

    it('`isActive.value` is `true` only if both `start()`ed and `resume()`d, regardless of call order', () => {
      const callbackBefore = vi.fn()
      const callbackRender = vi.fn()
      const callbackAfter = vi.fn()
      renderLoop.register(callbackBefore, 'before')
      renderLoop.register(callbackRender, 'render')
      renderLoop.register(callbackAfter, 'after')

      const { start, stop, resume, pause } = renderLoop

      // NOTE: stop, pause | stop, resume | start, resume
      // NOTE: stop, pause
      stop()
      pause()
      expect(renderLoop.isActive.value).toBe(false)
      // NOTE: stop, resume
      resume()
      expect(renderLoop.isActive.value).toBe(false)
      // NOTE: start, resume
      start()
      expect(renderLoop.isActive.value).toBe(true)

      // NOTE: stop, pause | start, pause | start, resume
      // NOTE: stop, pause
      stop()
      pause()
      expect(renderLoop.isActive.value).toBe(false)
      // NOTE: start, pause
      start()
      expect(renderLoop.isActive.value).toBe(false)
      // NOTE: start, resume
      resume()
      expect(renderLoop.isActive.value).toBe(true)

      // NOTE: start, resume | start, pause | start, resume
      // NOTE: start, resume
      resume()
      start()
      expect(renderLoop.isActive.value).toBe(true)
      // NOTE: start, pause
      pause()
      expect(renderLoop.isActive.value).toBe(false)
      // NOTE: start, resume
      resume()
      expect(renderLoop.isActive.value).toBe(true)

      // NOTE: start, resume | stop, resume | start, resume
      // NOTE: start, resume
      resume()
      start()
      expect(renderLoop.isActive.value).toBe(true)
      // NOTE: stop, resume
      stop()
      expect(renderLoop.isActive.value).toBe(false)
      // NOTE: start, resume
      start()
      expect(renderLoop.isActive.value).toBe(true)

      // NOTE: make some random calls
      const ons = [start, resume]
      const offs = [stop, pause]
      const onsAndOffs = [start, stop, resume, pause]
      const TEST_COUNT = 100

      for (let i = 0; i < TEST_COUNT; i++) {
        const ARRAY_COUNT = 25 + Math.floor(Math.random() * 10)
        const _offs = Array.from({ length: ARRAY_COUNT }).fill(0).map(() => choose(offs))
        _offs.forEach(fn => fn())
        expect(renderLoop.isActive.value).toBe(false)
        shuffle(ons)
        ons.forEach(fn => fn())
        expect(renderLoop.isActive.value).toBe(true)
      }

      for (let i = 0; i < TEST_COUNT; i++) {
        const ARRAY_COUNT = 25 + Math.floor(Math.random() * 10)
        const _onsAndOffs = Array.from({ length: ARRAY_COUNT }).fill(0).map(() => choose(onsAndOffs))
        _onsAndOffs.forEach(fn => fn())
        shuffle(offs)
        offs[0]()
        expect(renderLoop.isActive.value).toBe(false)
        shuffle(ons)
        ons.forEach(fn => fn())
        expect(renderLoop.isActive.value).toBe(true)
      }
    })
  })
})

function choose(array: any[]) {
  const i = Math.floor(Math.random() * array.length)
  return array[i]
}

function shuffle(array: any[]) {
  let currentIndex = array.length
  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }
  return array
};
