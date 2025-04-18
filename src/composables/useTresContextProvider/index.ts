import type { Camera, WebGLRenderer } from 'three'
import type { ComputedRef, DeepReadonly, MaybeRef, MaybeRefOrGetter, Ref, ShallowRef } from 'vue'
import type { RendererLoop } from '../../core/loop'
import type { EmitEventFn, TresControl, TresObject, TresScene } from '../../types'
import type { UseRendererOptions } from '../useRenderer'
import { Raycaster } from 'three'
import { computed, inject, onUnmounted, provide, readonly, ref, shallowRef } from 'vue'
import { extend } from '../../core/catalogue'
import { createRenderLoop } from '../../core/loop'

import { useCamera } from '../useCamera'
import { useRenderer } from '../useRenderer'
import useSizes, { type SizesType } from '../useSizes'
import { type TresEventManager, useTresEventManager } from '../useTresEventManager'
import { useTresReady } from '../useTresReady'

export interface InternalState {
  priority: Ref<number>
  frames: Ref<number>
  maxFrames: number
}

export interface RenderState {
  /**
   * If set to 'on-demand', the scene will only be rendered when the current frame is invalidated
   * If set to 'manual', the scene will only be rendered when advance() is called
   * If set to 'always', the scene will be rendered every frame
   */
  mode: Ref<'always' | 'on-demand' | 'manual'>
  priority: Ref<number>
  frames: Ref<number>
  maxFrames: number
  canBeInvalidated: ComputedRef<boolean>
}

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
  renderer: ShallowRef<WebGLRenderer>
  raycaster: ShallowRef<Raycaster>
  perf: PerformanceState
  render: RenderState
  // Loop
  loop: RendererLoop
  /**
   * Invalidates the current frame when renderMode === 'on-demand'
   */
  invalidate: () => void
  /**
   * Advance one frame when renderMode === 'manual'
   */
  advance: () => void
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
}

export function useTresContextProvider({
  scene,
  canvas,
  windowSize,
  rendererOptions,
  emit,
}: {
  scene: TresScene
  canvas: MaybeRef<HTMLCanvasElement>
  windowSize: MaybeRefOrGetter<boolean>
  rendererOptions: UseRendererOptions
  emit: EmitEventFn

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

  // Render state

  const render: RenderState = {
    mode: ref(rendererOptions.renderMode || 'always') as Ref<'always' | 'on-demand' | 'manual'>,
    priority: ref(0),
    frames: ref(0),
    maxFrames: 60,
    canBeInvalidated: computed(() => render.mode.value === 'on-demand' && render.frames.value === 0),
  }

  function invalidate(frames = 1) {
    // Increase the frame count, ensuring not to exceed a maximum if desired
    if (rendererOptions.renderMode === 'on-demand') {
      render.frames.value = Math.min(render.maxFrames, render.frames.value + frames)
    }
  }

  function advance() {
    if (rendererOptions.renderMode === 'manual') {
      render.frames.value = 1
    }
  }

  const { renderer } = useRenderer(
    {
      scene,
      canvas,
      options: rendererOptions,
      emit,
      // TODO: replace contextParts with full ctx at https://github.com/Tresjs/tres/issues/516
      contextParts: { sizes, camera, render, invalidate, advance },
    },
  )

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
    render,
    advance,
    extend,
    invalidate,
    registerCamera,
    setCameraActive,
    deregisterCamera,
    loop: createRenderLoop(),
  }

  provide('useTres', ctx)

  // Add context to scene local state
  ctx.scene.value.__tres = {
    root: ctx,
  }

  // The loop

  ctx.loop.register(() => {
    if (camera.value && render.frames.value > 0) {
      renderer.value.render(scene, camera.value)
      emit('render', ctx.renderer.value)
    }

    // Reset priority
    render.priority.value = 0

    if (render.mode.value === 'always') {
      render.frames.value = 1
    }
    else {
      render.frames.value = Math.max(0, render.frames.value - 1)
    }
  }, 'render')

  const { on: onTresReady, cancel: cancelTresReady } = useTresReady(ctx)!

  ctx.loop.setReady(false)
  ctx.loop.start()

  onTresReady(() => {
    emit('ready', ctx)
    ctx.loop.setReady(true)
    useTresEventManager(scene, ctx, emit)
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
