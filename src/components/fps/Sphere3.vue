<script setup lang="ts">
import { useRenderLoop, TresInstance } from '@tresjs/core'
import { shallowRef, ShallowRef } from 'vue'

const sphere3: ShallowRef<TresInstance | null> = shallowRef(null)
const { onLoop } = useRenderLoop()

onLoop(({ delta, elapsed }) => {
  if (sphere3.value) {
    sphere3.value.position.y = Math.sin(elapsed)
  }
})
</script>
<template>
  <TresMesh ref="sphere3" :scale="1" cast-shadow :position="[4, 2, 0]">
    <TresSphereGeometry :args="[1]" />
    <TresMeshNormalMaterial />
  </TresMesh>
</template>
