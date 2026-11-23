<script setup lang="ts">
import { useControls } from '@tresjs/leches'

const { speed } = useControls({
  speed: {
    value: 1,
    min: 0,
    max: 5,
    step: 0.1,
    label: 'Animation speed',
  },
}, { uuid: 'demo-range' })
</script>

<template>
  <DemoPanel uuid="demo-range">
    <p>speed: {{ speed }}</p>
  </DemoPanel>
</template>
