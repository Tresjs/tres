<script setup lang="ts">
import { shallowRef } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Sky } from '@tresjs/cientos'
import { SRGBColorSpace, NoToneMapping } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#333',
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const [turbidity, rayleigh, mieCoefficient, mieDirectionalG, elevation, azimuth] = useControls({
  turbidity: { value: 3.4, min: 0, max: 20, step: 0.1 },
  rayleigh: { value: 3, min: 0, max: 4, step: 0.1 },
  mieCoefficient: { value: 0.005, min: 0, max: 0.1, step: 0.001 },
  mieDirectionalG: { value: 0.7, min: 0, max: 1, step: 0.1 },
  elevation: { value: 2, min: 0, max: 90, step: 0.1 },
  azimuth: { value: 180, min: 0, max: 360, step: 1 },
})

const skyRef = shallowRef(null)
</script>

<template>
  <TresLeches class="important-fixed important-left-2 important-w-90" />
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera :position="[0, 100, 2000]" />
    <Sky
      ref="skyRef"
      :elevation="elevation.value.value"
      :azimuth="azimuth.value.value"
      :mie-coefficient="mieCoefficient.value.value"
      :mie-directional-g="mieDirectionalG.value.value"
      :rayleigh="rayleigh.value.value"
      :turbidity="turbidity.value.value"
    />
    <TresGridHelper :args="[10, 10]" />
    <OrbitControls :zoom-speed="0" />
  </TresCanvas>
</template>
