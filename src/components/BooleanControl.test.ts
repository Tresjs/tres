import { mount } from '@vue/test-utils'
import { TresLeches, useControls } from '/@/'
import { it, expect } from 'vitest'
import { defineComponent, nextTick } from 'vue'


describe('Boolean Control', async () => {
  it('should render a boolean control', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      components: {
        TresLeches
      },
      setup() {
        const { value: test } = useControls({ test: true })
        return {
          test
        }
      }
    })

    const wrapper = mount(component, {
    /*    attachTo: document.body, */
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('input').attributes('type')).toBe('checkbox')
  })
  it('should render a boolean control with a label', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      components: {
        TresLeches
      },
      setup() {
        const { value:test } = useControls({ test: true })
        return {
          test
        }
      }
    })

    const wrapper = mount(component, {
    /*    attachTo: document.body, */
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('label').text()).toBe('test')
  })
  it('should change the value of the control when the input changes', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      setup() {
        const { value:test } = useControls({ test: true })
        return {
          test
        }
      }
    })

    const wrapper = mount(component, {
      components: {
        TresLeches
      },
    })
    const checkboxInput = wrapper.find('input[type="checkbox"]')

    await checkboxInput.setChecked(false)
    await nextTick();

    expect(wrapper.vm.test).toBe(false)
  })
})