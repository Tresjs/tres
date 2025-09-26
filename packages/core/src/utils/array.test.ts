import { shuffle } from 'radashi'
import { filterInPlace } from './array'

describe('filterInPlace', () => {
  it('returns the passed array', () => {
    const arr = [1, 2, 3]
    const result = filterInPlace(arr, v => v !== 0)
    expect(result).toBe(arr)
  })
  it('removes a single occurence', () => {
    const arr = [1, 2, 3]
    filterInPlace(arr, v => v !== 1)
    expect(arr).toStrictEqual([2, 3])
  })
  it('removes every occurence 0', () => {
    const arr = [1, 1, 2, 1, 3, 1]
    filterInPlace(arr, v => v !== 1)
    expect(arr).toStrictEqual([2, 3])
  })

  it('removes every occurence 1', () => {
    const [a, b, c] = [{}, {}, {}]
    const COUNT = 400
    const arr = []
    for (const val of [a, b, c]) {
      for (let i = 0; i < COUNT; i++) {
        arr.push(val)
      }
    }
    shuffle(arr)

    let filtered = [...arr]
    filterInPlace(arr, v => v !== b)
    filtered = filtered.filter(v => v !== b)
    expect(arr).toStrictEqual(filtered)

    filterInPlace(arr, v => v !== c)
    filtered = filtered.filter(v => v !== c)
    expect(arr).toStrictEqual(filtered)

    filterInPlace(arr, v => v !== a)
    expect(arr).toStrictEqual([])
  })

  it('sends an index to the callbackFn', () => {
    const arr = 'abcdefghi'.split('')
    filterInPlace(arr, (_, i) => i % 2 === 0)
    expect(arr).toStrictEqual('acegi'.split(''))
  })
})
