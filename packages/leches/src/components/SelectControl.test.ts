import { mount } from '@vue/test-utils'
import { TresLeches, useControls } from '/@/'
import { beforeEach, describe, expect, it } from 'vitest'
import { defineComponent, nextTick } from 'vue'
import { dispose } from '/@/composables/useControls'

describe('dropdown Control', async () => {
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
      const { value: game, visible } = useControls({
        game: {
          label: 'Games',
          options: [
            { text: 'Crash Bandicoot', value: 'crash-bandicoot' },
            { text: 'Spyro The Dragon', value: 'spyro-the-dragon' },
            { text: 'Metal Gear Solid', value: 'metal-gear-solid' },
          ],
          value: 'crash-bandicoot',
        },
      })
      return {
        game,
        visible,
      }
    })
  })
  it('should render a select control', async () => {
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('select').exists())
  })
  it('should render a select control with a label', async () => {
    expect(wrapper.find('label').text()).toBe('Games')
  })
  it('should generate {text, value} pairs for options', async () => {
    expect(wrapper.find('label').text()).toBe('Games')
  })
  it('should change the value of the control when the input changes', async () => {
    const input = wrapper.find('select')

    await input.setValue('spyro-the-dragon')
    await nextTick()

    expect(wrapper.vm.game).toBe('spyro-the-dragon')
  })
  it('should hide the control when the visible property is toggled', async () => {
    wrapper.vm.visible = false
    await nextTick()
    expect(wrapper.find('select').exists()).toBe(false)
  })
  it('should show the control by default', async () => {
    const input = wrapper.find('select')
    expect(input.exists()).toBe(true)

    expect(wrapper.vm.visible).toBe(true)
  })
  it('should not show the control if the visibility is initially false', async () => {
    dispose()
    mountComponent(() => {
      const { value: game, visible } = useControls({
        game: {
          label: 'Games',
          options: [
            { text: 'Crash Bandicoot', value: 'crash-bandicoot' },
            { text: 'Spyro The Dragon', value: 'spyro-the-dragon' },
            { text: 'Metal Gear Solid', value: 'metal-gear-solid' },
          ],
          value: 'crash-bandicoot',
          visible: false,
        },
      })
      return {
        game,
        visible,
      }
    })
    const input = wrapper.find('select')
    expect(input.exists()).toBe(false)

    expect(wrapper.vm.visible).toBe(false)
  })
  it('should render an icon instead of a label', () => {
    dispose()
    mountComponent(() => {
      const { visible } = useControls({
        test: {
          label: 'Games',
          options: [
            { text: 'Crash Bandicoot', value: 'crash-bandicoot' },
            { text: 'Spyro The Dragon', value: 'spyro-the-dragon' },
            { text: 'Metal Gear Solid', value: 'metal-gear-solid' },
          ],
          value: 'crash-bandicoot',
          icon: 'i-carbon-checkmark',
        },
      })
      return { visible }
    })
    const icon = wrapper.find('i.i-carbon-checkmark')
    expect(icon.exists()).toBe(true)
  })
})
