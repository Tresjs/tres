<script setup lang="ts">
import { useTres } from '@tresjs/core'
import { watchEffect } from 'vue'

const { state } = useTres()

watchEffect(() => {
  console.log(state)
})
</script>
<template>
  <TresMesh :position="[2, 2, 0]" cast-shadow>
    <TresSphereGeometry />
    <TresMeshToonMaterial color="#FBB03B" />
  </TresMesh>
</template>
