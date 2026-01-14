<script setup lang="ts">
// TODO: Implement experiment logic
const uuid = 'wobble-sphere-experiment'
useControls('fpsgraph', {
  uuid,
})
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas shadows>
    <TresPerspectiveCamera :position="[0, 0, 10]" :look-at="[0, 0, 0]" />
    <WobbleSphereTheWobbleSphere />
    <OrbitControls />
    <TheScreenshot />
  </TresCanvas>
</template>
