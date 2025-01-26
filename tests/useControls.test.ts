import { isRef, nextTick } from 'vue'
import { afterEach, describe, expect, it } from 'vitest'
import { dispose, useControls, useControlsProvider } from '/@/composables/useControls'
import { mount } from '@vue/test-utils'
import { TresLeches } from '/@/'

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
      const { folderA, folderB } = useControls('folder', { a: 'awiwi', b: 1 })
      expect(isRef(folderA)).toBe(true)
      expect(isRef(folderB)).toBe(true)
      expect(folderA.value).toBe('awiwi')
      expect(folderB.value).toBe(1)
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

  describe('cleanup', () => {
    it('should dispose controls when TresLeches component is unmounted', async () => {
      // First mount TresLeches and create some controls
      const wrapper = mount(TresLeches)
      useControls({ test: true })

      // Verify controls exist in the store
      const controls = useControlsProvider()
      expect(Object.keys(controls)).toHaveLength(1)

      // Unmount TresLeches
      wrapper.unmount()
      await nextTick()

      // Verify controls were disposed
      expect(Object.keys(controls)).toHaveLength(0)
    })
  })
})
