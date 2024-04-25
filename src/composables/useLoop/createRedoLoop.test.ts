import { createRedoLoop } from './createRedoLoop'
import { createLoop } from './createLoop'

interface TestArg { s: string }
let redoLoop = createRedoLoop<TestArg>()
let otherLoop = createLoop<TestArg>({ callbackArg: { s: 'my string' } })
let fn = () => { }

describe('createRedoLoop', () => {
  beforeEach(() => {
    redoLoop = createRedoLoop()
    otherLoop = createLoop<TestArg>({ callbackArg: { s: 'my string' } })
    fn = () => { }
  })

  describe('hook.on', () => {
    it('adds a function', () => {
      redoLoop.updateHook.on(fn, 0)
      expect(redoLoop.updateHook.count).toBe(1)

      redoLoop.renderTakeoverHook.on(fn, 0)
      expect(redoLoop.renderTakeoverHook.count).toBe(1)
    })
    it('can be redoneOnto another loop', () => {
      redoLoop.updateHook.on(fn, 0)
      redoLoop.renderTakeoverHook.on(fn, 0)
      redoLoop.redoOnto(otherLoop)

      expect(otherLoop.updateHook.count).toBe(1)
      expect(otherLoop.renderTakeoverHook.count).toBe(1)
    })
    it('can be off()d', () => {
      const api0 = redoLoop.updateHook.on(fn, 0)
      const api1 = redoLoop.renderTakeoverHook.on(fn, 0)

      api0.off()
      expect(redoLoop.updateHook.count).toBe(0)
      api1.off()
      expect(redoLoop.renderTakeoverHook.count).toBe(0)
    })
    it('can be off()d after redoOnto()', () => {
      const api0 = redoLoop.updateHook.on(fn, 0)
      const api1 = redoLoop.renderTakeoverHook.on(fn, 0)
      redoLoop.redoOnto(otherLoop)
      expect(otherLoop.updateHook.count).toBe(1)
      expect(otherLoop.renderTakeoverHook.count).toBe(1)

      api0.off()
      expect(otherLoop.updateHook.count).toBe(0)

      api1.off()
      expect(otherLoop.renderTakeoverHook.count).toBe(0)
    })
    describe('destructured', () => {
      it('can be off()d', () => {
        const on = redoLoop.updateHook.on
        const { off } = on(fn, 0)
        expect(redoLoop.updateHook.count).toBe(1)
        off()
        expect(redoLoop.updateHook.count).toBe(0)
      })
      it('can be off()d after redoOnto()', () => {
        const on = redoLoop.updateHook.on
        const { off } = on(fn, 0)
        redoLoop.redoOnto(otherLoop)
        expect(otherLoop.updateHook.count).toBe(1)
        off()
        expect(otherLoop.updateHook.count).toBe(0)
      })
    })
  })

  describe('pausable', () => {
    it('can be paused', () => {
      redoLoop.pausable.resume()
      redoLoop.pausable.pause()
      expect(redoLoop.pausable.isActive.value).toBe(false)
    })
    it('can be resumed', () => {
      redoLoop.pausable.pause()
      redoLoop.pausable.resume()
      expect(redoLoop.pausable.isActive.value).toBe(true)
    })
    it('can be paused after redoOnto', () => {
      const { pause, resume, isActive } = redoLoop.pausable
      pause()
      expect(isActive.value).toBe(false)

      resume()
      expect(isActive.value).toBe(true)

      redoLoop.redoOnto(otherLoop)
      expect(otherLoop.pausable.isActive.value).toBe(true)
      expect(isActive.value).toBe(true)

      pause()
      expect(otherLoop.pausable.isActive.value).toBe(false)
      expect(isActive.value).toBe(false)

      resume()
      expect(otherLoop.pausable.isActive.value).toBe(true)
      expect(isActive.value).toBe(true)
    })

    it('syncs original isActive after redoOnto', () => {
      const { isActive } = redoLoop.pausable
      redoLoop.redoOnto(otherLoop)

      otherLoop.pausable.pause()
      expect(isActive.value).toBe(false)

      otherLoop.pausable.resume()
      expect(isActive.value).toBe(true)

      otherLoop.pausable.pause()
      expect(isActive.value).toBe(false)
    })

    describe('destructured', () => {
      it('can be paused', () => {
        const { pause, resume, isActive } = redoLoop.pausable
        resume()
        pause()
        expect(isActive.value).toBe(false)
      })
      it('can be resumed', () => {
        const { pause, resume, isActive } = redoLoop.pausable
        pause()
        resume()
        expect(isActive.value).toBe(true)
      })
    })
  })
})
