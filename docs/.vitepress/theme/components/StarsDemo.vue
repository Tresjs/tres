<script setup lang="ts">
import { OrbitControls, Stars } from '@tresjs/cientos'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { shallowRef } from 'vue'

const yRotation = shallowRef(0)
useRenderLoop().onLoop(({ delta }) => {
  yRotation.value += 0.02 * delta
})
</script>

<template>
  <TresCanvas clear-color="#333">
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Stars
      :rotation="[0, yRotation, 0]"
      :radius="50"
      :depth="50"
      :count="5000"
      :size="0.3"
      :size-attenuation="true"
    />
    <TresGridHelper :args="[4, 4]" />
    <OrbitControls />
  </TresCanvas>
</template>
