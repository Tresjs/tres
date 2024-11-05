<script setup lang="ts">

</script>

<template>
  <TresPerspectiveCamera
    :position="[-5.3, 8.3, 10.6]"
    :look-at="[0, 0, 0]"
  />
  <Suspense>
    <EnvironmentLocal />
  </Suspense>
  <TresMesh :position="[0, 2, 0]">
    <TresBoxGeometry />
    <TresMeshNormalMaterial />
  </TresMesh>
  <TresGridHelper />
  <OrbitControls />
</template>
