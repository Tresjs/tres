import { mount } from '@vue/test-utils'
import { TresLeches, useControls } from '/@/'
import { describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'
import Folder from './Folder.vue'

class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    Vector3.prototype.isVector3 = true

    this.x = x
    this.y = y
    this.z = z
  }

  set(x, y, z) {
    if (z === undefined) { z = this.z } // sprite.scale.set(x,y)

    this.x = x
    this.y = y
    this.z = z

    return this
  }

  *[Symbol.iterator]() {
    yield this.x
    yield this.y
    yield this.z
  }
}

describe('folder Controls', () => {
  let wrapper
  let component
  const mountComponent = (setup) => {
    component = defineComponent({
      template: `<TresLeches :float="false" />`,
      components: { TresLeches, Folder },
      setup,
    })

    wrapper = mount(component, {
      components: { TresLeches, Folder },
    })
  }

  it('should render controls within a folder', () => {
    mountComponent(() => {
      const { cameraPosition } = useControls('camera', { position: new Vector3(3, 2, 4) })
      return { cameraPosition }
    })
    expect(wrapper.html().replace(/style="[^"]*"/, '')).toMatchSnapshot()
    expect(wrapper.find('button[data-folder="camera"]').exists()).toBe(true)
    expect(wrapper.find('input#default-cameraPosition-x').exists()).toBe(true)
    expect(wrapper.find('input#default-cameraPosition-y').exists()).toBe(true)
    expect(wrapper.find('input#default-cameraPosition-z').exists()).toBe(true)
  })

  it('should have unique keys for controls in different folders', () => {
    mountComponent(() => {
      const { cameraPosition } = useControls('camera', { position: new Vector3(3, 2, 4) })
      const { lightPosition } = useControls('light', { position: new Vector3(4, 4, 4) })
      return { controls: [cameraPosition, lightPosition], label: 'camera' }
    })
    const cameraInput = wrapper.find('input#default-cameraPosition-x')
    const lightInput = wrapper.find('input#default-lightPosition-x')
    expect(cameraInput.exists()).toBe(true)
    expect(lightInput.exists()).toBe(true)
    expect(cameraInput.element.value).toBe('3.00')
    expect(lightInput.element.value).toBe('4.00')
  })
})
