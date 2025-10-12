<script setup lang="ts">
import { AdditiveBlending } from 'three'
import FirefliesVertex from './shaders/fireflies/vertex.glsl'
import FirefliesFragment from './shaders/fireflies/fragment.glsl'

const shader = {
  transparent: true,
  blending: AdditiveBlending,
  depthWrite: false,

  vertexShader: FirefliesVertex,
  fragmentShader: FirefliesFragment,
  uniforms: {
    uSize: { value: 100 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    uTime: { value: 0 },
  },
}

const firefliesCount = 60
const positionArray = new Float32Array(firefliesCount * 3)
const scaleArray = new Float32Array(firefliesCount)

for (let i = 0; i < firefliesCount; i++) {
  positionArray[i * 3 + 0] = (Math.random() - 0.5) * 4
  positionArray[i * 3 + 1] = Math.random() * 4
  positionArray[i * 3 + 2] = (Math.random() - 0.5) * 4
  scaleArray[i] = Math.random()
}

const { onBeforeRender } = useLoop()

onBeforeRender(({ delta }) => {
  shader.uniforms.uTime.value += delta
})
</script>

<template>
  <TresPoints>
    <TresBufferGeometry :position="[positionArray, 3]" :a-scale="[scaleArray, 1]" />
    <TresShaderMaterial v-bind="shader" />
  </TresPoints>
</template>
