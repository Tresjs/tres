import { mount } from '@vue/test-utils'
import { WebGLRenderer } from 'three'
import { Scene } from './component'

test('mount component', async () => {
  expect(Scene).toBeTruthy()

  const wrapper = mount(Scene, {
    props: {
      count: 4,
    },
    provide: {
      renderer: new WebGLRenderer(),
    },
  })

  console.log(wrapper)
})
