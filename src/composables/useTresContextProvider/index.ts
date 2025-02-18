import type { Camera } from 'three'
import type { ComputedRef, DeepReadonly, MaybeRef, MaybeRefOrGetter, Ref, ShallowRef } from 'vue'
import type { RendererLoop } from '../../core/loop'
import type { EmitEventFn, Renderer, TresControl, TresScene } from '../../types'
import { Raycaster } from 'three'
import { computed, inject, onUnmounted, provide, readonly, ref, shallowRef, toValue } from 'vue'
import { extend } from '../../core/catalogue'
import { createRenderLoop } from '../../core/loop'
import { type Events, useEventsOptions as withEventsProps } from '../../utils/createEvents'

import { useCamera } from '../useCamera'
import useSizes, { type SizesType } from '../useSizes'
import { useTresReady } from '../useTresReady'
import { withRendererProps } from '../../utils/createRenderer/withRendererProps'
import type { TresCanvasProps } from 'src/components/TresCanvas.vue'

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
  events: Events
  scene: ShallowRef<TresScene>
  sizes: SizesType
  extend: (objects: any) => void
  camera: ComputedRef<Camera | undefined>
  cameras: DeepReadonly<Ref<Camera[]>>
  controls: Ref<TresControl | null>
  renderer: ShallowRef<Renderer>
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
  parentContext?: TresContext
  // The TresCanvas' emit.
  emit: EmitEventFn
  // The user's TresCanvas' props.
  props: TresCanvasProps
}

export async function useTresContextProvider({
  scene,
  canvas,
  windowSize,
  props,
  emit,
}: {
  scene: TresScene
  canvas: MaybeRef<HTMLCanvasElement>
  windowSize: MaybeRefOrGetter<boolean>
  props: TresCanvasProps
  emit: EmitEventFn

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

  // Render state

  const render: RenderState = {
    mode: ref(props.renderMode || 'always') as Ref<'always' | 'on-demand' | 'manual'>,
    priority: ref(0),
    frames: ref(0),
    maxFrames: 60,
    canBeInvalidated: computed(() => render.mode.value === 'on-demand' && render.frames.value === 0),
  }

  function invalidate(frames = 1) {
    // Increase the frame count, ensuring not to exceed a maximum if desired
    if (props.renderMode === 'on-demand') {
      render.frames.value = Math.min(render.maxFrames, render.frames.value + frames)
    }
  }

  function advance() {
    if (props.renderMode === 'manual') {
      render.frames.value = 1
    }
  }

  const ctx = {
    sizes,
    scene: localScene,
    camera,
    cameras: readonly(cameras),
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
    renderer: shallowRef(null as unknown as Renderer),
    events: null as unknown as Events,
    advance,
    extend,
    invalidate,
    registerCamera,
    setCameraActive,
    deregisterCamera,
    loop: createRenderLoop(),
    props,
    emit,
  }

  provide('useTres', ctx)

  const r = (await withRendererProps(ctx as TresContext, { canvas: toValue(canvas) }))
  ctx.renderer = r.renderer
  ctx.events = withEventsProps(ctx as TresContext).events

  // Add context to scene local state
  ctx.scene.value.__tres = {
    root: ctx,
  }

  // The loop
  ctx.loop.register(() => {
    if (camera.value && render.frames.value > 0) {
      ctx.renderer.value.render(scene, camera.value)
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
    ctx.loop.setReady(true)
    emit('ready', ctx)
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
