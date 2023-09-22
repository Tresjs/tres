<script setup lang="ts">
import { CameraControls, Stars, StatsGl } from '@tresjs/cientos'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import type { Points } from 'three'
import { NoToneMapping, SRGBColorSpace } from 'three'
import { reactive, shallowRef } from 'vue'

const gl = {
  clearColor: '#000',
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
const options = reactive({
  size: 4,
  sizeAttenuation: true,
  count: 50000,
  depth: 50,
  radius: 1000,
})

const star = shallowRef()
const { onBeforeLoop } = useRenderLoop()

onBeforeLoop(() => {
  (star.value.value as Points).rotation.y += 0.003
})
</script>

<template>
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <StatsGl />
    <Stars
      ref="star"
      :radius="options.radius"
      :depth="options.depth"
      :count="options.count"
      :size="options.size"
      :size-attenuation="options.sizeAttenuation"
    />
    <CameraControls :distance="500" />
  </TresCanvas>
</template>
