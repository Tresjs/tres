import { flushPromises, mount } from '@vue/test-utils'
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

    const cameraFolder = wrapper.find('button[data-folder="Camera"]')
    const lightsFolder = wrapper.find('button[data-folder="Lights"]')
    expect(cameraFolder.attributes('aria-expanded')).toBe('true')
    expect(cameraFolder.attributes('disabled')).toBeDefined()
    expect(lightsFolder.exists()).toBe(true)
    expect(lightsFolder.isVisible()).toBe(false)
    expect(wrapper.find('input#default-CameraPosition').exists()).toBe(true)
    expect(wrapper.find('input#default-CameraFov').exists()).toBe(false)
    expect(wrapper.find('input#default-exposure').exists()).toBe(false)

    await cameraFolder.trigger('click')
    await searchInput.setValue('')
    expect(wrapper.find('button[data-folder="Camera"]').attributes('aria-expanded')).toBe('false')

    await searchInput.setValue('camera')

    expect(wrapper.find('input#default-CameraPosition').exists()).toBe(true)
    expect(wrapper.find('input#default-CameraFov').exists()).toBe(true)

    await searchInput.setValue('missing')

    expect(wrapper.text()).toContain('No controls found')
  })

  it('preserves an open folder and panel height when search hides it', async () => {
    const component = defineComponent({
      components: { TresLeches },
      setup() {
        useControls('Camera', { fov: 50 })
      },
      template: '<TresLeches />',
    })
    const wrapper = mount(component)
    const cameraFolder = wrapper.find('button[data-folder="Camera"]')

    await cameraFolder.trigger('click')
    const openPanelStyle = wrapper.find('#tres-leches-pane-default').attributes('style')
    const folderElement = cameraFolder.element

    await wrapper.find('button[aria-label="Search controls and folders"]').trigger('click')
    const searchInput = wrapper.find('input[aria-label="Search controls or folders"]')
    await searchInput.setValue('missing')

    expect(wrapper.find('button[data-folder="Camera"]').exists()).toBe(true)
    expect(wrapper.find('button[data-folder="Camera"]').isVisible()).toBe(false)

    await searchInput.setValue('')

    const restoredFolder = wrapper.find('button[data-folder="Camera"]')
    expect(restoredFolder.element).toBe(folderElement)
    expect(restoredFolder.attributes('aria-expanded')).toBe('true')
    expect(wrapper.find('#tres-leches-pane-default').attributes('style')).toBe(openPanelStyle)
  })

  it('keeps the slot height when the panel height is recalculated', async () => {
    const SLOT_HEIGHT = 96
    // jsdom has no layout, so the stub reports the slot height the browser would measure.
    vi.stubGlobal('ResizeObserver', class {
      constructor(private callback: ResizeObserverCallback) {}
      observe(target: Element) {
        Object.defineProperty(target, 'clientHeight', { configurable: true, value: SLOT_HEIGHT })
        this.callback([{ target } as ResizeObserverEntry], this as unknown as ResizeObserver)
      }

      unobserve() {}
      disconnect() {}
    })

    const component = defineComponent({
      components: { TresLeches },
      setup() {
        useControls({ first: 1 })
      },
      template: '<TresLeches><p>Slot content</p></TresLeches>',
    })
    const wrapper = mount(component)
    await flushPromises()

    // A control added after mount makes the panel recalculate its height.
    useControls({ second: 2 })
    await flushPromises()

    // Header (32) + padding (32) + two controls (2 * 24) + slot.
    expect(wrapper.find('#tres-leches-pane-default').attributes('style')).toContain(`height: ${32 + 32 + 2 * 24 + SLOT_HEIGHT}px`)
    vi.unstubAllGlobals()
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
          exposure: { value: 1, label: 'Exposure level' },
          contrast: { value: 2, label: 'Exposure level' },
          apply: { type: 'button', label: 'Apply', onClick: vi.fn() },
          frameTime: { type: 'graph', value: 16 },
        })
        useControls('Camera', { fov: { value: 50, label: 'Field of view' } })
        useControls('Stats', { frameTime: { type: 'graph', value: 16 } })
        useControls('fpsgraph')
      },
      template: '<TresLeches :float="false" />',
    })
    const wrapper = mount(component, {
      global: {
        stubs: {
          FPSGraph: true,
          GraphControl: true,
        },
      },
    })
    const copyButton = wrapper.find('button[aria-label="Copy panel values as JSON"]')

    expect(copyButton.attributes('title')).toBe('Copy values for AI')
    await copyButton.trigger('click')

    expect(writeText).toHaveBeenCalledOnce()
    expect(JSON.parse(writeText.mock.calls[0][0])).toEqual({
      exposure: 1,
      contrast: 2,
      Camera: {
        CameraFov: 50,
      },
    })
    expect(wrapper.find('button[aria-label="Copied panel values as JSON"]').exists()).toBe(true)
  })
})
