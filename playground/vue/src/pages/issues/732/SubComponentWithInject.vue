<script setup lang="ts">
import { inject } from 'vue'

const awiwi = inject('useTres')

console.log(awiwi)
</script>

<template>
  <TresMesh>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshNormalMaterial />
  </TresMesh>
</template>
