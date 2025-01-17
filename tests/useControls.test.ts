import { isRef } from 'vue'
import { afterEach, describe, expect, it } from 'vitest'
import { dispose, useControls } from '/@/composables/useControls'

describe('useControls', () => {
  afterEach(() => {
    dispose()
  })

  describe('when pass a single control object', () => {
    it('should return a ref with the control value', () => {
      const { test } = useControls({ test: true })
      expect(test.value).toBe(true)
      expect(isRef(test)).toBe(true)
    })

    it('should handle control with options', () => {
      const { test } = useControls({
        test: {
          value: true,
          label: 'Awiwi',
          visible: false,
        },
      })
      expect(test.value).toBe(true)
      expect(isRef(test)).toBe(true)
    })
  })

  describe('when pass multiple controls', () => {
    it('should return an object with refs for each control', () => {
      const controls = useControls({ test: true, test2: 'hello' })
      expect(Object.keys(controls)).toHaveLength(2)
      expect(isRef(controls.test)).toBe(true)
      expect(isRef(controls.test2)).toBe(true)
      expect(controls.test.value).toBe(true)
      expect(controls.test2.value).toBe('hello')
    })
  })

  describe('when pass a fpsgraph', () => {
    it('should return a ref for fpsgraph', () => {
      const { fpsgraph } = useControls('fpsgraph')
      expect(isRef(fpsgraph)).toBe(true)
    })
  })

  describe('when pass a folder', () => {
    it('should return refs for controls in the folder', () => {
      const { a, b } = useControls('folder', { a: 'awiwi', b: 1 })
      expect(isRef(a)).toBe(true)
      expect(isRef(b)).toBe(true)
      expect(a.value).toBe('awiwi')
      expect(b.value).toBe(1)
    })
  })

  describe('when pass an object with numeric value and with min, max, step options', () => {
    it('should return a ref for the range value', () => {
      const { test } = useControls({
        test: {
          value: 1,
          min: 0,
          max: 10,
          step: 0.1,
        },
      })
      expect(isRef(test)).toBe(true)
      expect(test.value).toBe(1)
    })
  })
})
