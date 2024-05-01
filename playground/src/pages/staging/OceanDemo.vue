<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Ocean, OrbitControls, Sky } from '@tresjs/cientos'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'

const gl = {
  clearColor: '#333',
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
  toneMappingExposure: 1,
}
</script>

<template>
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera :position="[0, 0, 15]" />
    <TresDirectionalLight :position="[0, 0, 1]" />
    <Sky :azimuth="0" />
    <Suspense>
      <Ocean>
        <TresCircleGeometry :args="[50, 16]" />
      </Ocean>
    </Suspense>
    <TresMesh :position-y="1">
      <TresBoxGeometry :args="[1, 1, 1]" />
    </TresMesh>
    <OrbitControls
      :enable-pan="false"
      :enable-zoom="false"
      :max-polar-angle="Math.PI * 0.495"
      :min-distance="40.0"
      :max-distance="200.0"
    />
  </TresCanvas>
</template>
