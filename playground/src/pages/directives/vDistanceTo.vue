<script setup lang="ts">
import { shallowRef } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Sphere, vDistanceTo } from '@tresjs/cientos'
import { SRGBColorSpace, NoToneMapping } from 'three'
import { useControls, TresLeches } from '@tresjs/leches'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#333',
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const sphere1Ref = shallowRef()

const { value: slider } = useControls({
  slider: {
    value: -2,
    min: -4,
    max: 2,
    step: 0.1,
  },
})
</script>

<template>
  <TresLeches class="top-0 important-left-4" />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Sphere
      ref="sphere1Ref"
      :position="[-2, slider, 0]"
      :scale="0.5"
    />
    <Sphere
      v-distance-to="sphere1Ref"
      :position="[2, 0, 0]"
      :scale="0.5"
    />
    <TresGridHelper :args="[10, 10]" />
    <OrbitControls />
  </TresCanvas>
</template>
