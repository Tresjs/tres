import { createRetargetingProxy } from './createRetargetingProxy'

describe('createRetargetingProxy', () => {
  describe('const proxy = createRetargetingProxy(target)', () => {
    describe('proxy.foo = ...', () => {
      it('sets proxy.foo', () => {
        const target = { foo: 1 }
        const proxy = createRetargetingProxy(target)
        proxy.foo = 2
        expect(proxy.foo).toBe(2)
        proxy.foo = 999
        expect(proxy.foo).toBe(999)
      })

      it('sets target.foo', () => {
        const target = { foo: 1 }
        const proxy = createRetargetingProxy(target)
        proxy.foo = 2
        expect(target.foo).toBe(2)
        proxy.foo = 999
        expect(target.foo).toBe(999)
      })
    })

    describe('proxy.foo', () => {
      it('gets target.foo', () => {
        const target = { foo: 1 }
        const proxy = createRetargetingProxy(target)
        expect(proxy.foo).toBe(1)
        expect(proxy.foo).toBe(target.foo)
        proxy.foo = 2
        expect(proxy.foo).toBe(2)
        expect(proxy.foo).toBe(target.foo)
        target.foo = 3
        expect(proxy.foo).toBe(3)
        expect(proxy.foo).toBe(target.foo)
      })
    })
  })

  describe('createRetargetingProxy(_, getters)', () => {
    it('calls getter[\'foo\'] on \'result.foo\'', () => {
      const spy = vi.fn(() => 'bar')
      const getters = { foo: spy }
      const target = { }
      const proxy = createRetargetingProxy(target, getters)
      const bar = (proxy as any).foo
      expect(spy).toBeCalled()
      expect(bar).toBe('bar')
    })
    it('calls getter[\'foo\'] with target', () => {
      const spy = vi.fn(target => `bar${target.foo}`)
      const getters = { foo: spy }
      const setters = { object: (newTarget, _, __, setTarget) => setTarget(newTarget) }
      const target0 = { foo: 'baz' }
      const proxy = createRetargetingProxy(target0, getters, setters)

      const barbaz = (proxy as any).foo
      expect(spy).toBeCalledTimes(1)
      expect(barbaz).toBe('barbaz')

      const target1 = { foo: 'bar' }
      proxy.object = target1

      const barbar = (proxy as any).foo
      expect(spy).toBeCalledTimes(2)
      expect(barbar).toBe('barbar')
    })
    it('returns true for (\'foo\' in proxy), if (\'foo\' in getter)', () => {
      const getters = { foo: vi.fn(() => false) }
      const target = { }
      const proxy = createRetargetingProxy(target, getters)
      expect('foo' in proxy).toBe(true)
    })
  })

  describe('createRetargetingProxy(_, __, setters)', () => {
    it('calls setters[\'foo\'], if setting \'foo\'', () => {
      const setters = { foo: vi.fn(() => true) }
      const target = { foo: 'bar' }
      const proxy = createRetargetingProxy(target, {}, setters)
      expect(setters.foo).toHaveBeenCalledTimes(0)

      proxy.foo = 'hello'
      expect(setters.foo).toHaveBeenCalledTimes(1)
    })

    it('allows a setter to modify a passed value', () => {
      const target = { foo: 1, object: null }
      const proxy = createRetargetingProxy(target, {}, {
        foo: (newValue, currentTarget) => {
          currentTarget.foo = newValue + 1000
          return true
        },
      })
      expect(proxy.foo).toBe(1)
      proxy.foo = 2
      expect(target.foo).toBe(1002)
      proxy.foo = 999
      expect(target.foo).toBe(1999)
    })

    it('allows a setter to update a value on the target', () => {
      const setters = {
        foo: vi.fn((val, target) => {
          target.foo = val
          return true
        }),
      }
      const target = { foo: 'bar' }
      const proxy = createRetargetingProxy(target, {}, setters)
      proxy.foo = 'baz'
      expect(proxy.foo).toBe('baz')
    })

    it('can `setTarget` in a setter', () => {
      const target0 = { foo: 'bar', object: null }
      const target1 = { foo: 'baz', object: null }
      const setters = {
        object: (val, _, __, setTarget) => {
          setTarget(val)
          return true
        },
      }

      const proxy = createRetargetingProxy(target0, {}, setters)
      expect(proxy.foo).toBe('bar')

      proxy.object = target1
      expect(proxy.foo).toBe('baz')

      proxy.foo = 'zab'
      expect(proxy.foo).toBe('zab')
      expect(target1.foo).toBe('zab')
      expect(target0.foo).toBe('bar')
    })

    it('does not update oldTarget after retarget', () => {
      const oldTarget = { foo: 1, object: null }
      const newTarget = { foo: 1 }
      const proxy = createRetargetingProxy(oldTarget, {}, {
        object: (newValue, _, __, setTarget) => {
          setTarget(newValue)
          return true
        },
      })
      proxy.object = newTarget
      proxy.foo = 2
      expect(oldTarget.foo).toBe(1)
      expect(newTarget.foo).toBe(2)
      proxy.foo = 999
      expect(oldTarget.foo).toBe(1)
      expect(newTarget.foo).toBe(999)
    })

    it('does not update oldTarget after retarget, even if proxy had been closed over', () => {
      const oldTarget = { foo: 1, object: null }
      const newTarget = { foo: 1 }
      const proxy = createRetargetingProxy(oldTarget, {}, {
        object: (newValue, _, __, setTarget) => {
          setTarget(newValue)
          return true
        },
      })
      const update = () => {
        proxy.foo++
      }
      update()
      expect(oldTarget.foo).toBe(2)
      proxy.object = newTarget
      update()
      expect(oldTarget.foo).toBe(2)
      expect(newTarget.foo).toBe(2)
      update()
      expect(oldTarget.foo).toBe(2)
      expect(newTarget.foo).toBe(3)
    })
  })
})
