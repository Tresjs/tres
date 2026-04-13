import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useCreateRafLoop } from './index'

describe('useCreateRafLoop', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('provides numeric delta and elapsed values to before hook', async () => {
    const deltas: number[] = []
    const elapseds: number[] = []

    const loop = useCreateRafLoop(() => {})
    loop.onBeforeLoop(({ delta, elapsed }) => {
      deltas.push(delta)
      elapseds.push(elapsed)
    })

    loop.start()
    await vi.advanceTimersByTimeAsync(100)
    loop.stop()

    expect(deltas.length).toBeGreaterThan(0)
    expect(typeof deltas[0]).toBe('number')
    expect(elapseds.length).toBeGreaterThan(0)
    expect(typeof elapseds[0]).toBe('number')
  })

  it('delta values are non-negative', async () => {
    const deltas: number[] = []
    const loop = useCreateRafLoop(() => {})
    loop.onBeforeLoop(({ delta }) => deltas.push(delta))

    loop.start()
    await vi.advanceTimersByTimeAsync(50)
    loop.stop()

    expect(deltas.every(d => d >= 0)).toBe(true)
  })
})
