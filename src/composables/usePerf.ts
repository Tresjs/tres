import type { Ref, ShallowReactive } from 'vue'
import { provide, reactive, ref, onUnmounted, unref } from 'vue'
import { useFps, useMemory, useRafFn } from '@vueuse/core'
import { useTresContext } from '@tresjs/core'
import type { WebGLRenderer } from 'three'
import { calculateMemoryUsage } from '../utils'

interface MemoryUsageData {
  currentMem: number
  averageMem: number
  maxMemory: number
  accumulator: number[]
  lastLoggedTime: number
  logInterval: number
}

interface FpsData {
  value: number
  accumulator: number[]
  lastLoggedTime: number
  logInterval: number
}

// Define the structure of the performance data
interface PerfData {
  fps: FpsData
  memory: MemoryUsageData // Adjust 'any' to a more specific type as needed
  gl: WebGLRenderer | undefined
}

// Define the structure of the store
interface PerfStore {
  [uuid: string]: { perf: PerfData }
}

export const PERF_CONTEXT_KEY = Symbol('PERF_CONTEXT_KEY')
const DEFAULT_UUID = 'default'

// Internal state
const perfStore = reactive<PerfStore>({
  [DEFAULT_UUID]: {
    perf: {
      fps: reactive({
        value: 0,
        accumulator: [],
        lastLoggedTime: Date.now(),
        logInterval: 1000,
      }),
      memory: reactive({
        currentMem: 0,
        averageMem: 0,
        maxMemory: 0,
        allocatedMem: 0,
        accumulator: [],
        lastLoggedTime: Date.now(),
        logInterval: 1000,
      }), // Placeholder for memory object
      gl: undefined,
      scene: undefined,
    },
  },
})

export function usePerfProvider(uuid: string = DEFAULT_UUID) {
  provide(PERF_CONTEXT_KEY, perfStore)
  return perfStore[uuid].perf
}

export interface TresPerfOptions {
  renderer?: Ref<WebGLRenderer>
}

export function usePerf(options?: TresPerfOptions) {
  const { renderer: TresRenderer, scene } = useTresContext()
  const gl = options?.renderer || TresRenderer.value
  if (!gl) {
    throw new Error('Renderer not found')
  }

  const perf = perfStore[DEFAULT_UUID].perf
  perf.gl = gl
  perf.scene = scene

  const updateInterval = 100 // Update interval in milliseconds
  const fps = useFps({ every: updateInterval }) 
  const { isSupported, memory } = useMemory({ interval: updateInterval })

  const maxFrames = 80

  let lastUpdateTime = performance.now()

  const updatePerformanceData = ({ timestamp }) => {

    // Update WebGL Memory Usage (Placeholder for actual logic)
    // perf.memory.value = calculateMemoryUsage(gl)
    perf.memory.allocatedMem = calculateMemoryUsage(unref(scene))
  
    // Update memory usage
    if (timestamp - lastUpdateTime >= updateInterval) {
      lastUpdateTime = timestamp

      // Update FPS
      perf.fps.accumulator.push(fps.value as never)

      if (perf.fps.accumulator.length > maxFrames) {
        perf.fps.accumulator.shift()
      }

      perf.fps.value = perf.fps.accumulator.reduce((a, b) => a + b, 0) / perf.fps.accumulator.length

      // Update memory
      if (isSupported.value) {
        perf.memory.accumulator.push(memory.value.usedJSHeapSize / 1024 / 1024 as never)

        if (perf.memory.accumulator.length > maxFrames) {
          perf.memory.accumulator.shift()
        }

        perf.memory.currentMem = perf.memory.accumulator.reduce((a, b) => a + b, 0) / perf.memory.accumulator.length
        
      }
    }
  }

  const { pause, resume } = useRafFn(updatePerformanceData, { immediate: true })

  onUnmounted(() => {
    pause()
  })

  return {
    perf,
    fps: perf.fps,
    memory: perf.memory,
    gl: perf.gl,
    pausePerfTracking: pause,
    resumePerfTracking: resume,
  }
}