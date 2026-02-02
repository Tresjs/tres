<script setup lang="ts">
import { DoubleSide, RepeatWrapping, Uniform, type PlaneGeometry } from 'three';
import fragmentShader from './shaders/fragment.glsl'
import vertexShader from './shaders/vertex.glsl'

const { state: smokeTexture, isLoading } = useTexture('/textures/perlin.png')

const smokeGeometry = ref<PlaneGeometry>()

watch(smokeGeometry, (geometry) => {
  if (geometry) {
    // We do it here to change the transformation origin of the geometry and then scale it
    geometry.translate(0, 0.5, 0)
    geometry.scale(1.5, 6, 1.5)
  }
})

const MUG_HEIGHT = 1.83
const uniforms = {
  uPerlinNoise: new Uniform(smokeTexture.value),
  uTime: new Uniform(0),
}

watch(smokeTexture, (texture) => {
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping
  uniforms.uPerlinNoise.value = texture
})

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  uniforms.uTime.value = elapsed
})
</script>
<template>
  <TresMesh v-if="!isLoading" :position="[0, MUG_HEIGHT, 0]">
    <TresPlaneGeometry ref="smokeGeometry" :args="[1, 1, 16, 64]" />
    <TresShaderMaterial :vertex-shader="vertexShader" :fragment-shader="fragmentShader" :side="DoubleSide"
      :uniforms="uniforms" :transparent="true" :opacity="0.5" :depth-write="false" />
  </TresMesh>
</template>