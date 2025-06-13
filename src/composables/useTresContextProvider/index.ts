import type { MaybeRef, MaybeRefOrGetter, Ref, ShallowRef } from 'vue'

import type { RendererLoop } from '../../core/loop'
import type { TresControl, TresScene } from '../../types'
import type { RendererOptions, UseRendererManagerReturn } from '../useRenderer/useRendererManager'
import { inject, onUnmounted, provide, ref, shallowRef } from 'vue'
import { extend } from '../../core/catalogue'
import { createRenderLoop } from '../../core/loop'

import type { UseCameraReturn } from '../useCamera/'

import { useCameraManager } from '../useCamera'
import { useRendererManager } from '../useRenderer/useRendererManager'
import useSizes, { type SizesType } from '../useSizes'
import type { TresCanvasProps } from '../../components/TresCanvas.vue'
import { useEventManager } from '../useEventManager'

export interface TresContext {
  scene: ShallowRef<TresScene>
  sizes: SizesType
  extend: (objects: any) => void
  camera: UseCameraReturn
  controls: Ref<TresControl | null>
  renderer: UseRendererManagerReturn
  loop: RendererLoop
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
  rendererOptions: TresCanvasProps
}): TresContext {
  const localScene = shallowRef<TresScene>(scene)
  const sizes = useSizes(windowSize, canvas)

  const camera = useCameraManager({ sizes })

  const loop = createRenderLoop()

  const renderer = useRendererManager(
    {
      scene,
      canvas,
      options: rendererOptions as RendererOptions,
      contextParts: { sizes, camera, loop },
    },
  )

  const events = useEventManager({
    canvas,
    contextParts: { scene: localScene, camera, loop },
  })

  const ctx: TresContext = {
    sizes,
    scene: localScene,
    camera,
    renderer,
    controls: ref(null),
    extend,
    loop,
    events,
  }

  provide('useTres', ctx)

  // Add context to scene local state
  ctx.scene.value.__tres = {
    root: ctx,
  }

  ctx.loop.setReady(false)
  ctx.loop.start()

  renderer.onReady(() => {
    ctx.loop.setReady(true)
  })

  onUnmounted(() => {
    ctx.loop.stop()
  })

  return ctx
}

export function useTresContext(): TresContext {
  const context = inject<Partial<TresContext>>('useTres')

  if (!context) {
    throw new Error('useTresContext must be used together with useTresContextProvider')
  }

  return context as TresContext
}
