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
      const { game } = useControls({
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
      }
    })
  })
  it('should render a select control', async () => {
    expect(wrapper.html().replace(/style="[^"]*"/, '')).toMatchSnapshot()
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
  it('should not show the control if the visibility is initially false', async () => {
    dispose()
    mountComponent(() => {
      const { game } = useControls({
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
      }
    })
    const input = wrapper.find('select')
    expect(input.exists()).toBe(false)
  })
  it('should render an icon instead of a label', () => {
    dispose()
    mountComponent(() => {
      useControls({
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
    })
    const icon = wrapper.find('i.i-carbon-checkmark')
    expect(icon.exists()).toBe(true)
  })
})
