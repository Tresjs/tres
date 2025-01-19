import { mount } from '@vue/test-utils'
import { TresLeches, useControls } from '/@/'
import { beforeEach, describe, expect, it } from 'vitest'
import { defineComponent, nextTick } from 'vue'
import { dispose } from '/@/composables/useControls'

describe('color Control', async () => {
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
      const { colorValue } = useControls({ colorValue: '#008080' })
      return { colorValue }
    })
  })
  it('should render a color control', async () => {
    expect(wrapper.html().replace(/style="[^"]*"/, '')).toMatchSnapshot()
    expect(wrapper.find('input').attributes('type')).toBe('color')
  })
  it('should render a color control with a label', async () => {
    expect(wrapper.find('label').text()).toBe('colorValue')
  })
  it('should change the value of the control when the input changes', async () => {
    const input = wrapper.find('input[type="color"]')

    await input.setValue('#ff2400')
    await nextTick()

    expect(wrapper.vm.colorValue).toBe('#ff2400')
  })
  it('should show the control by default', async () => {
    const checkboxInput = wrapper.find('input[type="color"]')
    expect(checkboxInput.exists()).toBe(true)
  })
  it('should not show the control if the visibility is initially false', async () => {
    dispose()
    mountComponent(() => {
      const { colorValue } = useControls({ colorValue: { value: '#008080', visible: false } })
      return { colorValue }
    })
    const input = wrapper.find('input[type="color"]')
    expect(input.exists()).toBe(false)
  })
})
