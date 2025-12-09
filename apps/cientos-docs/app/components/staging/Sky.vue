<script setup lang="ts">
import { OrbitControls, Sky } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'

const { turbidity, rayleigh, mieCoefficient, mieDirectionalG, elevation, azimuth, distance } = useControls({
  turbidity: { value: 3.4, min: 0, max: 20, step: 0.1 },
  rayleigh: { value: 3, min: 0, max: 4, step: 0.1 },
  mieCoefficient: { value: 0.005, min: 0, max: 0.1, step: 0.001 },
  mieDirectionalG: { value: 0.7, min: 0, max: 1, step: 0.01 },
  elevation: { value: 0.6, min: -Math.PI, max: Math.PI, step: 0.01 },
  azimuth: { value: 180, min: 0, max: 360, step: 1 },
  distance: { value: 450000, min: 100000, max: 1000000, step: 10000 },
})
</script>

<template>
  <div class="aspect-video">
    <TresCanvas :tone-mapping-exposure="0.25">
      <TresPerspectiveCamera :position="[0, 15, 200]" />
      <Sky
        :turbidity="turbidity"
        :rayleigh="rayleigh"
        :mie-coefficient="mieCoefficient"
        :mie-directional-g="mieDirectionalG"
        :elevation="elevation"
        :azimuth="azimuth"
        :distance="distance"
      />
      <OrbitControls />
      <TresGridHelper :args="[1000, 20]" />
    </TresCanvas>
  </div>
  <TresLeches :float="false" />
</template>
