import { mount } from '@vue/test-utils'
import TresLeches from '/@/'
import { it, expect } from 'vitest'

test('TresLeches', async () => {
  it('should mount', async ()=> {
    const wrapper = mount(TresLeches, {
    /*    attachTo: document.body, */
        props: {
          uuid: 'test',
        }
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('div').attributes('id')).toBe('test')
  })
})