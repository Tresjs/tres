import { isRef } from 'vue'
import { afterEach, describe, expect, it } from 'vitest'
import { dispose, useControls } from '/@/composables/useControls'

describe('useControls', () => {
  afterEach(() => {
    dispose()
  })

  /* describe('when pass a string', () => {}) */

  describe('when pass an single control object', () => {
    /*
    const obj = useControls({ test: 'awiwi' })
    */
    it('should return an object with a value', () => {
      const { value } = useControls({ test: true })
      expect(value.value).toBe(true)
    })
    it('should return refs of all properties', () => {
      const { visible, value } = useControls({ test: true })
      expect(isRef(value)).toBe(true)
      expect(isRef(visible)).toBe(true)
    })
    it('should set the initial control label', () => {
      const { label } = useControls({
        test: {
          label: 'Awiwi',
          value: true,
        },
      })
      expect(label.value).toBe('Awiwi')
    })
    it('should return a visible control by default', () => {
      const { visible } = useControls({ test: true })
      expect(visible.value).toBeTruthy()
    })
    it('should set the initial control visibility', () => {
      const { visible } = useControls({ test: {
        visible: false,
        value: true,
      } })
      expect(visible.value).toBeFalsy()
    })
    /*   it('should return refs of all properties', () => {
      const { value } = useControls({ test: true })
      expect(isRef(value)).toBe(true)
    })
    it('should return a ref with the label that has the latest value', () => {
      const { test } = useControls({ test: true })
      expect(isRef(test)).toBe(true)
    })
    it('should add a control of type string from an object with a string value', () => {
      const obj = useControls({ test: 'awiwi' })
      expect(obj.value).toBe('awiwi')
      expect(obj.type).toBe('string')
    }) */
  })

  describe('when pass multiple controls', () => {
    it('should return an object of controls with ref properties if object has multiple properties', () => {
      const controls = useControls({ test: true, test2: true })
      expect(Object.keys(controls)).toHaveLength(2)
      expect(isRef(controls.test)).toBe(true)
    })
  })

  /* describe('when pass an object', () => {
    it('should return an array of controls', () => {
      const { controls } = useControls({ a: 'awiwi', b: 1 })
      expect(controls).toHaveLength(2)
    })

    it('should add a control of type string from an object with a string value', () => {
      const { controls } = useControls({ test: 'awiwi' })
      const [control] = controls
      expect(control.type).toBe('string')
    })

    it('should add a control of type number from an object with a numeric value', () => {
      const { controls } = useControls({ test: 1 })
      const [control] = controls
      expect(control.type).toBe('number')
    })

    it('should add a control of type boolean from an object with a boolean value', () => {
      const { controls } = useControls({ test: true })
      const [control] = controls
      expect(control.type).toBe('boolean')
    })

    it('should add a control of type color from an object with a string with hex format', () => {
      const obj = { test: '#ffffff' }
      const { controls } = useControls(obj)
      const [control] = controls
      expect(control.type).toBe('color')
    })

    it('should add a control of type vector from an object with a Vector3', () => {
      const obj = { test: new Vector3(0, 2, 0) }
      const { controls } = useControls(obj)
      const [control] = controls
      expect(control.type).toBe('vector')
    })

    it('should add a control of type vector from an object with an array of numbers', () => {
      const obj = { test: [0, 1, 0] }
      const { controls } = useControls(obj)
      const [control] = controls
      expect(control.type).toBe('vector')
    })
  })

  describe('when pass an reactive object', () => {
    it('should return an array of controls', () => {
      const obj = reactive({ a: 'awiwi', b: 1 })
      const { controls } = useControls(obj)
      expect(controls).toHaveLength(2)
    })

    it('should add a control of type string from an object with a string value', () => {
      const obj = reactive({ test: 'awiwi' })
      const { controls } = useControls(obj)
      const [control] = controls
      expect(control.type).toBe('string')
    })

    it('should add a control of type number from an object with a numeric value', () => {
      const obj = reactive({ test: 1 })
      const { controls } = useControls(obj)
      const [control] = controls
      expect(control.type).toBe('number')
    })

    it('should add a control of type boolean from an object with a boolean value', () => {
      const obj = reactive({ test: true })
      const { controls } = useControls(obj)
      const [control] = controls
      expect(control.type).toBe('boolean')
    })

    it('should add a control of type color from an object with a string with hex format', () => {
      const obj = reactive({ test: '#ffffff' })
      const { controls } = useControls(obj)
      const [control] = controls
      expect(control.type).toBe('color')
    })

    it('should add a control of type vector from an object with a Vector3', () => {
      const obj = reactive({ test: new Vector3(0, 2, 0) })
      const { controls } = useControls(obj)
      const [control] = controls
      expect(control.type).toBe('vector')
    })

    it('should add a control of type vector from an object with an array of numbers', () => {
      const obj = reactive({ test: [0, 1, 0] })
      const { controls } = useControls(obj)
      const [control] = controls
      expect(control.type).toBe('vector')
    })
  })

  describe('when pass a fpsgraph', () => {
    it('should add a control of type fpsgraph', () => {
      const { controls } = useControls('fpsgraph')
      const [control] = controls
      expect(control.type).toBe('fpsgraph')
    })
  })

  describe('when pass a folder', () => {
    it('should add a control of type folder with subcontrols', () => {
      const { controls } = useControls('folder', { a: 'awiwi', b: 1 })
      const [control] = controls
      expect(control.type).toBe('folder')
      expect(control.controls).toHaveLength(2)
    })
  })

  describe('when pass and object with numeric value and with min, max, step options', () => {
    it('should add a control of type range', () => {
      const { controls } = useControls({ test: { value: 1, min: 0, max: 10, step: 0.1 } })
      const [control] = controls
      expect(control.type).toBe('range')
      expect(control.min).toBe(0)
      expect(control.max).toBe(10)
      expect(control.step).toBe(0.1)
    })
  }) */
})
