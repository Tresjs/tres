<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Sky } from '@tresjs/cientos'
import { SRGBColorSpace, ACESFilmicToneMapping } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#333',
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
  toneMappingExposure: 1,
}

const [turbidity, rayleigh, mieCoefficient, mieDirectionalG, elevation, azimuth, distance, exposure] = useControls({
  turbidity: { value: 3.4, min: 0, max: 20, step: 0.1 },
  rayleigh: { value: 3, min: 0, max: 4, step: 0.1 },
  mieCoefficient: { value: 0.005, min: 0, max: 0.1, step: 0.001 },
  mieDirectionalG: { value: 0.7, min: 0, max: 0.99, step: 0.01 },
  elevation: { value: 2, min: 0, max: 90, step: 0.1 },
  azimuth: { value: 180, min: 0, max: 360, step: 1 },
  distance: { value: 450000, min: 1000, max: 1000000, step: 1000 },
  exposure: { value: 0.5, min: 0, max: 1, step: 0.01 },
})
</script>

<template>
  <TresLeches class="important-fixed important-left-2 important-w-90" />
  <TresCanvas
    v-bind="gl"
    :tone-mapping-exposure="exposure.value.value"
  >
    <TresPerspectiveCamera :position="[0, 100, 2000]" />
    <Sky
      :elevation="elevation.value.value"
      :azimuth="azimuth.value.value"
      :mie-coefficient="mieCoefficient.value.value"
      :mie-directional-g="mieDirectionalG.value.value"
      :rayleigh="rayleigh.value.value"
      :turbidity="turbidity.value.value"
      :distance="distance.value.value"
    />
    <OrbitControls 
      :enable-pan="false"
      :enable-zoom="false"
    />
  </TresCanvas>
</template>
