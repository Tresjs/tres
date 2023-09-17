import { mount } from '@vue/test-utils'
import { TresLeches, useControls } from '/@/'
import { it, expect } from 'vitest'
import { defineComponent, nextTick } from 'vue'


describe('Dropdown Control', async () => {
  it('should render a select control', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      components: {
        TresLeches
      },
      setup() {
        const { game } = useControls({
          game: {
            label: 'Games',
            options: [
              { text: 'Crash Bandicoot', value: 'crash-bandicoot' },
              { text: 'Spyro The Dragon', value: 'spyro-the-dragon' },
              { text: 'Metal Gear Solid', value: 'metal-gear-solid' }],
            value: 'crash-bandicoot',
          },
        })
        return {
          game
        }
      }
    })

    const wrapper = mount(component, {
      components: {
        TresLeches
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('select').exists())
  })
  it('should render a select control with a label', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      components: {
        TresLeches
      },
      setup() {
        const { game } = useControls({
          game: {
            label: 'Games',
            options: [
              { text: 'Crash Bandicoot', value: 'crash-bandicoot' },
              { text: 'Spyro The Dragon', value: 'spyro-the-dragon' },
              { text: 'Metal Gear Solid', value: 'metal-gear-solid' }],
            value: 'crash-bandicoot',
          },
        })
        return {
          game
        }
      }
    })

    const wrapper = mount(component, {
      components: {
        TresLeches
      },
    })
    expect(wrapper.find('label').text()).toBe('Games')
  })
  it('should generate {text, value} pairs for options', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      components: {
        TresLeches
      },
      setup() {
        const { game } = useControls({
          game: {
            label: 'Games',
            options: [
              'Crash Bandicoot',
              'Spyro The Dragon' ,
              'Metal Gear Solid' 
            ],
            value: 'crash-bandicoot',
          },
        })
        return {
          game
        }
      }
    })

    const wrapper = mount(component, {
      components: {
        TresLeches
      },
    })
    expect(wrapper.find('label').text()).toBe('Games')
  })
  it('should change the value of the control when the input changes', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      components: {
        TresLeches
      },
      setup() {
        const { game } = useControls({
          game: {
            label: 'Games',
            options: [
              { text: 'Crash Bandicoot', value: 'crash-bandicoot' },
              { text: 'Spyro The Dragon', value: 'spyro-the-dragon' },
              { text: 'Metal Gear Solid', value: 'metal-gear-solid' }],
            value: 'crash-bandicoot',
          },
        })
        return {
          game
        }
      }
    })

    const wrapper = mount(component, {
      components: {
        TresLeches
      },
    })
    const input = wrapper.find('select')

    await input.setValue('spyro-the-dragon')
    await nextTick();

    expect(wrapper.vm.game).toBe('spyro-the-dragon')
  })
  it('should hide the control when the visible property is toggled', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      components: {
        TresLeches
      },
      setup() {
        const { game, visible } = useControls({
          game: {
            label: 'Games',
            options: [
              { text: 'Crash Bandicoot', value: 'crash-bandicoot' },
              { text: 'Spyro The Dragon', value: 'spyro-the-dragon' },
              { text: 'Metal Gear Solid', value: 'metal-gear-solid' }],
            value: 'crash-bandicoot',
          },
        })
        return {
          game,
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
    expect(wrapper.find('select').exists()).toBe(false)
  })
  it('should show the control by default', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      components: {
        TresLeches
      },
      setup() {
        const { game, visible } = useControls({
          game: {
            label: 'Games',
            options: [
              { text: 'Crash Bandicoot', value: 'crash-bandicoot' },
              { text: 'Spyro The Dragon', value: 'spyro-the-dragon' },
              { text: 'Metal Gear Solid', value: 'metal-gear-solid' }],
            value: 'crash-bandicoot',
          },
        })
        return {
          game,
          visible
        }
      }
    })

    const wrapper = mount(component, {
      components: {
        TresLeches
      },
    })
    const input = wrapper.find('select')
    expect(input.exists()).toBe(true)

    expect(wrapper.vm.visible).toBe(true)
  })
  it('should not show the control if the visibility is initially false', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      components: {
        TresLeches
      },
      setup() {
        const { game, visible } = useControls({
          game: {
            label: 'Games',
            options: [
              { text: 'Crash Bandicoot', value: 'crash-bandicoot' },
              { text: 'Spyro The Dragon', value: 'spyro-the-dragon' },
              { text: 'Metal Gear Solid', value: 'metal-gear-solid' }],
            value: 'crash-bandicoot',
            visible:false
          },
        })
        return {
          game,
          visible
        }
      }
    })

    const wrapper = mount(component, {
      components: {
        TresLeches
      },
    })
    const input = wrapper.find('select')
    expect(input.exists()).toBe(false)

    expect(wrapper.vm.visible).toBe(false)
  })
})