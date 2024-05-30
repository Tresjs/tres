<script lang="ts" setup>
import { ref } from 'vue'
import { useRafFn } from '@vueuse/core'
import { useState } from '../composables/state'

const width = 160
const height = 40
const strokeWidth = 2
const updateInterval = 100 // Update interval in milliseconds
const topOffset = 0 // Offset from the top

const points = ref('')
const frameTimes = ref([])
const maxFrames = ref(width / strokeWidth)

let lastUpdateTime = performance.now()

const { renderingTimes } = useState()

useRafFn(({ timestamp }) => {
  if (timestamp - lastUpdateTime >= updateInterval) {
    lastUpdateTime = timestamp

    frameTimes.value.push(renderingTimes?.value)
    renderingTimes.value = 0

    if (frameTimes.value.length > maxFrames.value) {
      frameTimes.value.shift()
    }

    points.value = frameTimes.value
      .map(
        (value, index) =>
          `${index * strokeWidth},${
            height + topOffset - strokeWidth / 2 - (value * (height + topOffset - strokeWidth)) / 2
          }`,
      )
      .join(' ')
  }
})
</script>

<template>
  <div
    class="absolute
      right-2
      top-2
      flex
      px-4
      py-1
      justify-between
      gap-4
      items-center
      mb-2
      z-10
      bg-white
      dark:bg-dark
      shadow-xl
      rounded
      border-4
      border-solid
      bg-primary
      border-primary
      pointer-events-none
      overflow-hidden"
  >
    <label class="text-secondary text-xs w-1/3">Rendering Activity</label>

    <div
      class="
        bg-gray-100
        dark:bg-gray-600
        relative
        w-2/3
        p-1
        rounded
        text-right
        text-xs
        focus:border-gray-200
        outline-none
        border-none
        font-sans
      "
    >
      <svg
        :width="width"
        :height="height"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <polyline
          :points="points"
          stroke="lightgray"
          :stroke-width="strokeWidth"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </div>
</template>
