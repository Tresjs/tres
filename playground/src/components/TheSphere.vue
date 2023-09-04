<script setup lang="ts"></script>

<template>
  <TresMesh
    :position="[2, 2, 0]"
    cast-shadow
  >
    <TresSphereGeometry />
    <TresMeshToonMaterial color="#FBB03B" />
  </TresMesh>
</template>
