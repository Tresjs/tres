<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useDark, useFps, useRafFn } from '@vueuse/core'
import type { LechesControl } from '../types'
import ControlLabel from './ControlLabel.vue'

defineProps<{
  label: string
  control: LechesControl
}>()

const containerRef = ref<HTMLElement | null>(null)
const width = ref(160)
const height = ref(40)
const strokeWidth = 2
const updateInterval = 100 // Update interval in milliseconds
const topOffset = 20 // Offset from the top
const fps = useFps({ every: updateInterval })

const points = ref('')
const frameTimes = ref([])
const maxFrames = ref(width.value / strokeWidth)

let lastUpdateTime = performance.now()
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  if (containerRef.value) {
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width.value = entry.contentRect.width
        maxFrames.value = Math.floor(width.value / strokeWidth)
        // Trim frame times if needed after resize
        if (frameTimes.value.length > maxFrames.value) {
          frameTimes.value = frameTimes.value.slice(-maxFrames.value)
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

useRafFn(({ timestamp }) => {
  if (timestamp - lastUpdateTime >= updateInterval) {
    lastUpdateTime = timestamp

    frameTimes.value.push(fps.value as never)

    if (frameTimes.value.length > maxFrames.value) {
      frameTimes.value.shift()
    }

    points.value = frameTimes.value
      .map(
        (fps, index) =>
          `${index * strokeWidth},${
            height.value + topOffset - strokeWidth / 2 - (fps * (height.value + topOffset - strokeWidth)) / 120
          }`,
      )
      .join(' ')
  }
})

const isDark = useDark()
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
      <div class="tl-absolute tl-bottom-0.5 tl-right-0.5 tl-font-sans tl-text-xs">
        {{ Math.round(fps) }} FPS
      </div>
      <svg
        :width="width"
        :height="height"
        xmlns="http://www.w3.org/2000/svg"
        class="tl-bg-gray-100 dark:tl-bg-dark-300"
      >
        <polyline
          :points="points"
          fill="none"
          :stroke="isDark ? 'darkgray' : 'lightgray'"
          :stroke-width="strokeWidth"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </div>
</template>
