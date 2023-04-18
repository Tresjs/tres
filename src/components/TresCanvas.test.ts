import { mount } from '@vue/test-utils'
import TresCanvas from './TresCanvas'
import { BasicShadowMap, sRGBEncoding, NoToneMapping } from 'three'
import TheExperience from './TheExperience.vue'

describe('TresCanvas', () => {
  it('should work', () => {
    const wrapper = mount(TheExperience, {
      attachTo: document.body,
      components: {
        TresCanvas,
      },
    })
    const canvas = wrapper.find('canvas')
    expect(canvas).toBeDefined()
    /* const canvas = wrapper.find('canvas')

    expect(canvas.attributes('__spector_context_type')).toBe('webgl2') */
  })
})
