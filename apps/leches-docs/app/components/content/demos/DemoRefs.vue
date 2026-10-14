<script setup lang="ts">
import { useControls } from '@tresjs/leches'
import { ref } from 'vue'

const intensity = ref(2)

useControls({
  intensity: {
    value: intensity,
    min: 0,
    max: 10,
    step: 0.1,
  },
}, { uuid: 'demo-refs' })
</script>

<template>
  <DemoPanel uuid="demo-refs">
    <p>intensity (same ref): {{ intensity }}</p>
  </DemoPanel>
</template>
