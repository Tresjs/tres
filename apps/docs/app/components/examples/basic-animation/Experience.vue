<script setup lang="ts">
import { ref } from 'vue'
import { useLoop } from '@tresjs/core'
import type { Mesh } from 'three'

const cubeRef = ref<Mesh | null>(null)

const { onBeforeRender } = useLoop()

onBeforeRender(({ delta }) => {
  if (cubeRef.value) {
    cubeRef.value.rotation.x += delta
    cubeRef.value.rotation.y += delta
  }
})
</script>

<template>
  <TresPerspectiveCamera :position="[0, 1, 5]" />
  <TresMesh ref="cubeRef" :position="[0, 1, 0]">
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshNormalMaterial />
  </TresMesh>
</template>
