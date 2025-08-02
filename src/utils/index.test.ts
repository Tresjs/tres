import * as utils from './index'

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
