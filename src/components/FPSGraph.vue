<script lang="ts" setup>
import { ref } from 'vue'
import { useFps, useRafFn } from '@vueuse/core'
import type { Control } from '../types'

defineProps<{
  label: string
  control: Control
}>()
const width = 160
const height = 40
const strokeWidth = 2
const updateInterval = 100 // Update interval in milliseconds
const topOffset = 20 // Offset from the top
const fps = useFps({ every: updateInterval })

const points = ref('')
const frameTimes = ref([])
const maxFrames = ref(width / strokeWidth)

let lastUpdateTime = performance.now()

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
            height + topOffset - strokeWidth / 2 - (fps * (height + topOffset - strokeWidth)) / 120
          }`,
      )
      .join(' ')
  }
})
</script>

<template>
  <div class="tl-flex tl-px-4 tl-justify-between tl-gap-4 tl-items-center tl-mb-2">
    <label class="tl-text-gray-500 tl-w-1/3">{{ label }}</label>

    <div
      class="
        tl-relative
        tl-w-2/3
        tl-p-1
        tl-rounded
        tl-text-right
        tl-text-xs
        tl-text-gray-400
        tl-bg-gray-100
        tl-focus:border-gray-200
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
        class="tl-bg-gray-100"
      >
        <polyline
          :points="points"
          fill="none"
          stroke="lightgray"
          :stroke-width="strokeWidth"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </div>
</template>
