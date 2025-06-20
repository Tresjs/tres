import type { MaybeRef, MaybeRefOrGetter, Ref, ShallowRef } from 'vue'

import type { TresControl, TresScene } from '../../types'
import type { RendererOptions, UseRendererManagerReturn } from '../useRenderer/useRendererManager'
import { inject, provide, ref, shallowRef } from 'vue'
import { extend } from '../../core/catalogue'

import type { UseCameraReturn } from '../useCamera/'

import { useCameraManager } from '../useCamera'
import { useRendererManager } from '../useRenderer/useRendererManager'
import useSizes, { type SizesType } from '../useSizes'
import { useEventManager } from '../useEventManager'

export interface TresContext {
  scene: ShallowRef<TresScene>
  sizes: SizesType
  extend: (objects: any) => void
  camera: UseCameraReturn
  controls: Ref<TresControl | null>
  renderer: UseRendererManagerReturn
  events: ReturnType<typeof useEventManager>
}

export function useTresContextProvider({
  scene,
  canvas,
  windowSize,
  rendererOptions,
}: {
  scene: TresScene
  canvas: MaybeRef<HTMLCanvasElement>
  windowSize: MaybeRefOrGetter<boolean>
  rendererOptions: RendererOptions
}): TresContext {
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
  }

  provide('useTres', ctx)

  // Add context to scene local state
  ctx.scene.value.__tres = {
    root: ctx,
  }

  return ctx
}

export function useTresContext(): TresContext {
  const context = inject<Partial<TresContext>>('useTres')

  if (!context) {
    throw new Error('useTresContext must be used together with useTresContextProvider')
  }

  return context as TresContext
}
