<script setup lang="ts">
// TODO: Implement experiment logic
const uuid = 'pixel-noise-shaders-sandbox-experiment'

useControls('fpsgraph', {
  uuid,
})

provide('uuid', uuid)

const { canvasClearColor } = useControls('🎨 canvas', {
  clearColor: '#0e1c2f',
}, {
  uuid,
})
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas :clear-color="canvasClearColor">
    <TresPerspectiveCamera :position="[0, 0, 10]" :look-at="[0, 0, 0]" />
    <PixelNoiseShadersSandboxThePixelNoiseShadersSandbox />
    <TheScreenshot />
  </TresCanvas>
</template>
