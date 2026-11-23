<script setup lang="ts">
import {
  MeshWobbleMaterial,
  OrbitControls,
  Reflector,
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

const reflectorRef = shallowRef()

watch(reflectorRef, (value) => {
  // eslint-disable-next-line no-console
  console.log(value)
})

// Reactive — updates color prop directly without remounting
const color = ref('#f7f7f7')

// Non-reactive init props — changing these remounts the component via `key`
const clipBias = ref(0)
const textureSize = ref(1024)
const reflectorKey = ref(0)

function reinitialize() {
  reflectorKey.value++
}

const pane = new Pane({ title: 'Reflector' })

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
      :position="[3, 3, 6]"
      :look-at="[0, 0, 0]"
    />
    <Stars />
    <TresMesh>
      <TresTorusGeometry />
      <MeshWobbleMaterial
        color="orange"
        :speed="1"
        :factor="2"
      />
    </TresMesh>
    <Reflector
      :key="reflectorKey"
      ref="reflectorRef"
      :rotation="[-Math.PI * 0.5, 0, 0]"
      :position="[0, -2, 0]"
      :color="color"
      :clip-bias="clipBias"
      :texture-width="textureSize"
      :texture-height="textureSize"
    />
    <TresAmbientLight :intensity="1" />
    <OrbitControls />
  </TresCanvas>
</template>
