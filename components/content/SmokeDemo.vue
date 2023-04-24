<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Smoke, PamCameraMouse } from '@tresjs/cientos'
import { BasicShadowMap, sRGBEncoding, NoToneMapping } from 'three'
console.log('jaime ~ Smoke:', Smoke)

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[5, 5, 5]" />
    <PamCameraMouse />
    <Suspense>
      <Smoke />
    </Suspense>
  </TresCanvas>
</template>
