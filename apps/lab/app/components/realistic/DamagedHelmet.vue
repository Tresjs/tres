<script setup lang="ts">
const { state } = await useGLTF('/models/damaged-helmet/DamagedHelmet.glb', { draco: true })
</script>

<template>
  <primitive v-if="state" :object="state.scene" />
</template>
