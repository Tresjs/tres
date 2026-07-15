<script setup lang="ts">
import {
  MeshWobbleMaterial,
  OrbitControls,
  Refractor,
  Stars,
} from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import { Pane } from 'tweakpane'
import { ref, shallowRef, watch } from 'vue'

const gl = {
  clearColor: '#111',
  shadows: false,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const refractorRef = shallowRef()

watch(refractorRef, (value) => {
  // eslint-disable-next-line no-console
  console.log(value)
})

// Reactive — updates color prop directly without remounting
const color = ref('#9ec8d4')

// Non-reactive init props — changing these remounts the component via `key`
const clipBias = ref(0)
const textureSize = ref(1024)
const refractorKey = ref(0)

function reinitialize() {
  refractorKey.value++
}

const pane = new Pane({ title: 'Refractor' })

pane
  .addBinding({ value: color.value }, 'value', { label: 'color', view: 'color' })
  .on('change', ev => (color.value = ev.value))

pane
  .addBinding({ value: clipBias.value }, 'value', {
    label: 'clipBias',
    min: 0,
    max: 0.01,
    step: 0.0001,
  })
  .on('change', (ev) => {
    clipBias.value = ev.value
    reinitialize()
  })

pane
  .addBinding({ value: textureSize.value }, 'value', {
    label: 'textureSize',
    options: { 256: 256, 512: 512, 1024: 1024, 2048: 2048 },
  })
  .on('change', (ev) => {
    textureSize.value = ev.value
    reinitialize()
  })
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      :position="[0, 2, 8]"
      :look-at="[0, 0, 0]"
    />
    <Stars />
    <TresMesh :position="[-2, 0, -2]">
      <TresTorusKnotGeometry :args="[0.8, 0.3, 100, 16]" />
      <MeshWobbleMaterial
        color="hotpink"
        :speed="1.5"
        :factor="0.4"
      />
    </TresMesh>
    <TresMesh :position="[2, 0, -2]">
      <TresSphereGeometry :args="[1, 32, 32]" />
      <MeshWobbleMaterial
        color="orange"
        :speed="1"
        :factor="0.3"
      />
    </TresMesh>
    <Refractor
      :key="refractorKey"
      ref="refractorRef"
      :color="color"
      :clip-bias="clipBias"
      :texture-width="textureSize"
      :texture-height="textureSize"
    >
      <TresPlaneGeometry :args="[8, 5]" />
    </Refractor>
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight
      :position="[5, 5, 5]"
      :intensity="2"
    />
    <OrbitControls />
  </TresCanvas>
</template>
