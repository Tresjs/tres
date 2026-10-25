import type { ComputedRef, MaybeRef, MaybeRefOrGetter, Ref, ShallowRef } from 'vue'

import type { TresControl, TresScene } from '../../types'
import type { DefaultRendererFactory, RendererOptions, UseRendererManagerReturn } from '../useRenderer/useRendererManager'
import { computed, ref, shallowRef } from 'vue'
import { extend } from '../../core/catalogue'
import { isWebGPURenderer } from '../../utils/is'

import type { UseCameraReturn } from '../useCamera'

import { useCameraManager } from '../useCamera'
import { useBaseRendererManager } from '../useRenderer/useRendererManager'
import useSizes from '../useSizes'
import type { SizesType } from '../useSizes'
import { useEventManager } from '../useEventManager'
import type { EventHook, EventHookOn } from '@vueuse/core'
import { createEventHook, createInjectionState } from '@vueuse/core'

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
  /**
   * Registers a callback that runs once when the canvas unmounts, after all of its children have unmounted.
   */
  onUnmount: EventHookOn<void>
}

export const INJECTION_KEY = 'useTres' // this is intentionally not a symbol as it can not properly be bridged to the custom renderer

export interface TresContextProviderOptions {
  scene: TresScene
  canvas: MaybeRef<HTMLCanvasElement>
  fpsLimit?: MaybeRefOrGetter<number>
  windowSize: MaybeRefOrGetter<boolean>
  rendererOptions: RendererOptions
}

const unmountHooks = new WeakMap<TresContext, EventHook<void>>()

// Only the canvas that owns the context calls this.
const triggerContextUnmount = (ctx: TresContext) => {
  unmountHooks.get(ctx)?.trigger()
  unmountHooks.delete(ctx)
}

// Shared by both entries. The public `useTresContextProvider` of each entry passes its default renderer.
const [useBaseTresContextProvider, _useTresContext] = createInjectionState(({
  scene,
  canvas,
  fpsLimit,
  windowSize,
  rendererOptions,
}: TresContextProviderOptions, createDefaultRenderer?: DefaultRendererFactory): TresContext => {
  const localScene = shallowRef(scene)
  const sizes = useSizes(windowSize, canvas)

  const camera = useCameraManager({ sizes })

  const renderer = useBaseRendererManager(
    {
      scene: localScene,
      canvas,
      options: rendererOptions,
      fpsLimit,
      contextParts: { sizes, camera },
    },
    createDefaultRenderer,
  )

  const events = useEventManager({
    canvas,
    contextParts: { scene: localScene, camera, renderer },
  })

  const unmountHook = createEventHook<void>()

  const ctx: TresContext = {
    sizes,
    scene: localScene,
    camera,
    renderer,
    isWebGPU: computed(() => isWebGPURenderer(renderer.instance)),
    controls: ref(null),
    extend,
    events,
    onUnmount: unmountHook.on,
  }
  unmountHooks.set(ctx, unmountHook)

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

export { triggerContextUnmount, useBaseTresContextProvider, useTresContext }
