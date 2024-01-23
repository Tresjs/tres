import { toValue, useElementSize, useFps, useMemory, useRafFn, useWindowSize, refDebounced } from '@vueuse/core'
import { inject, provide, readonly, shallowRef, computed, ref, onUnmounted, watchEffect } from 'vue'
import type { Camera, EventDispatcher, Scene, WebGLRenderer } from 'three'
import { Raycaster } from 'three'
import type { ComputedRef, DeepReadonly, MaybeRef, MaybeRefOrGetter, Ref, ShallowRef } from 'vue'
import { calculateMemoryUsage } from '../../utils/perf'
import { useCamera } from '../useCamera'
import type { UseRendererOptions } from '../useRenderer'
import { useRenderer } from '../useRenderer'
import { extend } from '../../core/catalogue'
import { useLogger } from '../useLogger'

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
  scene: ShallowRef<Scene>
  sizes: { height: Ref<number>; width: Ref<number>; aspectRatio: ComputedRef<number> }
  extend: (objects: any) => void
  camera: ComputedRef<Camera | undefined>
  cameras: DeepReadonly<Ref<Camera[]>>
  controls: Ref<(EventDispatcher & { enabled: boolean }) | null>
  renderer: ShallowRef<WebGLRenderer>
  raycaster: ShallowRef<Raycaster>
  perf: PerformanceState
  render: RenderState
  /**
   * Invalidates the current frame when renderMode === 'on-demand'
   */
  invalidate: () => void
  /**
     * Advance one frame when renderMode === 'manual'
     */
  advance: () => void
  registerCamera: (camera: Camera) => void
  setCameraActive: (cameraOrUuid: Camera | string) => void
  deregisterCamera: (camera: Camera) => void
}

export function useTresContextProvider({
  scene,
  canvas,
  windowSize,
  disableRender,
  rendererOptions,
  emit,
}: {
  scene: Scene
  canvas: MaybeRef<HTMLCanvasElement>
  windowSize: MaybeRefOrGetter<boolean>
  disableRender: MaybeRefOrGetter<boolean>
  rendererOptions: UseRendererOptions
  emit: (event: string, ...args: any[]) => void
}): TresContext {

  const { logWarning } = useLogger()

  const elementSize = computed(() =>
    toValue(windowSize)
      ? useWindowSize()
      : useElementSize(toValue(canvas).parentElement),
  )

  const reactiveSize = shallowRef({
    width: 0,
    height: 0,
  })
  const debouncedReactiveSize = refDebounced(reactiveSize, 10)
  const unWatchSize = watchEffect(() => {
    reactiveSize.value = {
      width: elementSize.value.width.value,
      height: elementSize.value.height.value,
    }
  })

  const aspectRatio = computed(() => debouncedReactiveSize.value.width / debouncedReactiveSize.value.height)

  const sizes = {
    height: computed(() => debouncedReactiveSize.value.height),
    width: computed(() => debouncedReactiveSize.value.width),
    aspectRatio,
  }
  const localScene = shallowRef<Scene>(scene)
  const {
    camera,
    cameras,
    registerCamera,
    deregisterCamera,
    setCameraActive,
  } = useCamera({ sizes, scene })

  // Render state

  const render: RenderState = {
    mode: ref<'always' | 'on-demand' | 'manual'>(rendererOptions.renderMode || 'always'),
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
    else {
      logWarning('`invalidate` can only be used when `renderMode` is set to `on-demand`')
    }
  }

  function advance() {
    if (rendererOptions.renderMode === 'manual') {
      render.frames.value = 1
    }
    else {
      logWarning('`advance` can only be used when `renderMode` is set to `manual`')
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
      disableRender,
    })

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
  }

  provide('useTres', ctx)

  // Add context to scene.userData
  ctx.scene.value.userData.tres__context = ctx

  // Performance
  const updateInterval = 100 // Update interval in milliseconds
  const fps = useFps({ every: updateInterval })
  const { isSupported, memory } = useMemory({ interval: updateInterval })
  const maxFrames = 160
  let lastUpdateTime = performance.now()

  const updatePerformanceData = ({ timestamp }: { timestamp: number }) => {

    // Update WebGL Memory Usage (Placeholder for actual logic)
    // perf.memory.value = calculateMemoryUsage(gl)
    if (ctx.scene.value) {
      ctx.perf.memory.allocatedMem = calculateMemoryUsage(ctx.scene.value as unknown as TresObject)
    }

    // Update memory usage
    if (timestamp - lastUpdateTime >= updateInterval) {
      lastUpdateTime = timestamp

      // Update FPS
      ctx.perf.fps.accumulator.push(fps.value as never)

      if (ctx.perf.fps.accumulator.length > maxFrames) {
        ctx.perf.fps.accumulator.shift()
      }

      ctx.perf.fps.value = fps.value

      // Update memory
      if (isSupported.value && memory.value) {
        ctx.perf.memory.accumulator.push(memory.value.usedJSHeapSize / 1024 / 1024 as never)

        if (ctx.perf.memory.accumulator.length > maxFrames) {
          ctx.perf.memory.accumulator.shift()
        }

        ctx.perf.memory.currentMem
        = ctx.perf.memory.accumulator.reduce((a, b) => a + b, 0) / ctx.perf.memory.accumulator.length

      }
    }
  }

  // Devtools
  let accumulatedTime = 0
  const interval = 1 // Interval in milliseconds, e.g., 1000 ms = 1 second

  const { pause } = useRafFn(({ delta }) => {
    if (!window.__TRES__DEVTOOLS__) return

    updatePerformanceData({ timestamp: performance.now() })

    // Accumulate the delta time
    accumulatedTime += delta

    // Check if the accumulated time is greater than or equal to the interval
    if (accumulatedTime >= interval) {
      window.__TRES__DEVTOOLS__.cb(ctx)

      // Reset the accumulated time
      accumulatedTime = 0
    }
  }, { immediate: true })

  onUnmounted(() => {
    unWatchSize()
    pause()
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
