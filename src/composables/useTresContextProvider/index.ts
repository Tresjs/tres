import type { Camera } from 'three'
import type { ComputedRef, DeepReadonly, MaybeRef, MaybeRefOrGetter, Ref, ShallowRef } from 'vue'
import type { RendererLoop } from '../../core/loop'
import type { TresControl, TresObject, TresScene } from '../../types'
import type { UseRendererManagerReturn, UseRendererOptions } from '../useRenderer/useRendererManager'
import { Raycaster } from 'three'
import { inject, onUnmounted, provide, readonly, ref, shallowRef } from 'vue'
import { extend } from '../../core/catalogue'
import { createRenderLoop } from '../../core/loop'

import { useCamera } from '../useCamera'
import { useRendererManager } from '../useRenderer/useRendererManager'
import useSizes, { type SizesType } from '../useSizes'
import { type TresEventManager, useTresEventManager } from '../useTresEventManager'
import { useTresReady } from '../useTresReady'
import { createEventHook, type EventHookOff } from '@vueuse/core'

export interface PerformanceState {
  maxFrames: number
  fps: {
    value: number
    accumulator: number[]
  }
  memory: {
    currentMem: number
    allocatedMem: number
    accumulator: number[]
  }
}

export interface TresContext {
  scene: ShallowRef<TresScene>
  sizes: SizesType
  extend: (objects: any) => void
  camera: ComputedRef<Camera | undefined>
  cameras: DeepReadonly<Ref<Camera[]>>
  controls: Ref<TresControl | null>
  renderer: UseRendererManagerReturn
  raycaster: ShallowRef<Raycaster>
  perf: PerformanceState
  // Loop
  loop: RendererLoop
  // Camera
  registerCamera: (maybeCamera: unknown) => void
  setCameraActive: (cameraOrUuid: Camera | string) => void
  deregisterCamera: (maybeCamera: unknown) => void
  eventManager?: TresEventManager
  // Events
  // Temporaly add the methods to the context, this should be handled later by the EventManager state on the context https://github.com/Tresjs/tres/issues/515
  // When thats done maybe we can short the names of the methods since the parent will give the context.
  registerObjectAtPointerEventHandler?: (object: TresObject) => void
  deregisterObjectAtPointerEventHandler?: (object: TresObject) => void
  registerBlockingObjectAtPointerEventHandler?: (object: TresObject) => void
  deregisterBlockingObjectAtPointerEventHandler?: (object: TresObject) => void
  onReady: EventHookOff<TresContext> // TODO #980 consider removing this
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

  const {
    camera,
    cameras,
    registerCamera,
    deregisterCamera,
    setCameraActive,
  } = useCamera({ sizes, scene })

  const loop = createRenderLoop()

  const renderer = useRendererManager(
    {
      scene,
      canvas,
      options: rendererOptions,
      contextParts: { sizes, camera, loop },
    },
  )

  const readyEventHook = createEventHook<TresContext>() // TODO #980 consider removing this

  const ctx: TresContext = {
    sizes,
    scene: localScene,
    camera,
    cameras: readonly(cameras),
    renderer,
    raycaster: shallowRef(new Raycaster()),
    controls: ref(null),
    perf: {
      maxFrames: 160,
      fps: {
        value: 0,
        accumulator: [],
      },
      memory: {
        currentMem: 0,
        allocatedMem: 0,
        accumulator: [],
      },
    },
    extend,
    registerCamera,
    setCameraActive,
    deregisterCamera,
    loop,
    onReady: readyEventHook.on,
  }

  provide('useTres', ctx)

  // Add context to scene local state
  ctx.scene.value.__tres = {
    root: ctx,
  }

  const { on: onTresReady, cancel: cancelTresReady } = useTresReady(ctx)!

  ctx.loop.setReady(false)
  ctx.loop.start()

  onTresReady(() => {
    readyEventHook.trigger(ctx)
    ctx.loop.setReady(true)
    useTresEventManager(scene, ctx)
  })

  onUnmounted(() => {
    cancelTresReady()
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
