import { createPrioritizedEventHook } from './createPrioritizedEventHook'

let hook = createPrioritizedEventHook()

describe('createPrioritizableEventHook', () => {
  beforeEach(() => {
    hook = createPrioritizedEventHook()
  })

  describe('size', () => {
    it('is initially 0', () => {
      expect(hook.size).toBe(0)
    })
    it('increases when hooks are added with on', () => {
      for (const i of getArray0ToN(10)) {
        hook.on(() => {})
        expect(hook.size).toBe(i + 1)
      }
    })
    it('decreases when hooks are removed with off', () => {
      const fns = []
      for (const i of getArray0ToN(10)) {
        fns.push(() => {})
        hook.on(fns[i])
      }
      let size = hook.size
      for (const fn of fns) {
        hook.off(fn)
        expect(hook.size).toBe(size - 1)
        size--
      }
    })
  })
  describe('on', () => {
    it('adds events without priority', () => {
      const s = 'abcdefg'
      let result = ''
      for (const letter of s.split('')) {
        hook.on(() => (result += letter + letter))
      }
      hook.trigger()
      expect(result).toBe('aabbccddeeffgg')
    })
    it('adds events without priority at priority 0', () => {
      const result = []
      for (const i of [-3, -2, -1, 0, 1, 2, 3]) {
        const priority = i % 2 ? i : 0
        if (priority === 0) {
          hook.on(() => (result.push(i)))
        }
        else {
          hook.on(() => (result.push(i)), priority)
        }
      }
      hook.trigger()
      expect(result).toStrictEqual([-3, -1, -2, 0, 2, 1, 3])
    })
    it('adds events with priority', () => {
      const NUM_TESTS = 10
      for (let i = 0; i < NUM_TESTS; i++) {
        let result = ''
        const arr = shuffle(getArray0ToN(10))
        for (const priority of arr) {
          hook.on(() => (result += priority), priority)
        }
        hook.trigger()
        expect(result).toBe('0123456789')
      }
    })
    it('adds events with negative priority', () => {
      const NUM_TESTS = 10
      for (let i = 0; i < NUM_TESTS; i++) {
        let result = ''
        const arr = shuffle(getArray0ToN(10))
        for (const priority of arr) {
          hook.on(() => (result += priority), -priority)
        }
        hook.trigger()
        expect(result).toBe('9876543210')
      }
    })
    it('adds events with positive and negative priority', () => {
      const NUM_TESTS = 10
      for (let i = 0; i < NUM_TESTS; i++) {
        let result = ''
        const arr = shuffle(getArray0ToN(10))
        for (const priority of arr) {
          hook.on(() => (result += priority), priority - 4)
        }
        hook.trigger()
        expect(result).toBe('0123456789')
      }
    })
    it('adds events, sorted by priority then insert order', () => {
      const NUM_TESTS = 10
      for (let i = 0; i < NUM_TESTS; i++) {
        const insertOrder = {}
        const getArr = () => getArray0ToN(4)
        const arr = shuffle((getArr().concat(getArr()).concat(getArr())))
        // NOTE: arr is [0,0,0,1,1,1,2,2,2,3,3,3] – shuffled
        const result = []
        for (const priority of arr) {
          if (!(priority in insertOrder)) {
            insertOrder[priority] = 0
          }
          else {
            insertOrder[priority]++
          }
          const msg = `${priority}.${insertOrder[priority]}`
          hook.on(() => (result.push(msg)), priority)
        }
        hook.trigger()
        expect(result).toStrictEqual(
          '0.0|0.1|0.2|1.0|1.1|1.2|2.0|2.1|2.2|3.0|3.1|3.2'.split('|'),
        )
      }
    })
    it('adds an event only once', () => {
      const fn0 = () => { }
      const fn1 = () => { }
      hook.on(fn0)
      hook.on(fn1)
      hook.on(fn0)
      expect(hook.size).toBe(2)
    })
    it('adds an event only once, but this may change its priority', () => {
      let result = ''
      const fn0 = () => { result += '0' }
      const fn1 = () => { result += '1' }
      hook.on(fn0)
      hook.on(fn1)
      hook.on(fn0, 10000)
      hook.trigger()
      expect(result).toBe('10')
    })
    it('returns an object with `off`', () => {
      let result = ''
      const fn0 = () => { result += '0' }
      const fn1 = () => { result += '1' }
      const off0 = hook.on(fn0).off
      const off1 = hook.on(fn1).off
      hook.trigger()
      expect(result).toBe('01')

      result = ''
      off0()
      hook.trigger()
      expect(result).toBe('1')

      result = ''
      off1()
      hook.trigger()
      expect(result).toBe('')
    })
  })

  describe('off', () => {
    it('removes the passed event', () => {
      let result = ''
      const fn0 = () => { result += '0' }
      const fn1 = () => { result += '1' }
      hook.on(fn0)
      hook.on(fn1)
      hook.trigger()
      expect(result).toBe('01')

      hook.off(fn0)
      hook.trigger()
      expect(result).toBe('011')

      hook.off(fn1)
      hook.trigger()
      expect(result).toBe('011')

      hook.on(fn0)
      hook.off(fn0)
      hook.trigger()
      expect(result).toBe('011')
    })

    it('does nothing if hook does not contain passed event', () => {
      let result = ''
      const fn0 = () => { result += '0' }
      const fn1 = () => { result += '1' }
      hook.on(fn0)
      hook.on(fn1)
      hook.trigger()
      expect(result).toBe('01')

      hook.off(fn1)
      hook.trigger()
      expect(result).toBe('010')

      hook.off(fn1)
      hook.trigger()
      expect(result).toBe('0100')
    })
  })

  describe('trigger', () => {
    it('calls added events', () => {
      let result = ''
      const fn0 = () => { result += '0' }
      const fn1 = () => { result += '1' }
      hook.on(fn0)
      hook.on(fn1)

      hook.trigger()
      expect(result).toBe('01')
    })
    it('calls added events with an argument', () => {
      let result = ''
      const fn0 = (i: number) => { result += `${i}` }
      const fn1 = (i: number) => { result += `${1 + i}` }
      hook.on(fn0)
      hook.on(fn1)

      hook.trigger(2)
      expect(result).toBe('23')

      hook.trigger(7)
      expect(result).toBe('2378')
    })
  })
})

function getArray0ToN(n: number) {
  return Array.from({ length: n }).fill(0).map((_, i) => i)
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
