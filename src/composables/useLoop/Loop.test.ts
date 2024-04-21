import { create } from './Loop'

interface CallbackArg { delta: number }

let loop = create<CallbackArg>()
const calls: string[] = []
let spy = vi.fn((s?: string) => { calls.push(s ?? 'null') })
const fn = (s: string) => () => spy(s)

describe('', () => {
  beforeEach(() => {
    loop = create()
    spy = vi.fn((s?: string) => { calls.push(s ?? 'null') })
    calls.length = 0
  })
  describe('bind', () => {
    it('can be bound', () => {
      expect(loop.bind({ callbackArg: { delta: 0 } })).toBe(true)
    })
  })

  describe('trigger', () => {
    it('fires if bound', () => {
      loop.on(fn('1a'), 1)
      loop.bind({ callbackArg: { delta: 0 } })
      loop.trigger()
      expect(spy).toBeCalledTimes(1)
    })
    it('does not fire if not bound', () => {
      loop.on(fn('1a'), 1)
      loop.trigger()
      expect(spy).not.toBeCalled()
    })
    it('fires all `on`d functions in order of priority and insertion', () => {
      loop.on(fn('1a'), 1)
      loop.on(fn('-'), Number.NEGATIVE_INFINITY)
      loop.on(fn('+'), Number.POSITIVE_INFINITY)
      loop.bind({ callbackArg: { delta: 0 } })
      loop.on(fn('0'), 0)
      loop.on(fn('1b'), 1)
      loop.on(fn('-1'), -1)
      loop.trigger()
      expect(calls.join(' ')).toBe('- -1 0 1a 1b +')
    })

    it('passes `callbackArg` from `bind`', () => {
      const calls: number[] = []
      const spy0 = vi.fn((arg: { delta: number }) => calls.push(arg.delta))
      const spy1 = vi.fn((arg: { delta: number }) => calls.push(arg.delta))
      loop.on(spy0)
      const callbackArg = { delta: 1 }
      loop.bind({ callbackArg })
      loop.on(spy1)

      loop.trigger()
      expect(calls.join(' ')).toBe('1 1')

      callbackArg.delta = 2
      loop.trigger()
      expect(calls.join(' ')).toBe('1 1 2 2')
    })
  })

  describe('defaultRender', () => {
    it('fires', () => {
      loop.bind({
        callbackArg: { delta: 0 },
        defaultRender: fn('defaultRender'),
      })
      loop.trigger()
      expect(spy).toBeCalledTimes(1)
    })
    it('does not fire if any `on` fn has a priority higher than 0', () => {
      loop.bind({
        callbackArg: { delta: 0 },
        defaultRender: fn('defaultRender'),
      })
      loop.trigger()
      expect(spy).toBeCalledTimes(1)

      const { off } = loop.hook.on(() => {}, 0.01)
      loop.trigger()
      expect(spy).toBeCalledTimes(1)

      off()
      loop.trigger()
      expect(spy).toBeCalledTimes(2)
    })
  })

  describe('onBeforeLoop', () => {
    it('fires before the loop', () => {
      loop.bind({
        callbackArg: { delta: 0 },
        onAfterLoop: fn('onAfterLoop'),
        onBeforeLoop: fn('onBeforeLoop'),
      })
      loop.on(fn('negativeInfinity'), Number.NEGATIVE_INFINITY)
      loop.on(fn('positiveInfinity'), Number.POSITIVE_INFINITY)
      loop.on(fn('priority 1'), 1)
      loop.trigger()

      expect(calls[0]).toBe('onBeforeLoop')
    })
  })

  describe('onAfterLoop', () => {
    it('fires after the loop', () => {
      loop.bind({
        callbackArg: { delta: 0 },
        onAfterLoop: fn('onAfterLoop'),
        onBeforeLoop: fn('onBeforeLoop'),
      })
      loop.on(fn('negativeInfinity'), Number.NEGATIVE_INFINITY)
      loop.on(fn('positiveInfinity'), Number.POSITIVE_INFINITY)
      loop.on(fn('priority 1'), 1)
      loop.trigger()

      expect(calls[calls.length - 1]).toBe('onAfterLoop')
    })
  })
})
