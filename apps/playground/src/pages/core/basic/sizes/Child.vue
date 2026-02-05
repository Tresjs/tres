<script setup lang="ts">
import { useTres } from '@tresjs/core';

const { sizes } = useTres()
const state: SizesType = inject('state-sizes')

console.log(sizes)
watch(() => [sizes.width, sizes.height, sizes.aspectRatio, sizes.pixelRatio], ([width, height, aspectRatio, pixelRatio]) => {
  state.width = width
  state.height = height
  state.aspectRatio = aspectRatio
  state.pixelRatio = pixelRatio

}, { immediate: true })

</script>
<template>
  <TresMesh :position="[0, 2, 0]">
    <TresBoxGeometry />
    <TresMeshNormalMaterial />
  </TresMesh>
</template>