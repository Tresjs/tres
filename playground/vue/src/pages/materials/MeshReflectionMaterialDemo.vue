<script setup lang="ts">
import { MeshReflectionMaterial, OrbitControls } from '@tresjs/cientos'
import { TresCanvas, useTexture } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { shallowRef } from 'vue'
import '@tresjs/leches/styles'

useControls('fpsgraph')
const {
  mix,
  sharpMix,
  sharpDepthScale,
  sharpDepthBias,
  sharpDepthEdgeMin,
  sharpDepthEdgeMax,
  blurMixSmooth,
  blurMixRough,
  blurDepthScale,
  blurDepthBias,
  blurDepthEdgeMin,
  blurDepthEdgeMax,
  blurWidth,
  blurHeight,
  distortion,
  reflectorOffset,
  roughness,
  metalness,
  useDiffuseMap,
  useRoughnessMap,
  useNormalMap,
  useDistortionMap,
} = useControls({
  mix: { value: 1, min: 0, max: 1, step: 0.01 },

  sharpMix: { value: 1, min: 0, max: 1, step: 0.01 },
  sharpDepthScale: { value: 1.0, min: 0, max: 10, step: 0.1 },
  sharpDepthBias: { label: 'shrp-bias', value: 0.0, min: 0.0, max: 1, step: 0.01 },
  sharpDepthEdgeMin: { label: 'shrp-min', value: 0.0, min: 0.0, max: 1, step: 0.01 },
  sharpDepthEdgeMax: { label: 'shrp-max', value: 0.2, min: 0.01, max: 1, step: 0.01 },

  blurMixSmooth: { value: 1.0, min: 0, max: 1, step: 0.01 },
  blurMixRough: { value: 0.0, min: 0, max: 1, step: 0.01 },
  blurDepthScale: { value: 1, min: 0, max: 10, step: 0.1 },
  blurDepthBias: { label: 'blur-bias', value: 0.0, min: 0.0, max: 1, step: 0.01 },
  blurDepthEdgeMin: { label: 'blur-min', value: 0.0, min: 0.0, max: 1, step: 0.01 },
  blurDepthEdgeMax: { label: 'blur-max', value: 0.2, min: 0.01, max: 1, step: 0.01 },
  blurWidth: { value: 300, min: 0, max: 500, step: 1 },
  blurHeight: { value: 100, min: 0, max: 500, step: 1 },

  distortion: { value: 0.2, min: 0.01, max: 1, step: 0.01 },
  reflectorOffset: { value: 0.0, min: -5, max: 5, step: 0.01 },

  roughness: { value: 1.0, min: 0, max: 1, step: 0.01 },
  metalness: { value: 0.0, min: 0.0, max: 1, step: 0.01 },

  useDiffuseMap: true,
  useRoughnessMap: true,
  useNormalMap: true,
  useDistortionMap: true,
})

const PATH = 'https://raw.githubusercontent.com/Tresjs/assets/d15ced5cf09eddb2dae680dbe993613daae9cea4/textures/rock/'
const [roughnessMap, normalMap, distortionMap, diffuseMap]
  = await useTexture(['roughness.jpg', 'normal.jpg', 'displacement.png', 'diffuse.jpg'].map(p => PATH + p))

const lightX = shallowRef(0)
const lightZ = shallowRef(0)
const rotationY = shallowRef(0)
</script>

<template>
  <TresLeches />
  <TresCanvas clear-color="#050505">
    <TresPerspectiveCamera
      :position="[2, 5, 5]"
      :fov="70"
      :look-at="[0, 0, 0]"
      :dpr="[1, 1.5]"
    />
    <OrbitControls />

    <TresFog
      attach="fog"
      :args="['#191920', 10, 35]"
    />
    <TresPointLight
      :intensity="20"
      :position="[lightX, 2, lightZ]"
    />

    <TresGroup :rotation-y="rotationY">
      <TresMesh :position="[0, 1.5, 0]">
        <TresTorusGeometry />
        <TresMeshNormalMaterial color="red" />
      </TresMesh>

      <TresMesh :position="[-2, 1.0, 1]">
        <TresBoxGeometry />
        <TresMeshStandardMaterial color="blue" />
      </TresMesh>
      <TresMesh
        :position="[2, 1.0, 1]"
        :scale="0.5"
      >
        <TresTorusKnotGeometry />
        <TresMeshStandardMaterial color="green" />
      </TresMesh>
    </TresGroup>

    <TresMesh :rotation="[-Math.PI / 2, 0, 0]">
      <TresPlaneGeometry :args="[10, 10]" />
      <MeshReflectionMaterial
        :resolution="512"
        :mix="mix.value"

        :blur-mix-smooth="blurMixSmooth.value"
        :blur-mix-rough="blurMixRough.value"
        :blur-depth-edge-min="blurDepthEdgeMin.value"
        :blur-depth-edge-max="blurDepthEdgeMax.value"
        :blur-depth-bias="blurDepthBias.value"
        :blur-depth-scale="blurDepthScale.value"
        :blur-size="[blurWidth.value, blurHeight.value]"

        :sharp-mix="sharpMix.value"
        :sharp-depth-edge-min="sharpDepthEdgeMin.value"
        :sharp-depth-edge-max="sharpDepthEdgeMax.value"
        :sharp-depth-scale="sharpDepthScale.value"
        :sharp-depth-bias="sharpDepthBias.value"

        :distortion="distortion.value"
        :reflector-offset="reflectorOffset.value"

        :roughness="roughness.value"
        :metalness="metalness.value"
        :map="useDiffuseMap.value ? diffuseMap : undefined"
        :normal-map="useNormalMap.value ? normalMap : undefined"
        :distortion-map="useDistortionMap.value ? distortionMap : undefined"
        :roughness-map="useRoughnessMap.value ? roughnessMap : undefined"
      />
    </TresMesh>
  </TresCanvas>
</template>
