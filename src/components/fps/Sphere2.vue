<script setup lang="ts">
import { useRenderLoop, TresInstance } from '@tresjs/core'
import { shallowRef, ShallowRef } from 'vue'

const sphere2: ShallowRef<TresInstance | null> = shallowRef(null)
const { onLoop } = useRenderLoop()

onLoop(({ delta, elapsed }) => {
  if (sphere2.value) {
    sphere2.value.position.y = Math.sin(elapsed)
  }
})
</script>
<template>
  <TresMesh ref="sphere2" :scale="1" cast-shadow :position="[0, 2, 0]">
    <TresSphereGeometry :args="[1]" />
    <TresMeshNormalMaterial />
  </TresMesh>
</template>
