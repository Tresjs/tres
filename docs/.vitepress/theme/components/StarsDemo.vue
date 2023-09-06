<script setup lang="ts">
import { shallowRef, reactive } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls, Stars, MouseParallax } from '@tresjs/cientos'
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

const star = shallowRef(null)

const { onLoop } = useRenderLoop()

onLoop(() => {
  if (star.value) {
    star.value.value.rotation.y += 0.001
  }
})
</script>

<template>
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <MouseParallax :factor="0.5" />
    <Stars
      ref="star"
      :radius="options.radius"
      :depth="options.depth"
      :count="options.count"
      :size="options.size"
      :size-attenuation="options.sizeAttenuation"
    />
    <TresGridHelper :args="[4, 4]" />
    <OrbitControls />
  </TresCanvas>
</template>
