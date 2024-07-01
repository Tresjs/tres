import * as utils from './index'

describe('filterInPlace', () => {
  it('returns the passed array', () => {
    const arr = [1, 2, 3]
    const result = utils.filterInPlace(arr, v => v !== 0)
    expect(result).toBe(arr)
  })
  it('removes a single occurence', () => {
    const arr = [1, 2, 3]
    utils.filterInPlace(arr, v => v !== 1)
    expect(arr).toStrictEqual([2, 3])
  })
  it('removes every occurence 0', () => {
    const arr = [1, 1, 2, 1, 3, 1]
    utils.filterInPlace(arr, v => v !== 1)
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
    utils.filterInPlace(arr, v => v !== b)
    filtered = filtered.filter(v => v !== b)
    expect(arr).toStrictEqual(filtered)

    utils.filterInPlace(arr, v => v !== c)
    filtered = filtered.filter(v => v !== c)
    expect(arr).toStrictEqual(filtered)

    utils.filterInPlace(arr, v => v !== a)
    expect(arr).toStrictEqual([])
  })

  it('sends an index to the callbackFn', () => {
    const arr = 'abcdefghi'.split('')
    utils.filterInPlace(arr, (_, i) => i % 2 === 0)
    expect(arr).toStrictEqual('acegi'.split(''))
  })
})

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

describe('resolve', () => {
  it('returns the first argument if it contains the key', () => {
    const instance = { ab: 0 }
    const { target, key } = utils.resolve(instance, 'ab')
    expect(target).toBe(instance)
    expect(key).toBe('ab')
  })
  it('splits the key by "-" and traverses the obj using the pieces', () => {
    const instance = { ab: { cd: { ef: 0 } } }
    const { target, key } = utils.resolve(instance, 'ab-cd-ef')
    expect(target).toBe(instance.ab.cd)
    expect(key).toBe('ef')
  })
  it('returns the current target holding the end of the key, and the end of the key', () => {
    const instance = { ab: { cd: { ef: { gh: 0 } } } }
    const { target, key } = utils.resolve(instance, 'ab-cd-ef')
    expect(target).toBe(instance.ab.cd)
    expect(key).toBe('ef')
  })
  it('joins pierced props as camelCase, non-greedily', () => {
    {
      const instance = { abCdEfGh: { ij: 0 } }
      const { target, key } = utils.resolve(instance, 'ab-cd-ef-gh-ij')
      expect(target).toBe(instance.abCdEfGh)
      expect(key).toBe('ij')
    }

    {
      const instance = {
        abCdEfGh: { ij: 0 },
        abCdEf: { gh: { ij: 0 } },
      }
      const { target, key } = utils.resolve(instance, 'ab-cd-ef-gh-ij')
      expect(target).toBe(instance.abCdEf.gh)
      expect(key).toBe('ij')
    }

    {
      const instance = {
        abCdEfGh: { ij: 0 },
        abCd: { ef: { gh: { ij: 0 } }, efGh: { ij: 0 } },
        abCdEf: { gh: { ij: 0 } },
      }
      const { target, key } = utils.resolve(instance, 'ab-cd-ef-gh-ij')
      expect(target).toBe(instance.abCd.ef.gh)
      expect(key).toBe('ij')
    }

    {
      const instance = {
        abCdEfGh: { ij: 0 },
        abCdEf: { ghIj: 0 },
        ab: { cdEfGhIj: 0 },
        abCd: { ef: { gh: { ij: 0 } }, efGh: { ij: 0 } },
      }
      const { target, key } = utils.resolve(instance, 'ab-cd-ef-gh-ij')
      expect(target).toBe(instance.ab)
      expect(key).toBe('cdEfGhIj')
    }
  })

  it('joins my-key-and-the-unfindable-suffix as andTheUnfindableSuffix, for key suffixes that do not exist', () => {
    expect(utils.resolve({}, 'zz').key).toBe('zz')
    expect(utils.resolve({}, 'ab-cd-ef-gh-ij').key).toBe('abCdEfGhIj')

    const instance = { ab: { cd: { ef: { gh: { ij: 0 } } } } }
    expect(utils.resolve(instance, 'ab-cd-ef-gh-ij-xx-yy-zz').key).toBe('xxYyZz')
    expect(utils.resolve(instance, 'xx-yy-zz').key).toBe('xxYyZz')
    expect(utils.resolve(instance, 'ab-xx-yy-zz').key).toBe('xxYyZz')
    expect(utils.resolve(instance, 'ab-cd-zz').key).toBe('zz')
    expect(utils.resolve(instance, 'ab-cd-xx-yy-zz').key).toBe('xxYyZz')
    expect(utils.resolve(instance, 'ab-cd-xx-yy-zz').key).toBe('xxYyZz')
  })
})
