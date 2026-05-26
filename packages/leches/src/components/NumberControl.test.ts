import { mount } from '@vue/test-utils'
import { TresLeches, useControls } from '/@/'
import { beforeEach, describe, expect, it } from 'vitest'
import { defineComponent, nextTick } from 'vue'
import { dispose } from '/@/composables/useControls'

describe('number Control', async () => {
  let wrapper: ReturnType<typeof mount>
  let component: ReturnType<typeof defineComponent>
  const vm = () => wrapper.vm as unknown as { numberValue: number }

  const mountComponent = (setup: () => Record<string, unknown> | void) => {
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
    expect(wrapper.find('input').attributes('type')).toBe('text')
  })
  it('should render a number control with a label', async () => {
    expect(wrapper.find('label').text()).toBe('numberValue')
  })
  it('should change the value of the control when the input changes', async () => {
    const input = wrapper.find('input[type="text"]')
    await input.trigger('focus')
    await input.setValue('20')
    await input.trigger('blur')
    await nextTick()
    await nextTick()
    expect(vm().numberValue).toBe(20)
  })

  it('should apply a fixed step on PageUp/PageDown', async () => {
    dispose()
    mountComponent(() => {
      const { numberValue } = useControls({ numberValue: 5 })
      return {
        numberValue,
      }
    })

    const input = wrapper.find('input[type="text"]')
    await input.trigger('focus')
    await input.trigger('keydown', { key: 'PageUp' })
    await nextTick()
    expect(vm().numberValue).toBe(6)

    await input.trigger('keydown', { key: 'PageDown' })
    await nextTick()
    expect(vm().numberValue).toBe(5)
  })

  it('should ignore modifiers for PageUp/PageDown', async () => {
    dispose()
    mountComponent(() => {
      const { numberValue } = useControls({ numberValue: 5 })
      return {
        numberValue,
      }
    })

    const input = wrapper.find('input[type="text"]')
    await input.trigger('focus')
    await input.trigger('keydown', { key: 'PageUp', shiftKey: true })
    await nextTick()
    expect(vm().numberValue).toBe(6)

    await input.trigger('keydown', { key: 'PageDown', altKey: true })
    await nextTick()
    expect(vm().numberValue).toBe(5)
  })

  it('should show the control by default', async () => {
    const checkboxInput = wrapper.find('input[type="text"]')
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
    const checkboxInput = wrapper.find('input[type="text"]')
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
