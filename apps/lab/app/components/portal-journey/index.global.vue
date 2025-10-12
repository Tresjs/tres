<script setup lang="ts">


const gl = {
  clearColor: '#202020',
  shadows: true,
  alpha: false,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[5, 5, 5]" :fov="45" :aspect="1" :near="0.1" :far="1000" />
    <OrbitControls />
    <TresFog :args="[gl.clearColor, 0.1, 75]" />
    <PortalJourneyThePortal />
    <PortalJourneyTheFireFlies />
    <TresAmbientLight :position="[10, 10, 10]" :intensity="1.5" color="#00ff00" />
    <TheScreenshot />
  </TresCanvas>
</template>
