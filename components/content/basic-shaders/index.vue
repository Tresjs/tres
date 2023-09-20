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

useTweakPane()

const { onLoop, resume } = useRenderLoop()
resume()
onLoop(({ _delta, elapsed }) => {
  if (blobRef.value) {
    blobRef.value.material.uniforms.uTime.value = elapsed
  }
})
</script>

<template>
  <TresCanvas
    clear-color="#111"
    shadows
    alpha
  >
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />
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
    <TresMesh :rotation="[-Math.PI / 2, 0, 0]">
      <TresPlaneGeometry :args="[10, 10, 10, 10]" />
      <TresMeshBasicMaterial color="#444" />
    </TresMesh>
  </TresCanvas>
</template>
