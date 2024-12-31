<script setup lang="ts">
const { scene } = await useGLTF('/models/damaged-helmet/DamagedHelmet.glb', { draco: true })
</script>

<template>
  <primitive :object="scene" />
</template>
