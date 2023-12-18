<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Levioso, TorusKnot } from '@tresjs/cientos'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { shallowRef, shallowReactive } from 'vue'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const leviosoState = shallowReactive({
  speed: 5,
  rotationFactor: 1,
  floatFactor: 1,
  range: [-0.1, 0.1],
})

const { speed, rotationFactor, floatFactor } = useControls({
  speed: { value: leviosoState.speed, min: 0, max: 100, step: 1 },
  rotationFactor: { value: leviosoState.rotationFactor, min: 0, max: 10, step: 1 },
  floatFactor: { value: leviosoState.floatFactor, min: 0, max: 10, step: 1 },
})

watch([speed.value, rotationFactor.value, floatFactor.value], () => {
  leviosoState.speed = speed.value.value
  leviosoState.rotationFactor = rotationFactor.value.value
  leviosoState.floatFactor = floatFactor.value.value
})
const groupRef = shallowRef()
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />
    <Levioso
      ref="groupRef"
      v-bind="leviosoState"
    >
      <TorusKnot :position="[0, 4, 0]">
        <TresMeshNormalMaterial />
      </TorusKnot>
    </Levioso>
    <TresGridHelper :args="[10, 10]" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
