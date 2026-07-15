import type { ComputedRef, MaybeRef, MaybeRefOrGetter, Ref, ShallowRef } from 'vue'

import type { TresControl, TresScene } from '../../types'
import type { RendererOptions, UseRendererManagerReturn } from '../useRenderer/useRendererManager'
import { computed, ref, shallowRef } from 'vue'
import { extend } from '../../core/catalogue'
import { isWebGPURenderer } from '../../utils/is'

import type { UseCameraReturn } from '../useCamera'

import { useCameraManager } from '../useCamera'
import { useRendererManager } from '../useRenderer/useRendererManager'
import useSizes from '../useSizes'
import type { SizesType } from '../useSizes'
import { useEventManager } from '../useEventManager'
import { createInjectionState } from '@vueuse/core'

export interface TresContext {
  scene: ShallowRef<TresScene>
  sizes: SizesType
  extend: (objects: any) => void
  camera: UseCameraReturn
  controls: Ref<TresControl | null>
  renderer: UseRendererManagerReturn
  /**
   * Whether the active renderer is a Three.js WebGPU `Renderer` (as opposed to a
   * `WebGLRenderer`). Reactive so downstream components can branch on it without
   * re-deriving it from `renderer.instance`.
   *
   * Note: this reflects the renderer instance, not the active backend — a
   * `WebGPURenderer` running on its WebGL2 fallback still reports `true`.
   */
  isWebGPU: ComputedRef<boolean>
  events: ReturnType<typeof useEventManager>
}

export const INJECTION_KEY = 'useTres' // this is intentionally not a symbol as it can not properly be bridged to the custom renderer

const [useTresContextProvider, _useTresContext] = createInjectionState(({
  scene,
  canvas,
  fpsLimit,
  windowSize,
  rendererOptions,
}: {
  scene: TresScene
  canvas: MaybeRef<HTMLCanvasElement>
  fpsLimit?: MaybeRefOrGetter<number>
  windowSize: MaybeRefOrGetter<boolean>
  rendererOptions: RendererOptions
}): TresContext => {
  const localScene = shallowRef(scene)
  const sizes = useSizes(windowSize, canvas)

  const camera = useCameraManager({ sizes })

  const renderer = useRendererManager(
    {
      scene: localScene,
      canvas,
      options: rendererOptions,
      fpsLimit,
      contextParts: { sizes, camera },
    },
  )

  const events = useEventManager({
    canvas,
    contextParts: { scene: localScene, camera, renderer },
  })

  const ctx: TresContext = {
    sizes,
    scene: localScene,
    camera,
    renderer,
    isWebGPU: computed(() => isWebGPURenderer(renderer.instance)),
    controls: ref(null),
    extend,
    events,
  }

  // Add context to scene local state
  ctx.scene.value.__tres = {
    root: ctx,
    objects: [],
    isUnmounting: false,
  }

  return ctx
}, {
  injectionKey: 'useTres',
})

const useTresContext = () => {
  const ctx = _useTresContext()

  if (!ctx) {
    throw new Error('useTresContext must be used together with useTresContextProvider.\n You probably tried to use it above or on the same level as a TresCanvas component.\n It should be used in child components of a TresCanvas instance.')
  }

  return ctx!
}

export { useTresContext, useTresContextProvider }
