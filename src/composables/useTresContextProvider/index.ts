import type { Camera } from 'three'
import { Raycaster } from 'three'
import type { ComputedRef, DeepReadonly, MaybeRefOrGetter, Ref, ShallowRef } from 'vue'
import type { RendererLoop } from '../../core/loop'
import type { EmitEventFn, Renderer, TresControl, TresObject, TresScene } from '../../types'

import { computed, inject, onUnmounted, provide, readonly, ref, shallowRef } from 'vue'
import { createRenderLoop } from '../../core/loop'
import { extend } from '../../core/catalogue'
import { useCamera } from '../useCamera'
import useSizes, { type SizesType } from '../useSizes'
import { type TresEventManager, useTresEventManager } from '../useTresEventManager'
import { useTresReady } from '../useTresReady'
import type { TresCanvasProps } from '../../components/TresCanvas.vue'
import { setupDevtools } from '../../devtools/setupDevtools'
import { useRenderer } from '../useRenderer'

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
  camera: ComputedRef<Camera | undefined>
  cameras: DeepReadonly<Ref<Camera[]>>
  controls: Ref<TresControl | null>
  renderer: ShallowRef<Renderer>
  canvas: Ref<HTMLCanvasElement>
  raycaster: ShallowRef<Raycaster>
  perf: PerformanceState
  render: RenderState
  extend: typeof extend
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

export async function useTresContextProvider({
  emit,
  scene,
  canvas,
  windowSize,
  rendererOptions,
}: {
  emit: EmitEventFn
  scene: TresScene
  canvas: Ref<HTMLCanvasElement>
  windowSize: MaybeRefOrGetter<boolean>
  rendererOptions: TresCanvasProps
}): Promise<TresContext> {
  const localScene = shallowRef<TresScene>(scene)
  const sizes = useSizes(windowSize, canvas)

  const {
    camera,
    cameras,
    registerCamera,
    deregisterCamera,
    setCameraActive,
  } = useCamera({ sizes, scene })

  const renderState: RenderState = { // TODO rename // TODO make separate
    mode: ref(rendererOptions.renderMode || 'always') as Ref<'always' | 'on-demand' | 'manual'>,
    priority: ref(0),
    frames: ref(0),
    maxFrames: 60, // TODO add issue for prop
    canBeInvalidated: computed(() => renderState.mode.value === 'on-demand' && renderState.frames.value === 0),
  }

  function invalidate(frames = 1) {
    // Increase the frame count, ensuring not to exceed a maximum if desired
    if (rendererOptions.renderMode === 'on-demand') {
      renderState.frames.value = Math.min(renderState.maxFrames, renderState.frames.value + frames)
    }
  }

  function advance() {
    if (rendererOptions.renderMode === 'manual') {
      renderState.frames.value = 1
    }
  }

  const loop = createRenderLoop()

  const renderer = await useRenderer({
    contextParts: {
      sizes,
      scene: localScene,
      camera,
      canvas,
      advance,
      invalidate,
      loop,
    },
    options: rendererOptions,
    emit,
    renderState,
  })

  const ctx: TresContext = {
    sizes,
    scene: localScene,
    camera,
    cameras: readonly(cameras),
    renderer: shallowRef(renderer),
    raycaster: shallowRef(new Raycaster()),
    canvas,
    extend,
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
    render: renderState,
    advance,
    invalidate,
    registerCamera,
    setCameraActive,
    deregisterCamera,
    loop,
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
    emit('ready', ctx)
    ctx.loop.setReady(true)
    useTresEventManager(scene, ctx, emit)
  })

  onUnmounted(() => {
    cancelTresReady()
    ctx.loop.stop()
  })

  setupDevtools(ctx)

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
