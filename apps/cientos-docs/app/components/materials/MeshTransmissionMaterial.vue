<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Environment, MeshTransmissionMaterial, OrbitControls } from '@tresjs/cientos'
import { useControls } from '@tresjs/leches'

const uuid = inject(`uuid`)

const { transmission, thickness, roughness, chromaticAberration, anisotropicBlur, distortion, distortionScale, temporalDistortion, ior, backside, color } = useControls({
  transmission: { value: 1, min: 0, max: 1, step: 0.01 },
  thickness: { value: 0.5, min: 0, max: 5, step: 0.1 },
  roughness: { value: 0, min: 0, max: 1, step: 0.01 },
  chromaticAberration: { value: 0.06, min: 0, max: 1, step: 0.01 },
  anisotropicBlur: { value: 0.1, min: 0, max: 2, step: 0.01 },
  distortion: { value: 0, min: 0, max: 1, step: 0.01 },
  distortionScale: { value: 0.5, min: 0, max: 1, step: 0.01 },
  temporalDistortion: { value: 0, min: 0, max: 1, step: 0.01 },
  ior: { value: 1.5, min: 1, max: 2.333, step: 0.01 },
  backside: false,
  color: '#ffffff',
}, { uuid })
</script>

<template>
  <TresCanvas clear-color="#0a2925">
    <TresPerspectiveCamera :position="[0, 0, 5]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <TresMesh>
      <TresTorusKnotGeometry :args="[1, 0.3, 128, 32]" />
      <MeshTransmissionMaterial
        :transmission="transmission"
        :thickness="thickness"
        :roughness="roughness"
        :chromatic-aberration="chromaticAberration"
        :anisotropic-blur="anisotropicBlur"
        :distortion="distortion"
        :distortion-scale="distortionScale"
        :temporal-distortion="temporalDistortion"
        :ior="ior"
        :backside="backside"
        :color="color"
      />
    </TresMesh>
    <TresMesh :position="[0, 0, -4]">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshStandardMaterial color="#fbb03b" />
    </TresMesh>
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
    <Suspense>
      <Environment preset="city" />
    </Suspense>
  </TresCanvas>
</template>
