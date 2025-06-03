import { Raycaster } from 'three'
import type { MaybeRef, MaybeRefOrGetter, Ref, ShallowRef } from 'vue'
import { whenever } from '@vueuse/core'

import type { RendererLoop } from '../../core/loop'
import type { TresControl, TresObject, TresScene } from '../../types'
import type { UseRendererManagerReturn } from '../useRenderer/useRendererManager'
import { inject, onUnmounted, provide, ref, shallowRef } from 'vue'
import { extend } from '../../core/catalogue'
import { createRenderLoop } from '../../core/loop'

import type { UseCameraReturn } from '../useCamera/'

import { useCameraManager } from '../useCamera'
import { useRendererManager } from '../useRenderer/useRendererManager'
import useSizes, { type SizesType } from '../useSizes'
import { type TresEventManager, useTresEventManager } from '../useTresEventManager'
import type { TresCanvasProps } from 'src/components/TresCanvas.vue'

export interface TresContext {
  scene: ShallowRef<TresScene>
  sizes: SizesType
  extend: (objects: any) => void
  camera: UseCameraReturn
  controls: Ref<TresControl | null>
  renderer: UseRendererManagerReturn
  raycaster: ShallowRef<Raycaster>
  // Loop
  loop: RendererLoop
  eventManager?: TresEventManager
  // Events
  // Temporaly add the methods to the context, this should be handled later by the EventManager state on the context https://github.com/Tresjs/tres/issues/515
  // When thats done maybe we can short the names of the methods since the parent will give the context.
  registerObjectAtPointerEventHandler?: (object: TresObject) => void
  deregisterObjectAtPointerEventHandler?: (object: TresObject) => void
  registerBlockingObjectAtPointerEventHandler?: (object: TresObject) => void
  deregisterBlockingObjectAtPointerEventHandler?: (object: TresObject) => void
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
      options: rendererOptions,
      contextParts: { sizes, camera, loop },
    },
  )

  const ctx: TresContext = {
    sizes,
    scene: localScene,
    camera,
    renderer,
    raycaster: shallowRef(new Raycaster()),
    controls: ref(null),
    extend,
    loop,
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

  useTresEventManager(scene, ctx)

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
