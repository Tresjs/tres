import { mount } from '@vue/test-utils'
import { TresLeches, useControls } from '/@/'
import { beforeEach, describe, expect, it } from 'vitest'
import { defineComponent, nextTick } from 'vue'
import { dispose } from '/@/composables/useControls'

class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    Vector3.prototype.isVector3 = true

    this.x = x
    this.y = y
    this.z = z
  }

  set(x, y, z) {
    if (z === undefined) { z = this.z } // sprite.scale.set(x,y)

    this.x = x
    this.y = y
    this.z = z

    return this
  }

  *[Symbol.iterator]() {
    yield this.x
    yield this.y
    yield this.z
  }
}
describe('vector Control', async () => {
  let wrapper
  let component

  const mountComponent = (setup) => {
    component = defineComponent({
      template: `<TresLeches />`,
      components: { TresLeches },
      setup,
    })

    wrapper = mount(component, {
      components: { TresLeches },
    })
  }

  beforeEach(() => {
    dispose()
    mountComponent(() => {
      const { position, visible } = useControls({ position: new Vector3(0, 2, 4) })
      return { position, visible }
    })
  })
  it('should render multiple numeric inputs', async () => {
    expect(wrapper.html().replace(/style="[^"]*"/, '')).toMatchSnapshot()
    expect(wrapper.findAll('input[type="text"]').length).toBeGreaterThan(1)
  })
  it('should render a number control with a label', async () => {
    expect(wrapper.find('label').text()).toBe('position')
  })
  it('should change the value of the control when any of the input changes', async () => {
    const inputs = wrapper.findAll('input[type="text"]')
    await inputs[0].setValue('20')
    await inputs[0].trigger('blur')
    await inputs[1].setValue('-20')
    await inputs[1].trigger('blur')
    await inputs[2].setValue('-1')
    await inputs[2].trigger('blur')
    await nextTick()
    expect(wrapper.vm.position.x).toBe(20)
    expect(wrapper.vm.position.y).toBe(-20)
    expect(wrapper.vm.position.z).toBe(-1)
  })

  it('should apply a fixed 10x step on PageUp/PageDown', async () => {
    dispose()
    mountComponent(() => {
      const { position, visible } = useControls({
        position: {
          value: new Vector3(0, 2, 4),
          step: 1,
        },
      })
      return { position, visible }
    })

    const inputs = wrapper.findAll('input[type="text"]')
    await inputs[0].trigger('focus')
    await inputs[0].trigger('keydown', { key: 'PageUp' })
    await nextTick()
    expect(wrapper.vm.position.x).toBe(10)

    await inputs[0].trigger('keydown', { key: 'PageDown' })
    await nextTick()
    expect(wrapper.vm.position.x).toBe(0)
  })

  it('should ignore modifiers for PageUp/PageDown', async () => {
    dispose()
    mountComponent(() => {
      const { position, visible } = useControls({
        position: {
          value: new Vector3(0, 2, 4),
          step: 1,
        },
      })
      return { position, visible }
    })

    const inputs = wrapper.findAll('input[type="text"]')
    await inputs[0].trigger('focus')
    await inputs[0].trigger('keydown', { key: 'PageUp', shiftKey: true })
    await nextTick()
    expect(wrapper.vm.position.x).toBe(10)

    await inputs[0].trigger('keydown', { key: 'PageDown', altKey: true })
    await nextTick()
    expect(wrapper.vm.position.x).toBe(0)
  })

  // TODO: mouseDown
  it('should render an icon instead of a label', () => {
    dispose()
    mountComponent(() => {
      const { visible } = useControls({
        test: {
          value: new Vector3(0, 2, 4),
          icon: 'i-carbon-checkmark',
        },
      })
      return { visible }
    })
    const icon = wrapper.find('i.i-carbon-checkmark')
    expect(icon.exists()).toBe(true)
    expect(wrapper.findAll('input[type="text"]').length).toBeGreaterThan(1)
  })
})
