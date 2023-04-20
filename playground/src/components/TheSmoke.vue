<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Smoke } from '@cientos'
import { sRGBEncoding, NoToneMapping } from 'three'

const gl = {
  clearColor: '#333',
  alpha: true,
  outputEncoding: sRGBEncoding,
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
        <TresMesh ref="boxRef">
            <TresBoxGeometry :args="[1, 1, 1]" />
            <TresMeshToonMaterial color="teal" />
        </TresMesh>
        <TresGridHelper :args="[10, 10]" />
        <TresAmbientLight :intensity="1" />
        <TresDirectionalLight :intensity="1" :position="[2, 2, 2]" />
        <OrbitControls />
      </TresCanvas>
</template>
