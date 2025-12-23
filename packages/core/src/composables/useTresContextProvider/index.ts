import type { MaybeRef, MaybeRefOrGetter, Ref, ShallowRef } from 'vue'

import type { TresControl, TresScene } from '../../types'
import type { RendererOptions, UseRendererManagerReturn } from '../useRenderer/useRendererManager'
import { ref, shallowRef } from 'vue'
import { extend } from '../../core/catalogue'

import type { UseCameraReturn } from '../useCamera'

import { useCameraManager } from '../useCamera'
import { useRendererManager } from '../useRenderer/useRendererManager'
import useSizes, { type SizesType } from '../useSizes'
import { useEventManager } from '../useEventManager'
import { createInjectionState } from '@vueuse/core'

export interface TresCustomRendererOptions {
  primitivePrefix?: string
}

export interface TresContext {
  scene: ShallowRef<TresScene>
  sizes: SizesType
  extend: (objects: any) => void
  camera: UseCameraReturn
  controls: Ref<TresControl | null>
  renderer: UseRendererManagerReturn
  events: ReturnType<typeof useEventManager>
  options: TresCustomRendererOptions
}

export const INJECTION_KEY = 'useTres' // this is intentionally not a symbol as it can not properly be bridged to the custom renderer

const [useTresContextProvider, _useTresContext] = createInjectionState(({
  scene,
  canvas,
  windowSize,
  rendererOptions,
  options,
}: {
  scene: TresScene
  canvas: MaybeRef<HTMLCanvasElement>
  windowSize: MaybeRefOrGetter<boolean>
  rendererOptions: RendererOptions
  options: TresCustomRendererOptions
}): TresContext => {
  const localScene = shallowRef(scene)
  const sizes = useSizes(windowSize, canvas)

  const camera = useCameraManager({ sizes })

  const renderer = useRendererManager(
    {
      scene: localScene,
      canvas,
      options: rendererOptions,
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
    controls: ref(null),
    extend,
    events,
    options,
  }

  // Add context to scene local state
  ctx.scene.value.__tres = {
    root: ctx,
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
