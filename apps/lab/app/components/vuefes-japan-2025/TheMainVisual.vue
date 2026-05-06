<script setup lang="ts">
import { RepeatWrapping } from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import { COLOR_CYCLE_SECONDS, colorSets } from './color-sets'

const { state: noiseTexture } = useTexture('/experiments/vuefes-japan-2025/noise.png')

watch(noiseTexture, (tex) => {
  if (!tex) return
  tex.wrapS = RepeatWrapping
  tex.wrapT = RepeatWrapping
}, { immediate: true })

function createUniforms(isSphere: 0 | 1) {
  return {
    uTime: { value: 0 },
    uIsSphere: { value: isSphere },
    uActiveColorSet: { value: 0 },
    uNoiseTexture: { value: noiseTexture.value },
    uColorSet1: { value: colorSets[0] },
    uColorSet2: { value: colorSets[1] },
    uColorSet3: { value: colorSets[2] },
    uColorSet4: { value: colorSets[3] },
  }
}

const coneUniforms = createUniforms(0)
const sphereUniforms = createUniforms(1)

watch(noiseTexture, (tex) => {
  if (!tex) return
  coneUniforms.uNoiseTexture.value = tex
  sphereUniforms.uNoiseTexture.value = tex
})

let lastSetIndex = -1
const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  coneUniforms.uTime.value = elapsed
  sphereUniforms.uTime.value = elapsed

  const idx = Math.floor(elapsed / COLOR_CYCLE_SECONDS) % colorSets.length
  if (idx !== lastSetIndex) {
    lastSetIndex = idx
    coneUniforms.uActiveColorSet.value = idx
    sphereUniforms.uActiveColorSet.value = idx
  }
})

// World units match the source's fixed 650x320 ortho frustum.
// Both meshes baked at the source's resize-time scale of 0.95.
const SCALE = 0.95
const CONE_POSITION: [number, number, number] = [-146 * SCALE, -2 * SCALE, 0]
const SPHERE_POSITION: [number, number, number] = [172 * SCALE, 2 * SCALE, 0]
</script>

<template>
  <TresOrthographicCamera :left="-325" :right="325" :top="160" :bottom="-160" :near="0.1" :far="9999"
    :position="[0, 0, 1000]" :look-at="[0, 0, 0]" />

  <TresMesh :position="CONE_POSITION" :scale="SCALE" :rotation="[Math.PI, 0, 0]">
    <TresConeGeometry :args="[192, 330, 128]" />
    <TresShaderMaterial :vertex-shader="vertexShader" :fragment-shader="fragmentShader" :uniforms="coneUniforms"
      :transparent="true" />
  </TresMesh>

  <TresMesh :position="SPHERE_POSITION" :scale="SCALE">
    <TresSphereGeometry :args="[165, 64, 64]" />
    <TresShaderMaterial :vertex-shader="vertexShader" :fragment-shader="fragmentShader" :uniforms="sphereUniforms"
      :transparent="true" />
  </TresMesh>
  <OrbitControls />
</template>
