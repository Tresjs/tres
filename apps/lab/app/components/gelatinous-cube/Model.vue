<script setup lang="ts">
import { MeshTransmissionMaterial, useGLTF } from '@tresjs/cientos'
import { Color } from 'three'
import { computed } from 'vue'

const { nodes } = await useGLTF(
  '/models/gelatinous-cube/gelatinous_cube-transformed.glb',
  { draco: true },
)

const config = useControls({
  transmission: { value: 1, min: 0, max: 1, step: 0.01 },
  roughness: { value: 0, min: 0, max: 1, step: 0.01 },
  thickness: { value: 3.5, min: 0, max: 10, step: 0.01 },
  ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
  chromaticAberration: { value: 0.06, min: 0, max: 1, step: 0.01 },
  anisotropicBlur: { value: 0.1, min: 0, max: 1, step: 0.01 },
  distortion: { value: 0, min: 0, max: 1, step: 0.01 },
  distortionScale: { value: 0.3, min: 0.01, max: 1, step: 0.01 },
  temporalDistortion: { value: 0.5, min: 0, max: 1, step: 0.01 },
  clearcoat: { value: 1, min: 0, max: 1, step: 0.01 },
  attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
  samples: { value: 10, min: 1, max: 32, step: 1 },
  resolution: { value: 2048, min: 256, max: 2048, step: 256 },
  backside: false,
  color: '#c9ffa1',
  bg: '#839681',
}, {
  uuid: 'gelatinous-cube-experiment',
})

const backgroundColor = computed(() => new Color(config.bg.value))
</script>

<template>
  <TresGroup>
    <TresMesh :geometry="nodes.cube1.geometry" :position="[-0.56, 0.38, -0.11]">
      <MeshTransmissionMaterial
        :transmission="config.transmission.value"
        :roughness="config.roughness.value"
        :thickness="config.thickness.value"
        :ior="config.ior.value"
        :chromatic-aberration="config.chromaticAberration.value"
        :anisotropic-blur="config.anisotropicBlur.value"
        :distortion="config.distortion.value"
        :distortion-scale="config.distortionScale.value"
        :temporal-distortion="config.temporalDistortion.value"
        :clearcoat="config.clearcoat.value"
        :attenuation-distance="config.attenuationDistance.value"
        :samples="config.samples.value"
        :resolution="config.resolution.value"
        :backside="config.backside.value"
        :color="config.color.value"
        :background="backgroundColor"
      />
    </TresMesh>

    <TresMesh
      :geometry="nodes.cube2.geometry"
      :material="nodes.cube2.material"
      :position="[-0.56, 0.38, -0.11]"
      :render-order="-100"
      cast-shadow
    />

    <TresMesh
      :geometry="nodes.bubbles.geometry"
      :material="nodes.bubbles.material"
      :position="[-0.56, 0.38, -0.11]"
    />

    <TresGroup :position="[-0.56, 0.38, -0.41]">
      <TresMesh :geometry="nodes.arrows.geometry" :material="nodes.arrows.material" />
      <TresMesh :geometry="nodes.skeleton.geometry" :material="nodes.skeleton.material" />
      <TresMesh :geometry="nodes['skeleton.001'].geometry" :material="nodes['skeleton.001'].material" />
    </TresGroup>
  </TresGroup>
</template>
