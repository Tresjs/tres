import { mount } from '@vue/test-utils'
import { TresLeches, useControls } from '/@/'
import { describe, expect, it } from 'vitest'
import { defineComponent, ref } from 'vue'
import ButtonControl from './ButtonControl.vue'

describe('button Controls', () => {
  let wrapper
  let component
  const mountComponent = (setup) => {
    component = defineComponent({
      template: `<TresLeches :float="false" />`,
      components: { TresLeches, ButtonControl },
      setup,
    })

    wrapper = mount(component, {
      components: { TresLeches, ButtonControl },
    })
  }

  it('should render a button', () => {
    mountComponent(() => {
      useControls({ acceptBtn: { type: 'button', label: 'Accept' } })
    })
    expect(wrapper.html().replace(/style="[^"]*"/, '')).toMatchSnapshot()
    expect(wrapper.find('button#default-acceptBtn').exists()).toBe(true)
  })

  it('should render a button with a label', async () => {
    mountComponent(() => {
      useControls({ acceptBtn: { type: 'button', label: 'Accept' } })
    })
    expect(wrapper.html().replace(/style="[^"]*"/, '')).toMatchSnapshot()
    const button = wrapper.find('button#default-acceptBtn')
    expect(button.text()).toBe('Accept')
  })

  it('should render a clickable button', async () => {
    mountComponent(() => {
      const isClicked = ref(false)
      useControls({ acceptBtn: { type: 'button', label: 'Accept', onClick: () => { isClicked.value = true } } })
      return { isClicked }
    })

    const button = wrapper.find('button#default-acceptBtn')
    await button.trigger('click')
    expect(wrapper.vm.isClicked).toBe(true)
  })

  it('should render an icon on the button', () => {
    mountComponent(() => {
      useControls({ acceptBtn: { type: 'button', label: 'Accept', icon: 'i-carbon-checkmark' } })
    })
    expect(wrapper.html().replace(/style="[^"]*"/, '')).toMatchSnapshot()
    expect(wrapper.find('i.i-carbon-checkmark').exists()).toBe(true)
  })

  it('should render a small button', () => {
    mountComponent(() => {
      useControls({ acceptBtn: { type: 'button', label: 'Accept', size: 'sm' } })
    })
    expect(wrapper.html().replace(/style="[^"]*"/, '')).toMatchSnapshot()
  })

  it('should render a large button', () => {
    mountComponent(() => {
      useControls({ acceptBtn: { type: 'button', label: 'Accept', size: 'lg' } })
    })
    expect(wrapper.html().replace(/style="[^"]*"/, '')).toMatchSnapshot()
  })

  it('should render a block size button', () => {
    mountComponent(() => {
      useControls({ acceptBtn: { type: 'button', label: 'Accept', size: 'block' } })
    })
    expect(wrapper.html().replace(/style="[^"]*"/, '')).toMatchSnapshot()
  })

  it('should render a primary button variant by default', () => {
    mountComponent(() => {
      useControls({ acceptBtn: { type: 'button', label: 'Accept' } })
    })
    expect(wrapper.html().replace(/style="[^"]*"/, '')).toMatchSnapshot()
  })

  it('should render a secondary button variant', () => {
    mountComponent(() => {
      useControls({ acceptBtn: { type: 'button', label: 'Accept', variant: 'secondary' } })
    })
    expect(wrapper.html().replace(/style="[^"]*"/, '')).toMatchSnapshot()
  })
})
