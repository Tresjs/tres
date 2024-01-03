<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'

const props = withDefaults(defineProps<{
  points: Array<number> // Array of y-values
  value: number
  unit: string
  label: string
  color: string
}>(),
{
  points: () => [],
  value: 0,
  unit: '',
  label: '',
  color: 'green',
})

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
  <div
    class="
      graph
      relative
      p-1
      rounded
      text-right
      text-xs 
      outline-none
      border-none
      font-sans
    "
  >
    <div class="absolute bottom-0.5 right-0.5 font-mono text-xs">
      {{ Math.round(value) }} {{ unit }}
    </div>
    <svg
      width="100%"
      :height="height"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline
        :points="pointsF"
        fill="none"
        :stroke="color"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<style>
.graph {
  background-color: rgba(var(--nui-c-context), 0.1);
  color: rgba(var(--nui-c-context), 1);
}

.graph polyline {
  stroke: rgba(var(--nui-c-context), 1);
}
</style>