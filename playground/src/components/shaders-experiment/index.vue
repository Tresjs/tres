<script setup lang="ts">
import { BasicShadowMap, sRGBEncoding, NoToneMapping, Vector2 } from 'three'
import { TresCanvas, TresInstance, useRenderLoop } from '/@/'
import { OrbitControls } from '@tresjs/cientos'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import { ShallowRef } from 'vue'

const gl = {
  clearColor: '#4f4f4f',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
}

const blobRef: ShallowRef<TresInstance | null> = shallowRef(null)

const uniforms = {
  uTime: { value: 0 },
  uAmplitude: { value: new Vector2(0.1, 0.1) },
  uFrequency: { value: new Vector2(20, 5) },
}

const { onLoop } = useRenderLoop()
onLoop(({ elapsed }) => {
  if (blobRef.value) {
    blobRef.value.material.uniforms.uTime.value = elapsed
  }
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />
    <TresMesh ref="blobRef" :position="[0, 4, 0]">
      <TresSphereGeometry :args="[2, 32, 32]" />
      <TresShaderMaterial :vertex-shader="vertexShader" :fragment-shader="fragmentShader" :uniforms="uniforms" />
    </TresMesh>
    <TresMesh :rotation="[-Math.PI / 2, 0, 0]">
      <TresPlaneGeometry :args="[10, 10, 10, 10]" />
      <TresMeshBasicMaterial color="#444" />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
