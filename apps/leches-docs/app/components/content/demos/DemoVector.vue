<script setup lang="ts">
import { useControls } from '@tresjs/leches'
import { computed } from 'vue'

const DOMAIN = 2
const SIZE = 160

const { point } = useControls({
  point: {
    value: [1, 1],
    min: -DOMAIN,
    max: DOMAIN,
    step: 0.1,
  },
}, { uuid: 'demo-vector' })

const coords = computed(() => {
  const [x = 0, y = 0] = (Array.isArray(point.value) ? point.value : []).map(Number)
  return { x, y }
})

const PAD = 8
const toPx = (v: number) => PAD + ((Math.min(DOMAIN, Math.max(-DOMAIN, v)) + DOMAIN) / (DOMAIN * 2)) * (SIZE - PAD * 2)

const cx = computed(() => toPx(coords.value.x))
const cy = computed(() => SIZE - toPx(coords.value.y))
const labelX = computed(() => (cx.value > SIZE - 56 ? cx.value - 10 : cx.value + 10))
const labelY = computed(() => (cy.value < 16 ? cy.value + 18 : cy.value - 10))
</script>

<template>
  <DemoPanel uuid="demo-vector">
    <svg
      :viewBox="`0 0 ${SIZE} ${SIZE}`"
      class="h-40 w-40 rounded-md border border-default bg-default"
      role="img"
      aria-label="Point plotted at the controlled x and y coordinates"
    >
      <g stroke="currentColor" opacity="0.15">
        <line v-for="i in [-1, 1]" :key="`v${i}`" :x1="toPx(i)" y1="0" :x2="toPx(i)" :y2="SIZE" />
        <line v-for="i in [-1, 1]" :key="`h${i}`" x1="0" :y1="toPx(i)" :x2="SIZE" :y2="toPx(i)" />
      </g>
      <g stroke="currentColor" opacity="0.4">
        <line :x1="toPx(0)" y1="0" :x2="toPx(0)" :y2="SIZE" />
        <line x1="0" :y1="toPx(0)" :x2="SIZE" :y2="toPx(0)" />
      </g>
      <circle :cx="cx" :cy="cy" r="5" style="fill: var(--ui-primary)" />
      <text
        :x="labelX"
        :y="labelY"
        :text-anchor="cx > SIZE - 56 ? 'end' : 'start'"
        fill="currentColor"
        font-size="10"
      >({{ coords.x.toFixed(1) }}, {{ coords.y.toFixed(1) }})</text>
    </svg>
  </DemoPanel>
</template>
