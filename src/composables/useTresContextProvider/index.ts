import { useFps, useMemory, useRafFn } from '@vueuse/core'
import { inject, onUnmounted, provide, readonly, ref, shallowRef } from 'vue'
import type { Camera, EventDispatcher, Scene, WebGLRenderer } from 'three'
import { Raycaster } from 'three'
import type { ComputedRef, DeepReadonly, MaybeRef, MaybeRefOrGetter, Ref, ShallowRef } from 'vue'
import { calculateMemoryUsage } from '../../utils/perf'
import { useCamera } from '../useCamera'
import type { UseRendererOptions } from '../useRenderer'
import { useRenderer } from '../useRenderer'
import { extend } from '../../core/catalogue'
import useSizes, { type SizesType } from '../useSizes'

export interface TresContext {
  scene: ShallowRef<Scene>
  sizes: SizesType
  extend: (objects: any) => void
  camera: ComputedRef<Camera | undefined>
  cameras: DeepReadonly<Ref<Camera[]>>
  controls: Ref<(EventDispatcher & { enabled: boolean }) | null>
  renderer: ShallowRef<WebGLRenderer>
  raycaster: ShallowRef<Raycaster>
  perf: {
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
}: {
  scene: Scene
  canvas: MaybeRef<HTMLCanvasElement>
  windowSize: MaybeRefOrGetter<boolean>
  disableRender: MaybeRefOrGetter<boolean>
  rendererOptions: UseRendererOptions
}): TresContext {
  const sizes = useSizes(windowSize, canvas)

  const localScene = shallowRef<Scene>(scene)
  const {
    camera,
    cameras,
    registerCamera,
    deregisterCamera,
    setCameraActive,
  } = useCamera({ sizes, scene })

  const { renderer } = useRenderer(
    {
      scene,
      canvas,
      options: rendererOptions,
      contextParts: { sizes, camera },
      disableRender,
    },
  )

  const toProvide: TresContext = {
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
  }

  provide('useTres', toProvide)

  // Performance
  const updateInterval = 100 // Update interval in milliseconds
  const fps = useFps({ every: updateInterval })
  const { isSupported, memory } = useMemory({ interval: updateInterval })
  const maxFrames = 160
  let lastUpdateTime = performance.now()

  const updatePerformanceData = ({ timestamp }: { timestamp: number }) => {
    // Update WebGL Memory Usage (Placeholder for actual logic)
    // perf.memory.value = calculateMemoryUsage(gl)
    if (toProvide.scene.value) {
      toProvide.perf.memory.allocatedMem = calculateMemoryUsage(toProvide.scene.value as unknown as TresObject)
    }

    // Update memory usage
    if (timestamp - lastUpdateTime >= updateInterval) {
      lastUpdateTime = timestamp

      // Update FPS
      toProvide.perf.fps.accumulator.push(fps.value as never)

      if (toProvide.perf.fps.accumulator.length > maxFrames) {
        toProvide.perf.fps.accumulator.shift()
      }

      toProvide.perf.fps.value = fps.value

      // Update memory
      if (isSupported.value && memory.value) {
        toProvide.perf.memory.accumulator.push(memory.value.usedJSHeapSize / 1024 / 1024 as never)

        if (toProvide.perf.memory.accumulator.length > maxFrames) {
          toProvide.perf.memory.accumulator.shift()
        }

        toProvide.perf.memory.currentMem
        = toProvide.perf.memory.accumulator.reduce((a, b) => a + b, 0) / toProvide.perf.memory.accumulator.length
      }
    }
  }

  // Devtools
  let accumulatedTime = 0
  const interval = 1 // Interval in milliseconds, e.g., 1000 ms = 1 second

  const { pause } = useRafFn(({ delta }) => {
    if (!window.__TRES__DEVTOOLS__) { return }

    updatePerformanceData({ timestamp: performance.now() })

    // Accumulate the delta time
    accumulatedTime += delta

    // Check if the accumulated time is greater than or equal to the interval
    if (accumulatedTime >= interval) {
      window.__TRES__DEVTOOLS__.cb(toProvide)

      // Reset the accumulated time
      accumulatedTime = 0
    }
  }, { immediate: true })

  onUnmounted(() => {
    pause()
  })

  return toProvide
}

export function useTresContext(): TresContext {
  const context = inject<Partial<TresContext>>('useTres')

  if (!context) {
    throw new Error('useTresContext must be used together with useTresContextProvider')
  }

  return context as TresContext
}

export const useTres = useTresContext
