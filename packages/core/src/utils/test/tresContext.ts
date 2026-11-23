import { mount } from '@vue/test-utils'
import { Scene } from 'three'
import { vi } from 'vitest'
import type { VNodeChild } from 'vue'
import { defineComponent, h, onUnmounted, reactive } from 'vue'
import type { RenderMode, TresContext } from '../../composables'
import { triggerContextUnmount, useBaseTresContextProvider } from '../../composables/useTresContextProvider'
import type { TresScene } from '../../types'

export const createStubRenderer = (overrides: Record<string, unknown> = {}) => ({
  isRenderer: true,
  domElement: document.createElement('canvas'),
  shadowMap: { enabled: false, type: 1 },
  toneMapping: 0,
  outputColorSpace: 'srgb',
  init: vi.fn(async () => {}),
  setSize: vi.fn(),
  setPixelRatio: vi.fn(),
  getPixelRatio: vi.fn(() => 1),
  setClearColor: vi.fn(),
  render: vi.fn(),
  dispose: vi.fn(),
  ...overrides,
})

export interface MountInTresContextOptions {
  renderMode?: RenderMode
  renderer?: Record<string, unknown>
}

// Like `Context.vue`, unmounting runs the context `onUnmount` callbacks after the children unmount.
export function mountInTresContext(render: () => VNodeChild, { renderMode = 'always', renderer = createStubRenderer() }: MountInTresContextOptions = {}) {
  let ctx!: TresContext

  const wrapper = mount(defineComponent({
    setup() {
      ctx = useBaseTresContextProvider({
        scene: new Scene() as TresScene,
        canvas: document.createElement('canvas'),
        windowSize: false,
        rendererOptions: reactive({ renderMode, renderer: () => renderer as any }),
      })
      onUnmounted(() => triggerContextUnmount(ctx))
      return () => render()
    },
  }))

  return { wrapper, ctx, renderer }
}

export const withSetup = (setup: () => void) => defineComponent({
  setup() {
    setup()
    return () => null
  },
})

export const renderSetup = (setup: () => void) => () => h(withSetup(setup))
