import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createReadyEventHook } from './index.js'

describe('createReadyEventHook', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('createReadyEventHook(getIsReady)', () => {
    it('calls getIsReady when created', () => {
      const getIsReady = vi.fn(() => true)
      createReadyEventHook(getIsReady, null)
      expect(getIsReady).toBeCalled()
    })

    it('calls getIsReady periodically', () => {
      const fn = vi.fn(() => false)
      createReadyEventHook(fn, null, 1)
      vi.advanceTimersByTime(1000)
      expect(fn).toHaveBeenCalledTimes(1000 + 1)
    })

    it('calls getIsReady periodically, but only until `getIsReady()` is truthy', () => {
      let i = 0
      const fn0 = () => {
        i++
        return i === 5
      }
      createReadyEventHook(fn0, null)
      vi.advanceTimersByTime(1000)
      expect(i).toBe(5)

      i = -1
      const fn1 = () => {
        i++
        return i
      }
      createReadyEventHook(fn1 as any, null)
      vi.advanceTimersByTime(1000)
      expect(i).toBe(1)
    })

    it('calls getIsReady periodically, but only while not cancelled', () => {
      const fn = vi.fn(() => false)
      const { cancel } = createReadyEventHook(fn, null, 1)
      vi.advanceTimersByTime(99)
      cancel()
      vi.advanceTimersByTime(1000)
      expect(fn).toHaveBeenCalledTimes(100)
    })
  })

  describe('createReadyEventHook(getIsReady, intervalMs)', () => {
    it('calls getIsReady at the provided interval', () => {
      const fn = vi.fn(() => false)
      createReadyEventHook(fn, null, 100)
      expect(fn).toHaveBeenCalledTimes(1)
      vi.advanceTimersByTime(99)
      expect(fn).toHaveBeenCalledTimes(1)
      vi.advanceTimersByTime(1000)
      expect(fn).toHaveBeenCalledTimes(10 + 1)
      vi.advanceTimersByTime(5000)
      expect(fn).toHaveBeenCalledTimes(50 + 10 + 1)
    })
  })

  describe('createReadyEventHook().on', () => {
    it('registers a function and calls it once `getIsReady() === true`', () => {
      const fn = vi.fn()
      const { on } = createReadyEventHook(trueIfCalledNTimes(10), null)

      on(fn)
      vi.advanceTimersByTime(10000)

      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('calls registered functions with args', () => {
      const fn0 = vi.fn()
      const fn1 = vi.fn()
      const arg0 = { foo: 'bar' }
      const arg1 = { baz: 'boo' }
      const { on } = createReadyEventHook(() => true, [arg0, arg1])

      on(fn0)
      on(fn1)

      expect(fn0).toHaveBeenCalledWith([{ foo: 'bar' }, { baz: 'boo' }])
      expect(fn1).toHaveBeenCalledWith([{ foo: 'bar' }, { baz: 'boo' }])
    })

    it('calls a function immediately if `getIsReady() === true`', () => {
      const fn = vi.fn()
      const { on } = createReadyEventHook(() => true, null)

      on(fn)

      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('calls functions with arg immediately if `getIsReady() === true`', () => {
      const fn0 = vi.fn()
      const fn1 = vi.fn()
      const arg = { foo: 'bar' }
      const { on } = createReadyEventHook(() => true, arg)

      on(fn0)
      on(fn1)

      expect(fn0).toHaveBeenCalledWith({ foo: 'bar' })
      expect(fn1).toHaveBeenCalledWith({ foo: 'bar' })
    })

    it('can register many functions, one at a time', () => {
      const fns = Array.from({ length: 100 })
        .fill(0)
        .map(_ => vi.fn())

      const { on } = createReadyEventHook(trueIfCalledNTimes(10), null)
      fns.forEach(fn => on(fn))
      vi.advanceTimersByTime(10000)

      for (const fn of fns) {
        expect(fn).toHaveBeenCalledTimes(1)
      }
    })
  })

  describe('createReadyEventHook().off(fn)', () => {
    it('unregisters a function', () => {
      const fns = Array.from({ length: 100 })
        .fill(0)
        .map(_ => vi.fn())

      const { on, off } = createReadyEventHook(trueIfCalledNTimes(10), null)
      fns.forEach(fn => on(fn))

      const offedFns = new Set()
      fns.forEach((fn) => {
        if (Math.random() < 0.5) {
          offedFns.add(fn)
          off(fn)
        }
      })
      vi.advanceTimersByTime(10000)

      fns.forEach((fn) => {
        expect(fn).toHaveBeenCalledTimes(offedFns.has(fn) ? 0 : 1)
      })
    })
  })

  describe('createReadyEventHook().on(fn).off()', () => {
    it('unregisters a function', () => {
      const fns = Array.from({ length: 100 })
        .fill(0)
        .map(_ => vi.fn())

      const { on } = createReadyEventHook(trueIfCalledNTimes(10), null)

      const offedFns = new Set()
      fns.forEach((fn) => {
        const { off } = on(fn)
        if (Math.random() < 0.5) {
          offedFns.add(fn)
          off()
        }
      })
      vi.advanceTimersByTime(1000)

      fns.forEach((fn) => {
        expect(fn).toHaveBeenCalledTimes(offedFns.has(fn) ? 0 : 1)
      })
    })
  })
})

function trueIfCalledNTimes(n: number) {
  return () => {
    n = Math.max(n - 1, 0)
    return n === 0
  }
}
