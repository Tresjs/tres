<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'
// TODO: Implement experiment logic
const uuid = 'wobble-sphere-experiment'
/* useControls('fpsgraph', {
  uuid,
}) */
</script>

<template>
  <ClientOnly>
    <TresLeches/>
  </ClientOnly>
  <TresCanvas shadows>
    <TresPerspectiveCamera :position="[0, 0, 10]" :look-at="[0, 0, 0]" />
    <WobbleSphereTheWobbleSphere />
    <OrbitControls />
    <TheScreenshot />
  </TresCanvas>
</template>
