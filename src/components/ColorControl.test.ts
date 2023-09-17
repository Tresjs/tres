import { mount } from '@vue/test-utils'
import { TresLeches, useControls } from '/@/'
import { it, expect } from 'vitest'
import { defineComponent, nextTick } from 'vue'


describe('Color Control', async () => {
  it('should render a color control', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      components: {
        TresLeches
      },
      setup() {
        const { value: colorValue } = useControls({ colorValue: '#008080' })
        return {
          colorValue
        }
      }
    })

    const wrapper = mount(component, {
      components: {
        TresLeches
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('input').attributes('type')).toBe('color')
  })
  it('should render a color control with a label', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      components: {
        TresLeches
      },
      setup() {
        const { colorValue } = useControls({ colorValue: '#008080' })
        return {
          colorValue
        }
      }
    })

    const wrapper = mount(component, {
      components: {
        TresLeches
      },
    })
    expect(wrapper.find('label').text()).toBe('colorValue')
  })
  it('should change the value of the control when the input changes', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      setup() {
        const { value: colorValue } = useControls({ colorValue: '#008080' })
        return {
          colorValue
        }
      }
    })

    const wrapper = mount(component, {
      components: {
        TresLeches
      },
    })
    const input = wrapper.find('input[type="color"]')

    await input.setValue('#ff2400')
    await nextTick();

    expect(wrapper.vm.colorValue).toBe('#ff2400')
  })
  it('should hide the control when the visible property is toggled', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      setup() {
        const { value: colorValue, visible } = useControls({ colorValue: '#008080' })
        return {
          colorValue,
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
    expect(wrapper.find('input[type="color"]').exists()).toBe(false)
  })
  it('should show the control by default', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      setup() {
        const { visible } = useControls({ test: '#008080' })
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
    const checkboxInput = wrapper.find('input[type="color"]')
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
          value: '#008080',
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
    const checkboxInput = wrapper.find('input[type="color"]')
    expect(checkboxInput.exists()).toBe(false)

    expect(wrapper.vm.visible).toBe(false)
  })
})