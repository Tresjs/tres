import { mount } from '@vue/test-utils'
import { TresLeches, useControls } from '/@/'
import { it, expect } from 'vitest'
import { defineComponent, nextTick } from 'vue'


describe('Text Control', async () => {
  it('should render a text control', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      components: {
        TresLeches
      },
      setup() {
        const { value: textValue } = useControls({ textValue: 'awiwi' })
        return {
          textValue
        }
      }
    })

    const wrapper = mount(component, {
      components: {
        TresLeches
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('input').attributes('type')).toBe('text')
  })
  it('should render a text control with a label', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      components: {
        TresLeches
      },
      setup() {
        const { textValue } = useControls({ textValue: 'awiwi' })
        return {
          textValue
        }
      }
    })

    const wrapper = mount(component, {
      components: {
        TresLeches
      },
    })
    expect(wrapper.find('label').text()).toBe('textValue')
  })
  it('should change the value of the control when the input changes', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      setup() {
        const { value: textValue } = useControls({ textValue: 'awiwi' })
        return {
          textValue
        }
      }
    })

    const wrapper = mount(component, {
      components: {
        TresLeches
      },
    })
    const input = wrapper.find('input[type="text"]')

    await input.setValue('this is a text')
    await nextTick();

    expect(wrapper.vm.textValue).toBe('this is a text')
  })
  it('should hide the control when the visible property is false', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      setup() {
        const { value: textValue, visible } = useControls({ textValue: 'awiwi' })
        return {
          textValue,
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
    expect(wrapper.find('input[type="text"]').exists()).toBe(false)
  })
})