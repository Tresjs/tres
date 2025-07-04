<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRafFn } from '@vueuse/core'
import type { LechesGraphControl } from '../types'
import ControlLabel from './ControlLabel.vue'

const props = defineProps<{
  label: string
  control: LechesGraphControl
}>()

const containerRef = ref<HTMLElement | null>(null)
const width = ref(160)
const height = ref(40)
const strokeWidth = 2
const updateInterval = 100 // Update interval in milliseconds
const paddingVertical = 4 // Padding at top and bottom to prevent cutting off

const pathData = ref('') // SVG path data for the curve
const frameTimes = ref<number[]>([])
const maxPoints = ref(Math.floor(width.value / strokeWidth))

let lastUpdateTime = performance.now()
let resizeObserver: ResizeObserver | null = null

// Function to create a smooth curve path using catmull-rom spline
function createSmoothPath(points: { x: number, y: number }[]): string {
  if (points.length < 2) { return '' }

  // If we only have two points, draw a simple line
  if (points.length === 2) {
    return `M ${points[0].x},${points[0].y} L ${points[1].x},${points[1].y}`
  }

  // Start path with a move to the first point
  let path = `M ${points[0].x},${points[0].y}`

  // Use cubic bezier curves between points
  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i]
    const next = points[i + 1]

    // Calculate control points (using 1/3 distance for smoothness)
    const controlX1 = current.x + (next.x - current.x) / 3
    const controlY1 = current.y
    const controlX2 = next.x - (next.x - current.x) / 3
    const controlY2 = next.y

    // Add cubic bezier curve
    path += ` C ${controlX1},${controlY1} ${controlX2},${controlY2} ${next.x},${next.y}`
  }

  return path
}

// Update graph on animation frame
useRafFn(() => {
  const now = performance.now()
  if (now - lastUpdateTime >= updateInterval) {
    lastUpdateTime = now

    // Add current value to the array
    frameTimes.value.push(typeof props.control.value === 'number' ? props.control.value : 0)

    // Call onUpdate if it exists
    if (props.control.onUpdate) {
      props.control.onUpdate(frameTimes.value)
    }

    // Remove oldest frameTimes if we have too many
    if (frameTimes.value.length > maxPoints.value) {
      frameTimes.value = frameTimes.value.slice(-maxPoints.value)
    }

    // Generate path for the smooth curve
    if (frameTimes.value.length > 0) {
      // Find min and max values to determine range
      const minValue = Math.min(0, ...frameTimes.value)
      const maxValue = Math.max(0, ...frameTimes.value)
      const valueRange = Math.max(1, maxValue - minValue) // Ensure we don't divide by zero

      // Calculate the usable height (total height minus padding)
      const usableHeight = height.value - (paddingVertical * 2)

      // Create point objects for the curve
      const points = frameTimes.value.map((val: number, index: number) => {
        const x = index * strokeWidth

        // Normalize and scale value
        const normalizedValue = (val - minValue) / valueRange
        const y = paddingVertical + (usableHeight - normalizedValue * usableHeight)

        return { x, y }
      })

      // Generate smooth path data
      pathData.value = createSmoothPath(points)
    }
  }
})

onMounted(() => {
  if (containerRef.value) {
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width.value = entry.contentRect.width
        maxPoints.value = Math.floor(width.value / strokeWidth)

        // Trim frameTimes if needed after resize
        if (frameTimes.value.length > maxPoints.value) {
          frameTimes.value = frameTimes.value.slice(-maxPoints.value)
        }
      }
    })
    resizeObserver.observe(containerRef.value)
  }
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})
</script>

<template>
  <div class="tl-flex tl-px-4 tl-gap-1 tl-items-center tl-mb-2">
    <ControlLabel
      :label="label"
      :control="control"
    />
    <div
      ref="containerRef"
      class="
        tl-relative
        tl-w-2/3
        tl-py-1
        tl-rounded
        tl-text-right
        tl-text-xs
        tl-text-gray-400
        tl-bg-gray-100
        dark:tl-bg-dark-300
        dark:tl-text-gray-400
        tl-outline-none
        tl-border-none
        tl-font-sans
      "
    >
      <div class="tl-absolute tl-bg-gray-100 tl-p-0.5 rounded dark:tl-bg-dark-300 tl-bottom-0.5 tl-right-1 tl-font-sans tl-text-xs">
        {{ Math.round(control.value) }}
      </div>
      <svg
        :width="width"
        :height="height"
        xmlns="http://www.w3.org/2000/svg"
        class="tl-bg-gray-100 dark:tl-bg-dark-300"
      >
        <!-- Center line for zero -->
        <line
          v-if="Math.min(...frameTimes) < 0 && Math.max(...frameTimes) > 0"
          x1="0"
          :y1="height / 2"
          :x2="width"
          :y2="height / 2"
          stroke="rgba(128, 128, 128, 0.2)"
          stroke-width="1"
        />
        <!-- Smooth curve using path instead of polyline -->
        <path
          :d="pathData"
          fill="none"
          stroke="currentColor"
          :stroke-width="strokeWidth"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </div>
</template>
