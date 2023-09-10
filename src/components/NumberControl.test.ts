import { mount } from '@vue/test-utils'
import { TresLeches, useControls } from '/@/'
import { it, expect } from 'vitest'
import { defineComponent, nextTick } from 'vue'


describe('Number Control', async () => {
  it('should render a number control', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      components: {
        TresLeches
      },
      setup() {
        const { value: numberValue } = useControls({ numberValue: 5 })
        return {
          numberValue
        }
      }
    })

    const wrapper = mount(component, {
      components: {
        TresLeches
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('input').attributes('type')).toBe('number')
  })
  it('should render a number control with a label', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      components: {
        TresLeches
      },
      setup() {
        const { numberValue } = useControls({ numberValue: 5 })
        return {
          numberValue
        }
      }
    })

    const wrapper = mount(component, {
      components: {
        TresLeches
      },
    })
    expect(wrapper.find('label').text()).toBe('numberValue')
  })
  it('should change the value of the control when the input changes', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      setup() {
        const { value: numberValue } = useControls({ numberValue: 5 })
        return {
          numberValue
        }
      }
    })

    const wrapper = mount(component, {
      components: {
        TresLeches
      },
    })
    const input = wrapper.find('input[type="number"]')

    await input.setValue(20)
    await nextTick();

    expect(wrapper.vm.numberValue).toBe(20)
  })
  it('should hide the control when the visible property is toggled', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      setup() {
        const { value: numberValue, visible } = useControls({ numberValue: 5 })
        return {
          numberValue,
          visible
        }
      }
    })

    const wrapper = mount(component, {
      components: {
        TresLeches
      },
    })
    wrapper.vm.visible = false
    await nextTick();
    expect(wrapper.find('input[type="number"]').exists()).toBe(false)
  })
  it('should show the control by default', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      setup() {
        const { visible } = useControls({ test: 5 })
        return {
          visible
        }
      }
    })

    const wrapper = mount(component, {
      components: {
        TresLeches
      },
    })
    const checkboxInput = wrapper.find('input[type="number"]')
    expect(checkboxInput.exists()).toBe(true)

    expect(wrapper.vm.visible).toBe(true)
  })
  it('should not show the control if the visibility is initially false', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      setup() {
        const { visible } = useControls({ test: {
          value: 5,
          visible: false
        } })
        return {
          visible
        }
      }
    })

    const wrapper = mount(component, {
      components: {
        TresLeches
      },
    })
    const checkboxInput = wrapper.find('input[type="number"]')
    expect(checkboxInput.exists()).toBe(false)

    expect(wrapper.vm.visible).toBe(false)
  })
})