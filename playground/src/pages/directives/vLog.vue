<script setup lang="ts">
import { reactive, shallowRef } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls, Stars, Sphere, vLog } from '@tresjs/cientos'
import { SRGBColorSpace, NoToneMapping } from 'three'

const gl = {
  clearColor: '#333',
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
const options = reactive({
  size: 0.1,
  sizeAttenuation: true,
  count: 5000,
  depth: 50,
  radius: 100,
})

const sphereRef = shallowRef()

const { onLoop } = useRenderLoop()

onLoop(({ elapsed }) => {
  if (sphereRef.value) {
    sphereRef.value.value.position.y = Math.sin(elapsed) * 0.5
  }
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Stars
      v-log
      :radius="options.radius"
      :depth="options.depth"
      :count="options.count"
      :size="options.size"
      :size-attenuation="options.sizeAttenuation"
    />
    <Sphere
      ref="sphereRef"
      v-log:material
      :scale="0.5"
    />
    <TresGridHelper :args="[10, 10]" />
    <OrbitControls />
  </TresCanvas>
</template>
