<script setup lang="ts">
import { useControls } from '@tresjs/leches'
import { computed } from 'vue'

const { stars } = useControls({
  stars: {
    value: 4,
    type: 'number',
    min: 0,
    max: 10,
    step: 1,
  },
}, { uuid: 'demo-number' })

const rating = computed(() => '⭐'.repeat(Math.min(10, Math.max(0, Math.floor(Number(stars.value)) || 0))))
</script>

<template>
  <DemoPanel uuid="demo-number">
    <p class="text-base">{{ rating || '☁️ no stars' }}</p>
  </DemoPanel>
</template>
