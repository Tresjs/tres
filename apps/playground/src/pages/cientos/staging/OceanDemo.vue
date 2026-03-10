<script setup lang="ts">
import { Ocean, OrbitControls, Sky } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import { Pane } from 'tweakpane'
import { ref } from 'vue'

const gl = {
  clearColor: '#333',
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
  toneMappingExposure: 1,
}

const speed = ref(1)
const size = ref(1)
const distortionScale = ref(3.7)
const alpha = ref(1)

const waterColor = ref('#001e0f')
const sunColor = ref('#ffffff')

const pane = new Pane({})

pane
  .addBinding({ value: waterColor.value }, 'value', {
    label: 'waterColor',
    view: 'color',
  })
  .on('change', (ev) => (waterColor.value = ev.value))

pane
  .addBinding({ value: sunColor.value }, 'value', {
    label: 'sunColor',
    view: 'color',
  })
  .on('change', (ev) => (sunColor.value = ev.value))

pane
  .addBinding({ value: speed.value }, 'value', {
    label: 'speed',
    min: 0,
    max: 1,
    step: 0.01,
  })
  .on('change', (ev) => (speed.value = ev.value))

pane
  .addBinding({ value: size.value }, 'value', {
    label: 'size',
    min: 1,
    max: 50,
    step: 1,
  })
  .on('change', (ev) => (size.value = ev.value))

pane
  .addBinding({ value: distortionScale.value }, 'value', {
    label: 'distortionScale',
    min: 0,
    max: 100,
    step: 1,
  })
  .on('change', (ev) => (distortionScale.value = ev.value))

pane
  .addBinding({ value: alpha.value }, 'value', {
    label: 'alpha',
    min: 0,
    max: 1,
    step: 0.01,
  })
  .on('change', (ev) => (alpha.value = ev.value))
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0, 15]" />
    <TresDirectionalLight :position="[0, 0, 1]" />
    <Sky :azimuth="0" />
    <Suspense>
      <Ocean :speed :size :alpha :water-color="waterColor" :sun-color="sunColor" :distortion-scale="distortionScale">
        <TresCircleGeometry :args="[50, 16]" />
      </Ocean>
    </Suspense>
    <TresMesh :position-y="1">
      <TresBoxGeometry :args="[1, 1, 1]" />
    </TresMesh>
    <OrbitControls :enable-pan="false" :enable-zoom="false" :max-polar-angle="Math.PI * 0.495" :min-distance="40.0"
      :max-distance="200.0" />
  </TresCanvas>
</template>
