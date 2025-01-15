import { mount } from '@vue/test-utils'
import { TresLeches } from '/@/'
import { expect, it } from 'vitest'
import { dispose } from '../composables/useControls'

afterEach(() => {
  dispose()
})

describe('tresLeches', async () => {
  it('should mount', async () => {
    const wrapper = mount(TresLeches, {
    /*    attachTo: document.body, */
      props: {
        uuid: 'test',
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('div').attributes('id')).toBe('test')
  })
})
