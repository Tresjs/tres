<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'

const props = defineProps<{
  points: Array<number> // Array of y-values
  value: number
  unit: string
  label: string
}>()

const width = 160
const height = 40
const strokeWidth = 2

// Determine the maximum value for scaling the graph
const maxValue = ref(140)

// Update maxValue to accommodate the range of y-values in points
watchEffect(() => {
  const highestValue = Math.max(...props.points, 30) // Ensure at least 30
  maxValue.value = Math.max(highestValue, maxValue.value)
})

const pointsF = computed(() => props.points.map(
  (point, index) =>
    `${index * strokeWidth},${height - (point * height / maxValue.value)}`,
).join(' '))  
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
        {{ Math.round(value) }} {{ unit }}
      </div>
      <svg
        :width="width"
        :height="height"
        xmlns="http://www.w3.org/2000/svg"
        class="tl-bg-gray-100"
      >
        <polyline
          :points="pointsF"
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