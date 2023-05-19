<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, useTweakPane, Levioso, TorusKnot } from '@tresjs/cientos'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { shallowRef } from 'vue'
import { watchEffect } from 'vue'
import { shallowReactive } from 'vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const { pane } = useTweakPane()

const leviosoState = shallowReactive({
  speed: 5,
  rotationFactor: 1,
  floatFactor: 1,
  range: [-0.1, 0.1],
})

pane.addInput(leviosoState, 'speed', {
  step: 1,
  min: 0,
  max: 100,
})

pane.addInput(leviosoState, 'rotationFactor', {
  step: 1,
  min: 0,
  max: 10,
})

pane.addInput(leviosoState, 'floatFactor', {
  step: 1,
  min: 0,
  max: 10,
})
const groupRef = shallowRef()

watchEffect(() => {
  console.log(groupRef)
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />
    <Levioso ref="groupRef" v-bind="leviosoState">
      <TorusKnot :position="[0, 4, 0]">
        <TresMeshNormalMaterial />
      </TorusKnot>
    </Levioso>
    <TresGridHelper :args="[10, 10]" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
