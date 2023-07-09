<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Smoke, Box } from '@tresjs/cientos'
import { SRGBColorSpace, NoToneMapping } from 'three'
const gl = {
  clearColor: '#333',
  alpha: true,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
</script>

<template>
  <TresCanvas v-bind="gl" ref="canvas">
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Suspense>
      <Smoke :position="[-4, -2, 0]" :segments="8" />
    </Suspense>
    <Suspense>
      <Smoke :position="[-4, 2, 0]" :segments="8" />
    </Suspense>
    <Suspense>
      <Smoke :segments="8" />
    </Suspense>
    <Suspense>
      <Smoke :position="[4, -2, 0]" :segments="8" />
    </Suspense>
    <Suspense>
      <Smoke :position="[4, 2, 0]" :segments="8" />
    </Suspense>
    <Box :args="[2, 2]">
      <TresMeshToonMaterial color="#82DBC5" />
    </Box>
    <TresGridHelper :args="[10, 10]" />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :intensity="1" :position="[2, 2, 2]" />
    <OrbitControls />
  </TresCanvas>
</template>
