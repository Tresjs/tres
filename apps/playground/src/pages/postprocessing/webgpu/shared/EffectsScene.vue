<script setup lang="ts">
const colors = ['#ff3366', '#33ddff', '#ffcc33', '#66ff99', '#cc66ff']
</script>

<template>
  <TresAmbientLight :intensity="0.4" />
  <TresDirectionalLight :position="[3, 4, 5]" :intensity="2" />

  <!-- Spread in depth, so depth of field has a near, a focused and a far object. -->
  <TresMesh
    v-for="(emissive, index) in colors"
    :key="emissive"
    :position="[(index % 2 ? 1 : -1) * 1.2, 0, 2 - index * 2.5]"
  >
    <TresTorusKnotGeometry :args="[0.6, 0.2, 128, 16]" />
    <TresMeshStandardNodeMaterial color="#222233" :emissive="emissive" :emissive-intensity="index + 1" />
  </TresMesh>

  <TresMesh :position-y="-1.4" :rotation-x="-Math.PI / 2">
    <TresPlaneGeometry :args="[16, 24, 32, 48]" />
    <TresMeshBasicNodeMaterial color="#8888aa" wireframe />
  </TresMesh>
</template>
