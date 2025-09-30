<script setup lang="ts">
import { computed, ref, watchEffect } from '#imports'

const props = withDefaults(defineProps<{
  points?: Array<number> // Array of y-values
  value?: number
  unit?: string
  label?: string
  color?: 'primary' | 'warning' | 'error'
}>(), {
  points: () => [],
  value: 0,
  unit: '',
  label: '',
  color: 'primary',
})

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
    :class="`graph-${color}`"
  >
    <div
      class="absolute bottom-0.5 right-1 font-mono text-xs"
      :class="`text-${color}`"
    >
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
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        stroke-linejoin="round"
        :class="color"
      />
    </svg>
  </div>
</template>

<style>
.graph-primary {
  background-color: color-mix(in oklab, var(--ui-primary) 10%, transparent);
  color: var(--ui-primary);
}
.graph-warning {
  background-color: color-mix(in oklab, var(--ui-warning) 10%, transparent);
  color: var(--ui-warning);
}
.graph polyline.primary {
  stroke: var(--ui-primary);
}
.graph polyline.warning {
  stroke: var(--ui-warning);
}
.dark .graph polyline.primary {
  stroke: var(--ui-primary);
}
.dark .graph polyline.warning {
  stroke: var(--ui-warning);
}
</style>
