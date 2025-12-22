<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { MeshReflectionMaterial, OrbitControls } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'

const { resolution, mix, blurMixSmooth, blurMixRough, blurDepthEdgeMin, blurDepthEdgeMax, blurDepthScale, blurDepthBias, distortion, reflectorOffset } = useControls({
  resolution: { value: 256, min: 64, max: 2048, step: 64 },
  mix: { value: 1, min: 0, max: 1, step: 0.1 },
  blurMixSmooth: { value: 1, min: 0, max: 2, step: 0.1 },
  blurMixRough: { value: 1, min: 0, max: 2, step: 0.1 },
  blurDepthEdgeMin: { value: 0, min: 0, max: 1, step: 0.05 },
  blurDepthEdgeMax: { value: 0.2, min: 0, max: 1, step: 0.05 },
  blurDepthScale: { value: 1, min: 0, max: 3, step: 0.1 },
  blurDepthBias: { value: 0, min: -1, max: 1, step: 0.1 },
  distortion: { value: 0, min: 0, max: 1, step: 0.1 },
  reflectorOffset: { value: 0, min: -1, max: 1, step: 0.1 },
})
</script>

<template>
  <div class="aspect-video">
    <TresCanvas>
      <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
      <OrbitControls />
      <TresMesh :rotation="[-Math.PI / 2, 0, 0]">
        <TresPlaneGeometry :args="[10, 10]" />
        <MeshReflectionMaterial
          :blur="[300, 100]"
          :mixBlur="30"
          :mixStrength="80"
          :mixContrast="1"
          color="#a0a0a0"
          :metalness="0.5"
          :roughness="1"
          mirror="0"
          :resolution="resolution"
          :mix="mix"
          :blur-mix-smooth="blurMixSmooth"
          :blur-mix-rough="blurMixRough"
          :blur-depth-edge-min="blurDepthEdgeMin"
          :blur-depth-edge-max="blurDepthEdgeMax"
          :blur-depth-scale="blurDepthScale"
          :blur-depth-bias="blurDepthBias"
          :distortion="distortion"
          :reflector-offset="reflectorOffset"
        />
      </TresMesh>
      <TresMesh :position="[0, 1, 0]">
        <TresBoxGeometry />
        <TresMeshStandardMaterial color="orange" />
      </TresMesh>
      <TresAmbientLight />
      <TresDirectionalLight :position="[0, 2, 4]" />
    </TresCanvas>
  </div>
  <TresLeches :float="false" />
</template>
