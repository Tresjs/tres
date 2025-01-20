import { mount } from '@vue/test-utils'
import { TresLeches } from '../index'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { dispose } from '../composables/useControls'

beforeEach(() => {
  dispose()
  // Mock the useMotion composable
  vi.mock('@vueuse/motion', () => ({
    useMotion: () => ({
      apply: vi.fn(),
    }),
  }))
})

describe('tresLeches', () => {
  it('should mount', async () => {
    const wrapper = mount(TresLeches, {
      props: {
        uuid: 'test',
      },
      attachTo: document.body,
    })
    // Remove dynamic style attributes before snapshot
    const html = wrapper.html().replace(/style="[^"]*"/, '')
    expect(html).toMatchSnapshot()
  })
})
