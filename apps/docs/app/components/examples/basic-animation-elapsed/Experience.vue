<script setup lang="ts">
import { ref } from 'vue'
import { useLoop } from '@tresjs/core'
import type { Mesh } from 'three'

const cubeRef = ref<Mesh | null>(null)

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  const positionValue = Math.sin(elapsed) * 0.005

  if (cubeRef.value) {
    cubeRef.value.position.y += positionValue
  }
})
</script>

<template>
  <TresPerspectiveCamera :position="[0, 1, 5]" :look-at="[0, 1, 0]" />
  <TresMesh
    ref="cubeRef"
    :position="[0, 1, 0]"
  >
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshNormalMaterial />
  </TresMesh>
</template>
