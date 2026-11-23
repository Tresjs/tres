<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { MeshReflectionMaterial, OrbitControls, useTextures } from '@tresjs/cientos/webgpu'
// WebGLRenderer cannot run node materials, so `renderer: webgl` shows the GLSL MeshReflectionMaterial.
import { MeshReflectionMaterial as GlslMeshReflectionMaterial } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { computed } from 'vue'
import { useBackendControl } from '@/composables/useBackendControl'
import { useRendererSwitch } from '@/composables/useRendererSwitch'

const uuid = 'webgpu-mesh-reflection-material'
const onReady = useBackendControl(uuid)
const rendererFactory = useRendererSwitch(uuid)
const ReflectionMaterial = rendererFactory ? GlslMeshReflectionMaterial : MeshReflectionMaterial

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

  roughness: { value: 0.5, min: 0, max: 1, step: 0.01 },
  metalness: { value: 0.0, min: 0.0, max: 1, step: 0.01 },

  useDiffuseMap: false,
  useRoughnessMap: false,
  useNormalMap: false,
  useDistortionMap: false,
}, { uuid })

const PATH = 'https://raw.githubusercontent.com/Tresjs/assets/d15ced5cf09eddb2dae680dbe993613daae9cea4/textures/rock/'
const { textures } = useTextures(['roughness.jpg', 'normal.jpg', 'displacement.png', 'diffuse.jpg'].map(p => PATH + p))

const materialProps = computed(() => {
  const [roughnessMap, normalMap, distortionMap, diffuseMap] = textures.value
  return {
    resolution: 512,
    mix: mix.value,
    blurMixSmooth: blurMixSmooth.value,
    blurMixRough: blurMixRough.value,
    blurDepthEdgeMin: blurDepthEdgeMin.value,
    blurDepthEdgeMax: blurDepthEdgeMax.value,
    blurDepthBias: blurDepthBias.value,
    blurDepthScale: blurDepthScale.value,
    blurSize: [blurWidth.value, blurHeight.value] as [number, number],
    sharpMix: sharpMix.value,
    sharpDepthEdgeMin: sharpDepthEdgeMin.value,
    sharpDepthEdgeMax: sharpDepthEdgeMax.value,
    sharpDepthScale: sharpDepthScale.value,
    sharpDepthBias: sharpDepthBias.value,
    distortion: distortion.value,
    reflectorOffset: reflectorOffset.value,
    roughness: roughness.value,
    metalness: metalness.value,
    map: useDiffuseMap.value ? diffuseMap : undefined,
    normalMap: useNormalMap.value ? normalMap : undefined,
    distortionMap: useDistortionMap.value ? distortionMap : undefined,
    roughnessMap: useRoughnessMap.value ? roughnessMap : null,
  }
})

const checks = [
  'The floor mirrors the torus, the box and the knot, upside down and in the right place',
  'Orbit below the floor: the reflection goes away and nothing flickers',
  'Objects under the floor do not show in the reflection (the clip plane works)',
  '`sharpDepthScale` above 0 fades the reflection away from the floor contact',
  '`blurWidth` / `blurHeight` and `blurMixSmooth` blur the reflection',
  '`roughness` near 1 dims the sharp reflection and shows `blurMixRough`',
  '`useNormalMap` bends the reflection with the rock normals',
  '`useDistortionMap` with `distortion` wobbles the reflection',
  '`reflectorOffset` moves the reflection up and down',
  'Every control gives about the same result as `renderer: webgl` (the GLSL MeshReflectionMaterial)',
  'No errors and no <MeshReflectionMaterial> WebGPU warning in the console',
]
</script>

<template>
  <TresLeches :uuid="uuid">
    <ul class="list-disc pl-4 text-xs">
      <li v-for="check in checks" :key="check">{{ check }}</li>
    </ul>
  </TresLeches>
  <TresCanvas :renderer="rendererFactory" clear-color="#050505" :tone-mapping="NoToneMapping" @ready="onReady">
    <TresPerspectiveCamera :position="[2, 5, 5]" :fov="70" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <TresFog attach="fog" :args="['#191920', 10, 35]" />
    <TresPointLight :intensity="20" :position="[0, 2, 0]" />
    <TresAmbientLight :intensity="0.5" />

    <TresMesh :position="[0, 1.5, 0]">
      <TresTorusGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresMesh :position="[-2, 1.0, 1]">
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="blue" />
    </TresMesh>
    <TresMesh :position="[2, 1.0, 1]" :scale="0.5">
      <TresTorusKnotGeometry />
      <TresMeshStandardMaterial color="green" />
    </TresMesh>
    <TresMesh :position="[0, -1.5, 0]">
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="red" />
    </TresMesh>

    <TresMesh :rotation="[-Math.PI / 2, 0, 0]">
      <TresPlaneGeometry :args="[10, 10]" />
      <component :is="ReflectionMaterial" v-if="textures.length" v-bind="materialProps" />
    </TresMesh>
  </TresCanvas>
</template>
