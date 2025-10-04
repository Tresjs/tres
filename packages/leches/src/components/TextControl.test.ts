import { dispose } from '/@/composables/useControls'
import { mount } from '@vue/test-utils'
import { TresLeches, useControls } from '/@/'
import { beforeEach, describe, expect, it } from 'vitest'
import { defineComponent, nextTick } from 'vue'

describe('text Control', () => {
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
      const { textValue } = useControls({ textValue: 'awiwi' })
      return { textValue }
    })
  })

  it('should render a text control', () => {
    expect(wrapper.html().replace(/style="[^"]*"/, '')).toMatchSnapshot()
    expect(wrapper.find('input').attributes('type')).toBe('text')
  })

  it('should render a text control with a label', () => {
    expect(wrapper.find('label').text()).toBe('textValue')
  })

  it('should change the value of the control when the input changes', async () => {
    const input = wrapper.find('input[type="text"]')
    await input.setValue('this is a text')
    await nextTick()
    expect(wrapper.vm.textValue).toBe('this is a text')
  })

  describe('visibility Tests', () => {
    it('should show the control by default', () => {
      const input = wrapper.find('input[type="text"]')
      expect(input.exists()).toBe(true)
    })

    it('should not show the control if the visibility is initially false', () => {
      dispose()
      mountComponent(() => {
        useControls({
          test: {
            value: 'awiwi',
            visible: false,
          },
        })
      })
      const input = wrapper.find('input[type="text"]')
      expect(input.exists()).toBe(false)
    })

    it('should render an icon instead of a label', () => {
      dispose()
      mountComponent(() => {
        useControls({
          test: {
            value: 'awiwi',
            icon: 'i-carbon-checkmark',
          },
        })
      })
      const icon = wrapper.find('i.i-carbon-checkmark')
      expect(icon.exists()).toBe(true)
    })
  })
})
