<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls, Sparkles, Sphere, Torus } from '@tresjs/cientos'
import { shallowRef } from 'vue'

const lightRef = shallowRef()

useRenderLoop().onLoop(({ elapsed }) => {
  if (lightRef.value) {
    lightRef.value.position.x = Math.cos(elapsed) * 2.5
    lightRef.value.position.y = Math.sin(elapsed) * 2.5
  }
})
</script>

<template>
  <TresCanvas clear-color="#333">
    <TresPerspectiveCamera :position="[0, 0, 8]" />
    <TresDirectionalLight ref="lightRef">
      <Sphere
        color="white"
        :scale="0.1"
      />
    </TresDirectionalLight>
    <Torus :args="[1, 0.25, 16, 48]">
      <TresMeshBasicMaterial color="#222" />
      <Sparkles :directional-light="lightRef" />
    </Torus>
    <OrbitControls />
  </TresCanvas>
</template>
