<script setup lang="ts">
const uuid = 'pixel-plasma-shader-experiment'

useControls('fpsgraph', { uuid })
provide('uuid', uuid)

const { canvasClearColor } = useControls('🎨 canvas', {
  clearColor: '#08060E',
}, { uuid })
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas :clear-color="canvasClearColor">
    <TresPerspectiveCamera :position="[0, 0, 10]" :look-at="[0, 0, 0]" />
    <PixelPlasmaShaderThePixelPlasmaShader />
    <TheScreenshot />
  </TresCanvas>
</template>
