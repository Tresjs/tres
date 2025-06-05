import { MathUtils, Raycaster } from 'three'
import type { MaybeRef, MaybeRefOrGetter, Ref, ShallowRef } from 'vue'
import { whenever } from '@vueuse/core'

import type { RendererLoop } from '../../core/loop'
import type { TresControl, TresObject, TresScene } from '../../types'
import type { UseRendererManagerReturn, UseRendererOptions } from '../useRenderer/useRendererManager'
import { inject, onUnmounted, provide, ref, shallowRef } from 'vue'
import { extend } from '../../core/catalogue'
import { createRenderLoop } from '../../core/loop'

import type { UseCameraReturn } from '../useCamera/'

import { useCameraManager } from '../useCamera'
import { useRendererManager } from '../useRenderer/useRendererManager'
import useSizes, { type SizesType } from '../useSizes'
import { useEventManager } from '../useEventManager'

export interface TresContext {
  uuid: string
  scene: ShallowRef<TresScene>
  sizes: SizesType
  extend: (objects: any) => void
  camera: UseCameraReturn
  controls: Ref<TresControl | null>
  renderer: UseRendererManagerReturn
  raycaster: ShallowRef<Raycaster>
  // Loop
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
  rendererOptions: UseRendererOptions
}): TresContext {
  const localScene = shallowRef<TresScene>(scene)
  const sizes = useSizes(windowSize, canvas)

  const camera = useCameraManager({ sizes })

  const loop = createRenderLoop()

  const events = useEventManager({
    scene,
    canvas,
    camera: camera.activeCamera,
  })

  const renderer = useRendererManager(
    {
      scene,
      canvas,
      options: rendererOptions,
      contextParts: { sizes, camera, loop, events },
    },
  )

  const ctx: TresContext = {
    uuid: MathUtils.generateUUID(),
    sizes,
    scene: localScene,
    camera,
    renderer,
    raycaster: shallowRef(new Raycaster()),
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

  whenever(renderer.isReady, () => { // TODO #994 This does not belong here, see https://github.com/Tresjs/tres/issues/595
    ctx.loop.setReady(true)
  }, {
    once: true,
    immediate: true,
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

export const useTres = useTresContext
