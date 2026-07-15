<script setup lang="ts">
import { Environment, MeshTransmissionMaterial, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'

const uuid = 'materials-mesh-transmission'

useControls('fpsgraph', { uuid })

const {
  transmission,
  thickness,
  roughness,
  chromaticAberration,
  anisotropicBlur,
  distortion,
  distortionScale,
  temporalDistortion,
  ior,
  clearcoat,
  clearcoatRoughness,
  attenuationDistance,
  attenuationColor,
  color,
  backside,
  background,
} = useControls({
  transmission: { value: 1, min: 0, max: 1, step: 0.01 },
  thickness: { value: 3.5, min: 0, max: 10, step: 0.01 },
  roughness: { value: 0, min: 0, max: 1, step: 0.01 },
  chromaticAberration: { value: 0.06, min: 0, max: 1, step: 0.01 },
  anisotropicBlur: { value: 0.1, min: 0, max: 1, step: 0.01 },
  distortion: { value: 0, min: 0, max: 1, step: 0.01 },
  distortionScale: { value: 0.3, min: 0, max: 1, step: 0.01 },
  temporalDistortion: { value: 0, min: 0, max: 1, step: 0.01 },
  ior: { value: 1.5, min: 1, max: 3, step: 0.01 },
  clearcoat: { value: 1, min: 0, max: 1, step: 0.01 },
  clearcoatRoughness: { value: 0, min: 0, max: 1, step: 0.01 },
  attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
  attenuationColor: '#ffffff',
  color: '#ffffff',
  backside: false,
  background: true,
}, { uuid })
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas clear-color="#050505">
    <TresPerspectiveCamera
      :position="[0, 0, 5]"
      :fov="60"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />

    <Environment
      preset="city"
      :background="background"
    />

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
        :clearcoat="clearcoat"
        :clearcoat-roughness="clearcoatRoughness"
        :attenuation-distance="attenuationDistance"
        :attenuation-color="attenuationColor"
        :color="color"
        :backside="backside"
        :resolution="2048"
        :samples="10"
      />
    </TresMesh>
  </TresCanvas>
</template>
