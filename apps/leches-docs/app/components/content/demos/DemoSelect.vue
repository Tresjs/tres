<script setup lang="ts">
import { useControls } from '@tresjs/leches'

const { renderer } = useControls({
  renderer: {
    value: 'webgl',
    options: [
      { text: 'WebGL', value: 'webgl' },
      { text: 'WebGPU', value: 'webgpu' },
    ],
  },
}, { uuid: 'demo-select' })
</script>

<template>
  <DemoPanel uuid="demo-select">
    <p>renderer: {{ renderer }}</p>
  </DemoPanel>
</template>
