import { createLoop } from './createLoop'

let loop = createLoop<{ delta: number }>({ args: { delta: 0 } })
const calls: string[] = []
let fn = vi.fn((s?: string) => { calls.push(s ?? 'null')})
const f = (s: string) => () => fn(s)

describe('', () => {
  beforeEach(() => {
    loop = createLoop<{delta: number}>({ args: { delta: 0 }})
    fn = vi.fn((s?: string) => { calls.push(s ?? 'null')})
    calls.length = 0
  })

  describe('trigger', () => {
    it('fires all `on`d functions in order of priority and insertion', () => {
      loop.on(f('1a'), 1)
      loop.on(f('-'), Number.NEGATIVE_INFINITY)
      loop.on(f('+'), Number.POSITIVE_INFINITY)
      loop.on(f('0'), 0)
      loop.on(f('1b'), 1)
      loop.on(f('-1'), -1)
      loop.trigger()

      expect(calls.join(' ')).toBe('- -1 0 1a 1b +')
    })
  })

  describe('defaultRender', () => {
    it('fires', () => {
      const loop = createLoop<{ delta: number }>({ 
        args: { delta: 0 },
        defaultRender: f('defaultRender')
      })
      loop.trigger()
      expect(fn).toBeCalledTimes(1)
    })
    it('does not fire if any `on` fn has a priority higher than 0', () => {
      const loop = createLoop<{ delta: number }>({ 
        args: { delta: 0 },
        defaultRender: f('defaultRender')
      })
      loop.trigger()
      expect(fn).toBeCalledTimes(1)

      const { off } = loop.on(() => {}, 0.01)
      loop.trigger()
      expect(fn).toBeCalledTimes(1)

      off()
      loop.trigger()
      expect(fn).toBeCalledTimes(2)
    })
  })

  describe('onBeforeLoop', () => {
    it('fires before the loop', () => {
      const loop = createLoop({ 
        args: { delta: 0 }, 
        onAfterLoop: f('onAfterLoop'),
        onBeforeLoop: f('onBeforeLoop'),
      })
      loop.on(f('negativeInfinity'), Number.NEGATIVE_INFINITY)
      loop.on(f('positiveInfinity'), Number.POSITIVE_INFINITY)
      loop.on(f('priority 1'), 1)
      loop.trigger()

      expect(calls[0]).toBe('onBeforeLoop')
    })
  })

  describe('onAfterLoop', () => {
    it('fires after the loop', () => {
      const loop = createLoop({ 
        args: { delta: 0 }, 
        onAfterLoop: f('onAfterLoop'),
        onBeforeLoop: f('onBeforeLoop'),
      })
      loop.on(f('negativeInfinity'), Number.NEGATIVE_INFINITY)
      loop.on(f('positiveInfinity'), Number.POSITIVE_INFINITY)
      loop.on(f('priority 1'), 1)
      loop.trigger()

      expect(calls[calls.length-1]).toBe('onAfterLoop')
    })
  })
})
