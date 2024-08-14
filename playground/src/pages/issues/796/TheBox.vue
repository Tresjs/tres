<!-- eslint-disable no-console -->
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

console.log('BOX--INIT:', Date.now())

onMounted(() => {
  console.log('BOX--MOUNTED', Date.now())
})

onUnmounted(() => {
  console.log('BOX--UNMOUNTED', Date.now())
})
</script>

<template>
  <TresMesh>
    <TresBoxGeometry />
    <TresMeshNormalMaterial />
  </TresMesh>
</template>
