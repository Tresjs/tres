<script setup lang="ts">
import { ref } from 'vue'
import { useControls } from '@tresjs/leches'

const fov = ref(45)
const cameraEnabled = ref(true)

useControls({
  exposure: {
    value: 1,
    min: 0,
    max: 2,
    step: 0.1,
    label: 'Exposure',
  },
}, { uuid: 'demo-panel-actions' })

useControls('Camera', {
  fov: {
    value: fov,
    min: 10,
    max: 120,
    step: 1,
    label: 'Field of view',
  },
  enabled: {
    value: cameraEnabled,
    label: 'Enabled',
  },
  reset: {
    type: 'button',
    value: {
      label: 'Reset camera',
      onClick: () => {
        fov.value = 45
        cameraEnabled.value = true
      },
    },
  },
}, { uuid: 'demo-panel-actions' })
</script>

<template>
  <DemoPanel uuid="demo-panel-actions" />
</template>
