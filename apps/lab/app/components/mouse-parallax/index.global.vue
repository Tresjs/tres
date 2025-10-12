<script setup lang="ts">
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import Vertex from './shaders/vertex.glsl'
import Fragment from './shaders/fragment.glsl'

const gl = {
  clearColor: '#111',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

// Shaders

const shader = {
  vertexShader: Vertex,
  fragmentShader: Fragment,
  uniforms: {
    uTime: { value: 0 },
  },
}
const { onLoop } = useRenderLoop()

onLoop(() => {
  shader.uniforms.uTime.value += 0.01
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      :position="[0, 0, 5]"
      :fov="75"
      :near="0.1"
      :far="1000"
    />
    <MouseParallax :factor="2" />
    <TresMesh
      :scale="2"
      :position="[0.5, 0.5, 0]"
      cast-shadow
    >
      <TresSphereGeometry :args="[1, 30, 30]" />
      <TresShaderMaterial v-bind="shader" />
    </TresMesh>
    <Stars />
    <TresAmbientLight :intensity="1" />
    <TheScreenshot />
  </TresCanvas>
</template>
