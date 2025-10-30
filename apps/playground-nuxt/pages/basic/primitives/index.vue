<script setup lang="ts">

</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera />
    <TresMesh>
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
    <OrbitControls />
  </TresCanvas>
</template>
