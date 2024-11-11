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

  it('finds camelCase fields if camelCase is passed', () => {
    const instance = { aBcDe: { fGhIj: { kLm: 0 } } }

    // NOTE: This is the usual case. No camel case. Only kebab.
    let result = utils.resolve(instance, 'a-bc-de-f-gh-ij-k-lm')
    expect(result.target).toBe(instance.aBcDe.fGhIj)
    expect(result.key).toBe('kLm')

    result = utils.resolve(instance, 'aBcDe-fGhIj-kLm')
    expect(result.target).toBe(instance.aBcDe.fGhIj)
    expect(result.key).toBe('kLm')

    result = utils.resolve(instance, 'a-bcDe-fGhIj-kLm')
    expect(result.target).toBe(instance.aBcDe.fGhIj)
    expect(result.key).toBe('kLm')

    result = utils.resolve(instance, 'aBc-de-f-gh-ij-k-lm')
    expect(result.target).toBe(instance.aBcDe.fGhIj)
    expect(result.key).toBe('kLm')
  })

  describe('array indices', () => {
    it('traverses arrays if indices exist', () => {
      const instance = { ab: { cd: [{}, {}, { ef: { gh: { ij: 0, kl: [{}, { xx: {} }] } } }] } }

      let result = utils.resolve(instance, 'ab-cd-0-ef-gh-ij-xx-yy-zz')
      expect(result.target).toBe(instance.ab.cd[0])
      expect(result.key).toBe('efGhIjXxYyZz')

      result = utils.resolve(instance, 'ab-cd-1-ef-gh-ij-xx-yy-zz')
      expect(result.target).toBe(instance.ab.cd[1])
      expect(result.key).toBe('efGhIjXxYyZz')

      result = utils.resolve(instance, 'ab-cd-2-ef-gh-ij-xx-yy-zz')
      expect(result.target).toBe(instance.ab.cd[2].ef.gh.ij)
      expect(result.key).toBe('xxYyZz')

      result = utils.resolve(instance, 'ab-cd-2-ef-gh-kl-0-xx-yy-zz')
      expect(result.target).toBe(instance.ab.cd[2].ef.gh.kl[0])
      expect(result.key).toBe('xxYyZz')

      result = utils.resolve(instance, 'ab-cd-2-ef-gh-kl-1-xx-yy-zz')
      expect(result.target).toBe(instance.ab.cd[2].ef.gh.kl[1].xx)
      expect(result.key).toBe('yyZz')
    })

    it('adds non-existant array indices to the key', () => {
      const instance = { ab: { cd: [{}, {}, { ef: { gh: { ij: 0, kl: [{}, { xx: {} }] } } }] } }

      let result = utils.resolve(instance, 'ab-cd-2-ef-gh-kl-2-xx-yy-zz')
      expect(result.target).toBe(instance.ab.cd[2].ef.gh.kl)
      expect(result.key).toBe('2XxYyZz')

      result = utils.resolve(instance, 'ab-cd-2-ef-gh-iiii-2-xx-yy-zz')
      expect(result.target).toBe(instance.ab.cd[2].ef.gh)
      expect(result.key).toBe('iiii2XxYyZz')

      result = utils.resolve(instance, 'ab-cd-3-ef-gh')
      expect(result.target).toBe(instance.ab.cd)
      expect(result.key).toBe('3EfGh')

      result = utils.resolve(instance, 'ab-cd-2-ef-gh-kl-2')
      expect(result.target).toBe(instance.ab.cd[2].ef.gh.kl)
      expect(result.key).toBe('2')

      // NOTE: This leads to ambiguity.
      result = utils.resolve(instance, '0-1-12-24')
      expect(result.target).toBe(instance)
      expect(result.key).toBe('011224')
    })
  })
})

describe('setPixelRatio', () => {
  const INITIAL_DPR = 1
  let dpr = INITIAL_DPR
  const mockRenderer = {
    setPixelRatio: (n: number) => { dpr = n },
    getPixelRatio: () => dpr,
  }
  const setPixelRatioSpy = vi.spyOn(mockRenderer, 'setPixelRatio')

  beforeEach(() => {
    dpr = 1
    setPixelRatioSpy.mockClear()
  })

  describe('setPixelRatio(renderer: WebGLRenderer, systemDpr: number)', () => {
    it('calls the renderer\'s setPixelRatio method with systemDpr', () => {
      expect(setPixelRatioSpy).not.toBeCalled()
      utils.setPixelRatio(mockRenderer, 2)
      expect(setPixelRatioSpy).toBeCalledWith(2)

      utils.setPixelRatio(mockRenderer, 2.1)
      expect(setPixelRatioSpy).toBeCalledWith(2.1)

      utils.setPixelRatio(mockRenderer, 1.44444)
      expect(setPixelRatioSpy).toBeCalledWith(1.44444)
    })
    it('does not set the renderer\'s pixelRatio if systemDpr === pixelRatio', () => {
      utils.setPixelRatio(mockRenderer, 1)
      expect(setPixelRatioSpy).not.toBeCalled()

      utils.setPixelRatio(mockRenderer, 2)
      expect(setPixelRatioSpy).toBeCalledTimes(1)

      utils.setPixelRatio(mockRenderer, 2)
      expect(setPixelRatioSpy).toBeCalledTimes(1)

      utils.setPixelRatio(mockRenderer, 1)
      expect(setPixelRatioSpy).toBeCalledTimes(2)

      utils.setPixelRatio(mockRenderer, 1)
      expect(setPixelRatioSpy).toBeCalledTimes(2)
    })
    it('does not throw if passed a "renderer" without a `setPixelRatio` method', () => {
      const mockSVGRenderer = {}
      expect(() => utils.setPixelRatio(mockSVGRenderer, 2)).not.toThrow()
    })
    it('calls `setPixelRatio` even if passed a "renderer" without a `getPixelRatio` method', () => {
      const mockSVGRenderer = { setPixelRatio: () => {} }
      const setPixelRatioSpy = vi.spyOn(mockSVGRenderer, 'setPixelRatio')
      expect(() => utils.setPixelRatio(mockSVGRenderer, 2)).not.toThrow()
      expect(setPixelRatioSpy).toBeCalledWith(2)
      expect(setPixelRatioSpy).toBeCalledTimes(1)

      utils.setPixelRatio(mockSVGRenderer, 1.99)
      expect(setPixelRatioSpy).toBeCalledWith(1.99)
      expect(setPixelRatioSpy).toBeCalledTimes(2)

      utils.setPixelRatio(mockSVGRenderer, 2.1)
      expect(setPixelRatioSpy).toBeCalledWith(2.1)
      expect(setPixelRatioSpy).toBeCalledTimes(3)
    })
  })

  describe('setPixelRatio(renderer: WebGLRenderer, systemDpr: number, userDpr: number)', () => {
    it('calls the renderer\'s setPixelRatio method with userDpr', () => {
      expect(setPixelRatioSpy).not.toBeCalled()
      utils.setPixelRatio(mockRenderer, 2, 100)
      expect(setPixelRatioSpy).toBeCalledWith(100)
    })
    it('does not call the renderer\'s setPixelRatio method if current dpr === new dpr', () => {
      expect(setPixelRatioSpy).not.toBeCalled()
      utils.setPixelRatio(mockRenderer, 2, 1)
      expect(setPixelRatioSpy).not.toBeCalledWith()

      utils.setPixelRatio(mockRenderer, 3, 1.4)
      expect(setPixelRatioSpy).toBeCalledTimes(1)
      expect(setPixelRatioSpy).toBeCalledWith(1.4)

      utils.setPixelRatio(mockRenderer, 3, 1.4)
      expect(setPixelRatioSpy).toBeCalledTimes(1)
      expect(setPixelRatioSpy).toBeCalledWith(1.4)

      utils.setPixelRatio(mockRenderer, 2, 1.4)
      expect(setPixelRatioSpy).toBeCalledTimes(1)
      expect(setPixelRatioSpy).toBeCalledWith(1.4)

      utils.setPixelRatio(mockRenderer, 42, 0.1)
      expect(setPixelRatioSpy).toBeCalledTimes(2)
      expect(setPixelRatioSpy).toBeCalledWith(0.1)

      utils.setPixelRatio(mockRenderer, 4, 0.1)
      expect(setPixelRatioSpy).toBeCalledTimes(2)
      expect(setPixelRatioSpy).toBeCalledWith(0.1)
    })
  })

  describe('setPixelRatio(renderer: WebGLRenderer, systemDpr: number, userDpr: [number, number])', () => {
    it('clamps systemDpr to userDpr', () => {
      utils.setPixelRatio(mockRenderer, 2, [0, 4])
      expect(setPixelRatioSpy).toBeCalledTimes(1)
      expect(setPixelRatioSpy).toBeCalledWith(2)

      utils.setPixelRatio(mockRenderer, 2, [3, 4])
      expect(setPixelRatioSpy).toBeCalledTimes(2)
      expect(setPixelRatioSpy).toBeCalledWith(3)

      utils.setPixelRatio(mockRenderer, 5, [3, 4])
      expect(setPixelRatioSpy).toBeCalledTimes(3)
      expect(setPixelRatioSpy).toBeCalledWith(4)

      utils.setPixelRatio(mockRenderer, 100, [3, 4])
      expect(setPixelRatioSpy).toBeCalledTimes(3)
      expect(setPixelRatioSpy).toBeCalledWith(4)

      utils.setPixelRatio(mockRenderer, 100, [3.5, 4])
      expect(setPixelRatioSpy).toBeCalledTimes(3)
      expect(setPixelRatioSpy).toBeCalledWith(4)

      utils.setPixelRatio(mockRenderer, 100, [3, 6.1])
      expect(setPixelRatioSpy).toBeCalledTimes(4)
      expect(setPixelRatioSpy).toBeCalledWith(6.1)

      utils.setPixelRatio(mockRenderer, 1, [2.99, 6.1])
      expect(setPixelRatioSpy).toBeCalledTimes(5)
      expect(setPixelRatioSpy).toBeCalledWith(2.99)
    })
  })
})
