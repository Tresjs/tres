<script setup lang="ts">
import { useControls } from '@tresjs/leches'
import { ref } from 'vue'

const clicks = ref(0)

useControls({
  reset: {
    type: 'button',
    value: {
      label: 'Reset scene',
      variant: 'primary',
      size: 'md',
      onClick: () => {
        clicks.value++
      },
    },
  },
}, { uuid: 'demo-button' })
</script>

<template>
  <DemoPanel uuid="demo-button">
    <p>onClick called: {{ clicks }} {{ clicks === 1 ? 'time' : 'times' }}</p>
  </DemoPanel>
</template>
