import { mount } from '@vue/test-utils'
import { TresLeches, useControls } from '../index'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent } from 'vue'
import { dispose } from '../composables/useControls'

vi.mock('@vueuse/motion', () => ({
  useMotion: () => ({
    apply: vi.fn(),
  }),
}))

beforeEach(() => {
  dispose()
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

  it('shows and recreates panel actions only while expanded', async () => {
    const expanded = mount(TresLeches)
    const collapsed = mount(TresLeches, {
      props: { collapsed: true },
    })

    expect(expanded.find('button[aria-label="Search controls and folders"]').exists()).toBe(true)
    expect(expanded.find('button[aria-label="Copy panel values as JSON"]').exists()).toBe(true)
    expect(expanded.find('.tl-panel-action-search').exists()).toBe(true)
    expect(expanded.find('.tl-panel-action-copy').exists()).toBe(true)
    expect(collapsed.find('button[aria-label="Search controls and folders"]').exists()).toBe(false)
    expect(collapsed.find('button[aria-label="Copy panel values as JSON"]').exists()).toBe(false)

    await expanded.find('button[aria-label="Toggle panel"]').trigger('click')
    expect(expanded.find('.tl-panel-action').exists()).toBe(false)

    await expanded.find('button[aria-label="Toggle panel"]').trigger('click')
    expect(expanded.find('.tl-panel-action-search').exists()).toBe(true)
    expect(expanded.find('.tl-panel-action-copy').exists()).toBe(true)
  })

  it('filters controls while preserving and opening their parent folder', async () => {
    const component = defineComponent({
      components: { TresLeches },
      setup() {
        useControls({ exposure: 1 })
        useControls('Camera', { position: 2, fov: 50 })
        useControls('Lights', { intensity: 4 })
      },
      template: '<TresLeches :float="false" />',
    })
    const wrapper = mount(component)

    await wrapper.find('button[aria-label="Search controls and folders"]').trigger('click')
    const searchInput = wrapper.find('input[aria-label="Search controls or folders"]')
    expect(searchInput.attributes('placeholder')).toBe('Search stuff')
    await searchInput.setValue('position')

    expect(wrapper.find('button[data-folder="Camera"]').attributes('aria-expanded')).toBe('true')
    expect(wrapper.find('button[data-folder="Lights"]').exists()).toBe(false)
    expect(wrapper.find('input#default-CameraPosition').exists()).toBe(true)
    expect(wrapper.find('input#default-CameraFov').exists()).toBe(false)
    expect(wrapper.find('input#default-exposure').exists()).toBe(false)

    await searchInput.setValue('camera')

    expect(wrapper.find('input#default-CameraPosition').exists()).toBe(true)
    expect(wrapper.find('input#default-CameraFov').exists()).toBe(true)

    await searchInput.setValue('missing')

    expect(wrapper.text()).toContain('No controls found')
  })

  it('copies current panel values as formatted JSON', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(window.navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    })

    const component = defineComponent({
      components: { TresLeches },
      setup() {
        useControls({
          exposure: 1,
          apply: { type: 'button', label: 'Apply', onClick: vi.fn() },
        })
        useControls('Camera', { fov: 50 })
      },
      template: '<TresLeches :float="false" />',
    })
    const wrapper = mount(component)
    const copyButton = wrapper.find('button[aria-label="Copy panel values as JSON"]')

    expect(copyButton.attributes('title')).toBe('Copy values for AI')
    await copyButton.trigger('click')

    expect(writeText).toHaveBeenCalledOnce()
    expect(JSON.parse(writeText.mock.calls[0][0])).toEqual({
      exposure: 1,
      Camera: {
        fov: 50,
      },
    })
    expect(wrapper.find('button[aria-label="Copied panel values as JSON"]').exists()).toBe(true)
  })
})
