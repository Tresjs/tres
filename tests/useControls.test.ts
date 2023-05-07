import { reactive } from 'vue'
import { afterEach, describe, it, expect } from 'vitest'
import { useControls, dispose } from '/@/composables/useControls'
import { Vector3 } from 'three'

describe('useControls', () => {
  afterEach(() => {
    dispose()
  })

  describe('when pass an object', () => {
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
  })
})
