import { useFps, useMemory, useRafFn } from '@vueuse/core'
import { boundedPush, calculateMemoryUsage } from '../utils/perf'
import type { TresContext } from '../composables'
import type { TresObject } from '../types'
import { onUnmounted } from 'vue'
import { DevtoolsMessenger } from './DevtoolsMessenger'

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

export function setupTresDevtools(ctx: TresContext) {
  if (!ctx) { return }

  // Initialize devtools messenger
  if (typeof window !== 'undefined' && !window.__TRES__DEVTOOLS__) {
    window.__TRES__DEVTOOLS__ = new DevtoolsMessenger()
  }

  const performanceState: PerformanceState = {
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
  }

  // Performance
  const updateInterval = 100 // Update interval in milliseconds
  const fps = useFps({ every: updateInterval })
  const { isSupported, memory } = useMemory({ interval: updateInterval })
  const maxFrames = 160
  let lastUpdateTime = performance.now()

  // Devtools
  let accumulatedTime = 0
  const interval = 1 // Interval in milliseconds, e.g., 1000 ms = 1 second

  const updatePerformanceData = ({ timestamp }: { timestamp: number }) => {
    // Update WebGL Memory Usage (Placeholder for actual logic)
    // perf.memory.value = calculateMemoryUsage(gl)
    if (ctx.scene.value) {
      performanceState.memory.allocatedMem = calculateMemoryUsage(ctx.scene.value as unknown as TresObject)
    }

    // Update memory usage
    if (timestamp - lastUpdateTime >= updateInterval) {
      lastUpdateTime = timestamp

      // Update FPS
      boundedPush(performanceState.fps.accumulator, fps.value as never, maxFrames)

      performanceState.fps.value = fps.value

      // Update memory
      if (isSupported.value && memory.value?.usedJSHeapSize) {
        boundedPush(performanceState.memory.accumulator, memory.value.usedJSHeapSize / 1024 / 1024 as never, maxFrames)

        if (performanceState.memory.accumulator.length > 0) {
          performanceState.memory.currentMem
        = performanceState.memory.accumulator.reduce((a, b) => a + b, 0) / performanceState.memory.accumulator.length
        }
      }
    }
  }

  const { pause } = useRafFn(({ delta }) => {
    if (!window.__TRES__DEVTOOLS__) { return }

    updatePerformanceData({ timestamp: performance.now() })

    // Accumulate the delta time
    accumulatedTime += delta

    // Check if the accumulated time is greater than or equal to the interval
    if (accumulatedTime >= interval) {
      window.__TRES__DEVTOOLS__.send('context', ctx)
      window.__TRES__DEVTOOLS__.send('performance', performanceState)

      // Reset the accumulated time
      accumulatedTime = 0
    }
  }, { immediate: true })

  onUnmounted(() => {
    pause()
  })
}
