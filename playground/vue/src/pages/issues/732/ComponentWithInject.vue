<script setup lang="ts">
import { inject } from 'vue'

console.log(inject('test'))
</script>

<template>
  <TresMesh>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshNormalMaterial />
  </TresMesh>
</template>
