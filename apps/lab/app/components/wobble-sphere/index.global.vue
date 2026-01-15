<script setup lang="ts">
// TODO: Implement experiment logic
const uuid = 'wobble-sphere-experiment'
useControls('fpsgraph', {
  uuid,
})
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :position="[13, -3, -5]" :look-at="[0, 0, 0]" />
    <WobbleSphereTheWobbleSphere />
    <OrbitControls />
    <TheScreenshot />
  </TresCanvas>
</template>
