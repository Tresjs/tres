<script setup lang="ts">
import { useControls } from '@tresjs/leches'

const { CameraFov, CameraNear, CameraFar } = useControls('Camera', {
  fov: { value: 45, min: 10, max: 120, step: 1 },
  near: { value: 0.1, min: 0.01, max: 10, step: 0.01 },
  far: { value: 1000, min: 10, max: 5000, step: 10 },
}, { uuid: 'demo-folders' })
</script>

<template>
  <DemoPanel uuid="demo-folders">
    <p>CameraFov: {{ CameraFov }}</p>
    <p>CameraNear: {{ CameraNear }}</p>
    <p>CameraFar: {{ CameraFar }}</p>
  </DemoPanel>
</template>
