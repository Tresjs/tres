import { useFps, useMemory, useRafFn } from '@vueuse/core'
import { calculateMemoryUsage } from '../utils/perf'
import type { TresContext } from '../composables'
import type { TresObject } from '../types'
import { onUnmounted } from 'vue'

export function setupDevtools(ctx: TresContext) {
  if (!ctx) { return }

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

  const { pause } = useRafFn(({ delta }) => {
    if (!window.__TRES__DEVTOOLS__) { return }

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
    pause()
  })
}
