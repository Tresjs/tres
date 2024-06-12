import { mount } from '@vue/test-utils'
import TresCanvas from './TresCanvas.vue'
import TheExperience from './TheExperience.vue'

describe('tresCanvas', () => {
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
