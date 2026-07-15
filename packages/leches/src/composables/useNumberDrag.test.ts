import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { useNumberDrag } from './useNumberDrag'

describe('useNumberDrag', () => {
  it('returns onMouseDown and isDragging', () => {
    const onUpdate = vi.fn()
    const { onMouseDown, isDragging } = useNumberDrag({
      getValue: () => 0,
      step: ref(1),
      onUpdate,
    })
    expect(typeof onMouseDown).toBe('function')
    expect(isDragging.value).toBe(false)
  })

  it('isDragging becomes true on mousedown', () => {
    const onUpdate = vi.fn()
    const { onMouseDown, isDragging } = useNumberDrag({
      getValue: () => 0,
      step: ref(1),
      onUpdate,
    })

    const event = new MouseEvent('mousedown', { clientX: 100, clientY: 50 })
    onMouseDown(event)
    expect(isDragging.value).toBe(true)
  })

  it('calls onUpdate with delta on mousemove', () => {
    const onUpdate = vi.fn()
    const { onMouseDown } = useNumberDrag({
      getValue: () => 10,
      step: ref(0.1),
      onUpdate,
    })

    onMouseDown(new MouseEvent('mousedown', { clientX: 100, clientY: 50 }))

    // movementX is used for pointer-locked x-axis only drag
    const mousemove = new MouseEvent('mousemove', { movementX: 5 } as any)
    document.dispatchEvent(mousemove)

    expect(onUpdate).toHaveBeenCalled()
    const updatedValue = onUpdate.mock.calls[0][0]
    expect(updatedValue).toBeGreaterThan(10)
  })

  it('clamps to min/max', () => {
    const onUpdate = vi.fn()
    const { onMouseDown } = useNumberDrag({
      getValue: () => 9.5,
      step: ref(1),
      min: ref(0),
      max: ref(10),
      onUpdate,
    })

    onMouseDown(new MouseEvent('mousedown', { clientX: 100, clientY: 50 }))
    document.dispatchEvent(new MouseEvent('mousemove', { movementX: 100 } as any))

    const updatedValue = onUpdate.mock.calls[0][0]
    expect(updatedValue).toBeLessThanOrEqual(10)
  })

  it('stops dragging on mouseup', () => {
    const onUpdate = vi.fn()
    const { onMouseDown, isDragging } = useNumberDrag({
      getValue: () => 0,
      step: ref(1),
      onUpdate,
    })

    onMouseDown(new MouseEvent('mousedown', { clientX: 100, clientY: 50 }))
    expect(isDragging.value).toBe(true)

    document.dispatchEvent(new MouseEvent('mouseup'))
    expect(isDragging.value).toBe(false)
  })
})
