import { describe, expect, it } from 'vitest'
import { createRenderer } from './createRenderer'
import type { Renderer } from '../../types'
import type { TresContext } from 'src/composables'

describe('createRenderer', () => {
  describe('createRenderer({ props: { renderer } } )', () => {
    it('returns `renderer`', async () => {
      const r = {} as Renderer
      const rr = await createRenderer({ props: { renderer: r } } as TresContext)
      expect(rr).toBe(r)
    })
  })
  describe('createRenderer({ props: { renderer: () => Renderer } } )', () => {
    it('returns `renderer`', async () => {
      const r = {} as Renderer
      const rr = await createRenderer({ props: { renderer: () => r } } as unknown as TresContext)
      expect(rr).toBe(r)
    })
  })
  describe('createRenderer({ props: { renderer: () => Promise<Renderer> } } )', () => {
    it('returns `renderer`', async () => {
      const r = {} as Renderer
      const rr = await createRenderer({ props: { renderer: () => new Promise(resolve => resolve(r)) } } as unknown as TresContext)
      expect(rr).toBe(r)
    })
  })
})
