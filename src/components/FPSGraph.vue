<script lang="ts" setup>
import { ref } from 'vue'
import { useFps, useRafFn } from '@vueuse/core'
import { Control } from '../types'

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

    frameTimes.value.push(fps.value)

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
  <div class="flex px-4 justify-between gap-4 items-center mb-2">
    <label class="text-gray-500 w-1/3">{{ label }}</label>

    <div
      class="relative w-2/3 p-1 rounded text-right text-xs text-gray-400 bg-gray-100 focus:border-gray-200 outline-none border-none font-sans"
    >
      <div class="absolute bottom-0.5 right-0.5 font-sans text-xs">{{ Math.round(fps) }} FPS</div>
      <svg :width="width" :height="height" xmlns="http://www.w3.org/2000/svg" class="bg-gray-100">
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
