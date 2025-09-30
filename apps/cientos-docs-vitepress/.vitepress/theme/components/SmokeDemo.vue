<script setup lang="ts">
import { Box, OrbitControls, Smoke } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping, SRGBColorSpace } from 'three'

const gl = {
  clearColor: '#333',
  alpha: true,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
</script>

<template>
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Suspense>
      <Smoke
        :segments="4"
        :width="1"
        :position="[-4, -2, 0]"
      />
    </Suspense>
    <Suspense>
      <Smoke
        :segments="4"
        :width="1"
        :position="[-4, 2, 0]"
      />
    </Suspense>
    <Suspense>
      <Smoke
        :segments="4"
        :width="1"
      />
    </Suspense>
    <Suspense>
      <Smoke
        :segments="4"
        :width="1"
        :position="[4, -2, 0]"
      />
    </Suspense>
    <Suspense>
      <Smoke
        :segments="4"
        :width="1"
        :position="[4, 2, 0]"
      />
    </Suspense>
    <Box :args="[2, 2]">
      <TresMeshToonMaterial color="#82DBC5" />
    </Box>
    <TresGridHelper :args="[10, 10]" />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight
      :intensity="1"
      :position="[2, 2, 2]"
    />
    <OrbitControls />
  </TresCanvas>
</template>
