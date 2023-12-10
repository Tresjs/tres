<script setup lang="ts">
import { Vector2 } from 'three'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

const blobRef: Ref<TresObject | null> = ref(null)
const materialRef: Ref<TresObject | null> = ref(null)
const uniforms = {
  uTime: { value: 0 },
  uAmplitude: { value: new Vector2(0.1, 0.1) },
  uFrequency: { value: new Vector2(20, 5) },
}

const { onLoop, resume } = useRenderLoop()
resume()
onLoop(({ _delta, elapsed }) => {
  if (blobRef.value) {
    blobRef.value.material.uniforms.uTime.value = elapsed
  }
})
</script>

<template>
  <TresMesh
    ref="blobRef"
    :position="[0, 4, 0]"
  >
    <TresSphereGeometry :args="[2, 32, 32]" />
    <TresShaderMaterial
      ref="materialRef"
      :vertex-shader="vertexShader"
      :fragment-shader="fragmentShader"
      :uniforms="uniforms"
    />
  </TresMesh>
</template>
