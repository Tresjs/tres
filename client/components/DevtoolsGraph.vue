<script setup lang="ts">
import { computed, ref, watchEffect } from '#imports'

const props = withDefaults(defineProps<{
  points?: Array<number> // Array of y-values
  value?: number
  unit?: string
  label?: string
  color?: 'green' | 'yellow'
}>(), {
  points: () => [],
  value: 0,
  unit: '',
  label: '',
  color: 'green',
})

const textColor = computed(() => { // ''
  return props.color === 'yellow' ? 'text-[#827717] dark:text-[#EAB306]' : 'text-[#15803D] dark:text-[#34E676]'
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
  >
    <div
      class="absolute bottom-0.5 right-1 font-mono text-xs"
      :class="textColor"
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
.graph {
  background-color: rgba(var(--nui-c-context), 0.1);
  color: rgba(var(--nui-c-context), 1);
}

.graph polyline.green {
  stroke: #15803d;
}
.graph polyline.yellow {
  stroke: #827717;
}
.dark .graph polyline.green {
  stroke: #34E676;
}
.dark .graph polyline.yellow {
  stroke: #EAB306;
}
</style>
