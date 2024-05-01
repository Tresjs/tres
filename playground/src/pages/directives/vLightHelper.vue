<script setup lang="ts">
import { shallowRef } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls, Sphere, vAlwaysLookAt, vLightHelper } from '@tresjs/cientos'
import { NoToneMapping, SRGBColorSpace } from 'three'

const gl = {
  clearColor: '#333',
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const directionalLightRef = shallowRef()
const pointLightRef = shallowRef()
const spotLightRef = shallowRef()

const { onLoop } = useRenderLoop()

onLoop(({ elapsed }) => {
  if (directionalLightRef.value) {
    directionalLightRef.value.position.y = Math.sin(elapsed) * 1.5 + 2
  }
  if (pointLightRef.value) {
    const lightAngle = elapsed * 0.5
    pointLightRef.value.position.x = Math.cos(lightAngle) * 4
    pointLightRef.value.position.z = Math.sin(lightAngle) * 4
  }
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Sphere
      v-light-helper
      :scale="0.5"
    >
      <TresMeshStandardMaterial :color="0x222" />
    </Sphere>
    <TresAmbientLight :color="0xFFFFFF" />
    <TresDirectionalLight
      ref="directionalLightRef"
      v-light-helper
      :color="0xFFFFFF"
      :intensity="5"
      :position="[0, 2, 4]"
    />
    <TresPointLight
      ref="pointLightRef"
      v-light-helper
      :color="0xFF0000"
      :intensity="100"
      :position="[0, 1, 1]"
    />
    <TresSpotLight
      ref="spotLightRef"
      v-light-helper
      :color="0x00FF00"
      :intensity="10"
      :position="[0, 1, 1]"
    />

    <TresHemisphereLight
      v-light-helper
      :color="0x0000FF"
      :ground-color="0x00FFFF"
      :intensity="50"
    />
    <TresRectAreaLight
      v-light-helper
      v-always-look-at="[0, 0, 0]"
      :args="[0xFFFF00, 100, 1, 1]"
      :position="[2.5, 0, 2.5]"
    />
    <TresGridHelper :args="[10, 10]" />
    <OrbitControls />
  </TresCanvas>
</template>
