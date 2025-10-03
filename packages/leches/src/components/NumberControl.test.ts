import { mount } from '@vue/test-utils'
import { TresLeches, useControls } from '/@/'
import { beforeEach, describe, expect, it } from 'vitest'
import { defineComponent, nextTick } from 'vue'
import { dispose } from '/@/composables/useControls'

describe('number Control', async () => {
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
      const { numberValue, visible } = useControls({ numberValue: 5 })
      return {
        numberValue,
        visible,
      }
    })
  })
  it('should render a number control', async () => {
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('input').attributes('type')).toBe('number')
  })
  it('should render a number control with a label', async () => {
    expect(wrapper.find('label').text()).toBe('numberValue')
  })
  it('should change the value of the control when the input changes', async () => {
    const input = wrapper.find('input[type="number"]')

    await input.setValue(20)
    await nextTick()

    expect(wrapper.vm.numberValue).toBe(20)
  })
  it('should hide the control when the visible property is toggled', async () => {
    wrapper.vm.visible = false
    await nextTick()
    expect(wrapper.find('input[type="number"]').exists()).toBe(false)
  })
  it('should show the control by default', async () => {
    const checkboxInput = wrapper.find('input[type="number"]')
    expect(checkboxInput.exists()).toBe(true)

    expect(wrapper.vm.visible).toBe(true)
  })
  it('should not show the control if the visibility is initially false', async () => {
    dispose()
    mountComponent(() => {
      const { numberValue, visible } = useControls({ numberValue: { value: 5, visible: false } })
      return {
        numberValue,
        visible,
      }
    })
    const checkboxInput = wrapper.find('input[type="number"]')
    expect(checkboxInput.exists()).toBe(false)

    expect(wrapper.vm.visible).toBe(false)
  })
  it('should render an icon instead of a label', () => {
    dispose()
    mountComponent(() => {
      const { visible } = useControls({
        test: {
          value: 2,
          icon: 'i-carbon-checkmark',
        },
      })
      return { visible }
    })
    const icon = wrapper.find('i.i-carbon-checkmark')
    expect(icon.exists()).toBe(true)
  })
})
