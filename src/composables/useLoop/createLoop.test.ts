import { createLoop } from './createLoop'

interface CallbackArg { delta: number }

let callbackArg = { delta: 0 }
let loop = createLoop<CallbackArg>({ callbackArg })
const calls: string[] = []
let spy = vi.fn((s?: string) => { calls.push(s ?? 'null') })
const fn = (s: string) => () => spy(s)

describe('loop', () => {
  beforeEach(() => {
    callbackArg = { delta: 0 }
    loop = createLoop({ callbackArg })
    spy = vi.fn((s?: string) => { calls.push(s ?? 'null') })
    calls.length = 0
  })

  describe('trigger', () => {
    it('fires `on`d functions', () => {
      loop.updateHook.on(fn('1a'), 1)
      loop.trigger()
      expect(spy).toBeCalledTimes(1)
    })
    it('fires all `on`d functions in order of priority and insertion', () => {
      loop.updateHook.on(fn('1a'), 1)
      loop.updateHook.on(fn('-'), Number.NEGATIVE_INFINITY)
      loop.updateHook.on(fn('+'), Number.POSITIVE_INFINITY)
      loop.updateHook.on(fn('0'), 0)
      loop.updateHook.on(fn('1b'), 1)
      loop.updateHook.on(fn('-1'), -1)
      loop.trigger()
      expect(calls.join(' ')).toBe('- -1 0 1a 1b +')
    })

    it('passes `callbackArg` from `create`', () => {
      const calls: number[] = []
      const spy0 = vi.fn((arg: { delta: number }) => calls.push(arg.delta))
      const spy1 = vi.fn((arg: { delta: number }) => calls.push(arg.delta))
      loop.updateHook.on(spy0)
      loop.updateHook.on(spy1)

      callbackArg.delta = 1
      loop.trigger()
      expect(calls.join(' ')).toBe('1 1')

      callbackArg.delta = 2
      loop.trigger()
      expect(calls.join(' ')).toBe('1 1 2 2')
    })
  })

  describe('defaultRender', () => {
    it('fires', () => {
      const loop = createLoop({
        callbackArg: { delta: 0 },
        defaultRender: fn('defaultRender'),
      })
      loop.trigger()
      expect(spy).toBeCalledTimes(1)
    })
    it('does not fire if `renderTakeoverHook` holds any functions', () => {
      const loop = createLoop({
        callbackArg: { delta: 0 },
        defaultRender: fn('defaultRender'),
      })
      loop.trigger()
      expect(spy).toBeCalledTimes(1)

      const { off: off0 } = loop.renderTakeoverHook.on(() => {}, 0.01)
      const { off: off1 } = loop.renderTakeoverHook.on(() => {}, 0.01)

      loop.trigger()
      expect(spy).toBeCalledTimes(1)

      off0()
      loop.trigger()
      expect(spy).toBeCalledTimes(1)

      off1()
      loop.trigger()
      expect(spy).toBeCalledTimes(2)
    })
  })

  describe('onBeforeLoop', () => {
    it('fires before the loop', () => {
      const loop = createLoop({
        callbackArg: { delta: 0 },
        onAfterLoop: fn('onAfterLoop'),
        onBeforeLoop: fn('onBeforeLoop'),
      })
      loop.updateHook.on(fn('negativeInfinity'), Number.NEGATIVE_INFINITY)
      loop.updateHook.on(fn('positiveInfinity'), Number.POSITIVE_INFINITY)
      loop.updateHook.on(fn('priority 1'), 1)
      loop.trigger()

      expect(calls[0]).toBe('onBeforeLoop')
    })
  })

  describe('onAfterLoop', () => {
    it('fires after the loop', () => {
      const loop = createLoop({
        callbackArg: { delta: 0 },
        onAfterLoop: fn('onAfterLoop'),
        onBeforeLoop: fn('onBeforeLoop'),
      })
      loop.updateHook.on(fn('negativeInfinity'), Number.NEGATIVE_INFINITY)
      loop.updateHook.on(fn('positiveInfinity'), Number.POSITIVE_INFINITY)
      loop.updateHook.on(fn('priority 1'), 1)
      loop.trigger()

      expect(calls[calls.length - 1]).toBe('onAfterLoop')
    })
  })
})
