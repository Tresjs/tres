import * as THREE from 'three'
import { mount } from '@vue/test-utils'
import { defineComponent, h, ref } from 'vue'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { setupMocks } from '../../utils/test/mocking'
import { extend } from '../../core/catalogue'

describe('props', () => {
  beforeAll(() => {
    extend(THREE)
  })

  const getTresCanvas = async () => {
    vi.resetModules()
    await setupMocks()
    return (await import('../TresCanvas.vue')).default
  }

  const mountPair = async ({
    fpsA,
    fpsB,
  }: {
    fpsA?: number
    fpsB?: number
  }) => {
    const TresCanvas = await getTresCanvas()
    const loopA = vi.fn()
    const loopB = vi.fn()

    const wrapper = mount(defineComponent({
      setup: () => () => h('div', [
        h(TresCanvas, { windowSize: true, fpsLimit: fpsA, onLoop: loopA }),
        h(TresCanvas, { windowSize: true, fpsLimit: fpsB, onLoop: loopB }),
      ]),
    }), {
      attachTo: document.body,
    })

    await vi.waitFor(() => {
      expect(loopA).toHaveBeenCalled()
      expect(loopB).toHaveBeenCalled()
    })

    return { wrapper, loopA, loopB }
  }

  it('respects fpsLimit prop', { retry: 3 }, async () => {
    const { wrapper, loopA, loopB } = await mountPair({ fpsA: 20, fpsB: 60 })
    expect(loopA.mock.calls.length).toBeLessThan(loopB.mock.calls.length)
    wrapper.unmount()
  })

  it('reacts when fpsLimit changes from number to undefined', { retry: 3 }, async () => {
    const TresCanvas = await getTresCanvas()
    const dynamicFpsLimit = ref<number | undefined>(20)
    const dynamicLoop = vi.fn()
    const staticLoop = vi.fn()

    const wrapper = mount(defineComponent({
      setup: () => () => h('div', [
        h(TresCanvas, { windowSize: true, fpsLimit: dynamicFpsLimit.value, onLoop: dynamicLoop }),
        h(TresCanvas, { windowSize: true, fpsLimit: 20, onLoop: staticLoop }),
      ]),
    }), {
      attachTo: document.body,
    })

    await vi.waitFor(() => {
      expect(dynamicLoop).toHaveBeenCalled()
      expect(staticLoop).toHaveBeenCalled()
    })
    expect(dynamicLoop.mock.calls.length).toBe(staticLoop.mock.calls.length)

    dynamicFpsLimit.value = undefined
    vi.clearAllMocks()

    await vi.waitFor(() => {
      expect(dynamicLoop).toHaveBeenCalled()
      expect(staticLoop).toHaveBeenCalled()
      expect(dynamicLoop.mock.calls.length).toBeGreaterThan(staticLoop.mock.calls.length)
    })

    wrapper.unmount()
  })

  it('reacts when fpsLimit changes from undefined to number', { retry: 3 }, async () => {
    const TresCanvas = await getTresCanvas()
    const dynamicFpsLimit = ref<number | undefined>(undefined)
    const dynamicLoop = vi.fn()
    const staticLoop = vi.fn()

    const wrapper = mount(defineComponent({
      setup: () => () => h('div', [
        h(TresCanvas, { windowSize: true, fpsLimit: dynamicFpsLimit.value, onLoop: dynamicLoop }),
        h(TresCanvas, { windowSize: true, onLoop: staticLoop }),
      ]),
    }), {
      attachTo: document.body,
    })

    await vi.waitFor(() => {
      expect(dynamicLoop).toHaveBeenCalled()
      expect(staticLoop).toHaveBeenCalled()
      expect(dynamicLoop.mock.calls.length).toBeGreaterThanOrEqual(staticLoop.mock.calls.length)
    })

    dynamicFpsLimit.value = 20
    vi.clearAllMocks()

    await vi.waitFor(() => {
      expect(dynamicLoop).toHaveBeenCalled()
      expect(staticLoop).toHaveBeenCalled()
      expect(dynamicLoop.mock.calls.length).toBeLessThan(staticLoop.mock.calls.length)
    })

    wrapper.unmount()
  })
})
