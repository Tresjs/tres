import { dispose } from '/@/composables/useControls'
import { mount } from '@vue/test-utils'
import { TresLeches, useControls } from '/@/'
import { beforeEach, describe, expect, it } from 'vitest'
import { defineComponent, nextTick } from 'vue'

describe('boolean Control', async () => {
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
      const { test } = useControls({ test: true })
      return { test }
    })
  })
  it('should render a boolean control', async () => {
    expect(wrapper.html().replace(/style="[^"]*"/, '')).toMatchSnapshot()
    expect(wrapper.find('input').attributes('type')).toBe('checkbox')
  })
  it('should render a boolean control with a label', async () => {
    expect(wrapper.html().replace(/style="[^"]*"/, '')).toMatchSnapshot()
    expect(wrapper.find('label').text()).toBe('test')
  })
  it('should change the value of the control when the input changes', async () => {
    const checkboxInput = wrapper.find('input[type="checkbox"]')

    await checkboxInput.setChecked(false)
    await nextTick()

    expect(wrapper.vm.test).toBe(false)
  })

  it('should show the control by default', async () => {
    const checkboxInput = wrapper.find('input[type="checkbox"]')
    expect(checkboxInput.exists()).toBe(true)
  })
})
