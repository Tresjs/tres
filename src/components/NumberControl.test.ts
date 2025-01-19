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
      const { numberValue } = useControls({ numberValue: 5 })
      return {
        numberValue,
      }
    })
  })
  it('should render a number control', async () => {
    expect(wrapper.html().replace(/style="[^"]*"/, '')).toMatchSnapshot()
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

  it('should show the control by default', async () => {
    const checkboxInput = wrapper.find('input[type="number"]')
    expect(checkboxInput.exists()).toBe(true)
  })
  it('should not show the control if the visibility is initially false', async () => {
    dispose()
    mountComponent(() => {
      const { numberValue } = useControls({ numberValue: { value: 5, visible: false } })
      return {
        numberValue,
      }
    })
    const checkboxInput = wrapper.find('input[type="number"]')
    expect(checkboxInput.exists()).toBe(false)
  })
  it('should render an icon instead of a label', () => {
    dispose()
    mountComponent(() => {
      useControls({
        test: {
          value: 2,
          icon: 'i-carbon-checkmark',
        },
      })
    })
    const icon = wrapper.find('i.i-carbon-checkmark')
    expect(icon.exists()).toBe(true)
  })
})
