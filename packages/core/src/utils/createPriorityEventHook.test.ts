import { createPriorityEventHook } from './createPriorityEventHook'

let updateHook = createPriorityEventHook()

describe('createPrioritizableEventHook', () => {
  beforeEach(() => {
    updateHook = createPriorityEventHook()
  })

  describe('count', () => {
    it('is initially 0', () => {
      expect(updateHook.count).toBe(0)
    })
    it('increases when hooks are added with on', () => {
      for (const i of getArray0ToN(10)) {
        updateHook.on(() => {})
        expect(updateHook.count).toBe(i + 1)
      }
    })
    it('decreases when hooks are removed with off', () => {
      const fns = []
      for (const i of getArray0ToN(10)) {
        fns.push(() => {})
        updateHook.on(fns[i])
      }
      let count = updateHook.count
      for (const fn of fns) {
        updateHook.off(fn)
        expect(updateHook.count).toBe(count - 1)
        count--
      }
    })
  })
  describe('on', () => {
    it('adds events without priority', () => {
      const s = 'abcdefg'
      let result = ''
      for (const letter of s.split('')) {
        updateHook.on(() => (result += letter + letter))
      }
      updateHook.trigger()
      expect(result).toBe('aabbccddeeffgg')
    })
    it('adds events without priority at priority 0', () => {
      const result = []
      for (const i of [-3, -2, -1, 0, 1, 2, 3]) {
        const priority = i % 2 ? i : 0
        if (priority === 0) {
          updateHook.on(() => (result.push(i)))
        }
        else {
          updateHook.on(() => (result.push(i)), priority)
        }
      }
      updateHook.trigger()
      expect(result).toStrictEqual([-3, -1, -2, 0, 2, 1, 3])
    })
    it('adds events with priority', () => {
      const NUM_TESTS = 10
      for (let i = 0; i < NUM_TESTS; i++) {
        let result = ''
        const arr = shuffle(getArray0ToN(10))
        for (const priority of arr) {
          updateHook.on(() => (result += priority), priority)
        }
        updateHook.trigger()
        expect(result).toBe('0123456789')
      }
    })
    it('adds events with negative priority', () => {
      const NUM_TESTS = 10
      for (let i = 0; i < NUM_TESTS; i++) {
        let result = ''
        const arr = shuffle(getArray0ToN(10))
        for (const priority of arr) {
          updateHook.on(() => (result += priority), -priority)
        }
        updateHook.trigger()
        expect(result).toBe('9876543210')
      }
    })
    it('adds events with positive and negative priority', () => {
      const NUM_TESTS = 10
      for (let i = 0; i < NUM_TESTS; i++) {
        let result = ''
        const arr = shuffle(getArray0ToN(10))
        for (const priority of arr) {
          updateHook.on(() => (result += priority), priority - 4)
        }
        updateHook.trigger()
        expect(result).toBe('0123456789')
      }
    })
    it('sorts events by priority then insert order', () => {
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
          updateHook.on(() => (result.push(msg)), priority)
        }
        updateHook.trigger()
        expect(result).toStrictEqual(
          '0.0|0.1|0.2|1.0|1.1|1.2|2.0|2.1|2.2|3.0|3.1|3.2'.split('|'),
        )
      }
    })
    describe('... with an event added twice', () => {
      it('triggers once', () => {
        let result = ''
        const fn0 = () => { result += '0' }
        updateHook.on(fn0)
        updateHook.on(fn0, 1)
        updateHook.on(fn0, 2)
        updateHook.trigger()
        expect(result).toBe('0')
      })
      it('is counted once', () => {
        const fn0 = () => { }
        const fn1 = () => { }
        updateHook.on(fn0)
        updateHook.on(fn1)
        updateHook.on(fn0)
        expect(updateHook.count).toBe(2)
      })
      it('uses latest insert order', () => {
        let result = ''
        const fn0 = () => { result += '0' }
        const fn1 = () => { result += '1' }
        updateHook.on(fn0)
        updateHook.on(fn1)
        updateHook.on(fn0)
        updateHook.trigger()
        expect(result).toBe('10')
      })
      it('uses latest priority', () => {
        let result = ''
        const fn0 = () => { result += '0' }
        const fn1 = () => { result += '1' }
        updateHook.on(fn0, 0)
        updateHook.on(fn1, 1)
        updateHook.on(fn0, 2)
        updateHook.trigger()
        expect(result).toBe('10')
      })
    })
    it('returns an object with `off`', () => {
      let result = ''
      const fn0 = () => { result += '0' }
      const fn1 = () => { result += '1' }
      const off0 = updateHook.on(fn0).off
      const off1 = updateHook.on(fn1).off
      updateHook.trigger()
      expect(result).toBe('01')

      result = ''
      off0()
      updateHook.trigger()
      expect(result).toBe('1')

      result = ''
      off1()
      updateHook.trigger()
      expect(result).toBe('')
    })
  })

  describe('off', () => {
    it('removes the passed event', () => {
      let result = ''
      const fn0 = () => { result += '0' }
      const fn1 = () => { result += '1' }
      updateHook.on(fn0)
      updateHook.on(fn1)
      updateHook.trigger()
      expect(result).toBe('01')

      updateHook.off(fn0)
      updateHook.trigger()
      expect(result).toBe('011')

      updateHook.off(fn1)
      updateHook.trigger()
      expect(result).toBe('011')

      updateHook.on(fn0)
      updateHook.off(fn0)
      updateHook.trigger()
      expect(result).toBe('011')
    })

    it('does nothing if hook does not contain passed event', () => {
      let result = ''
      const fn0 = () => { result += '0' }
      const fn1 = () => { result += '1' }
      updateHook.on(fn0)
      updateHook.on(fn1)
      updateHook.trigger()
      expect(result).toBe('01')

      updateHook.off(fn1)
      updateHook.trigger()
      expect(result).toBe('010')

      updateHook.off(fn1)
      updateHook.trigger()
      expect(result).toBe('0100')
    })
  })

  describe('trigger', () => {
    it('calls added events', () => {
      let result = ''
      const fn0 = () => { result += '0' }
      const fn1 = () => { result += '1' }
      updateHook.on(fn0)
      updateHook.on(fn1)

      updateHook.trigger()
      expect(result).toBe('01')
    })
    it('calls added events with an argument', () => {
      let result = ''
      const fn0 = (i: number) => { result += `${i}` }
      const fn1 = (i: number) => { result += `${1 + i}` }
      updateHook.on(fn0)
      updateHook.on(fn1)

      updateHook.trigger(2)
      expect(result).toBe('23')

      updateHook.trigger(7)
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
