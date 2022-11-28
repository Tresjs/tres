<script setup lang="ts">
import { Vector2 } from 'three'
import { OrbitControls, useTweakPane } from '@tresjs/cientos'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import { useRenderLoop } from '/@/core'
import { Ref, ref } from 'vue'
import { TresInstance } from '/@/types'

const blobRef: Ref<TresInstance | null> = ref(null)
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
  <Story title="shaders/blob">
    <Variant title="playground">
      <TresCanvas clear-color="#111" shadows alpha>
        <TresPerspectiveCamera :position="[11, 11, 11]" />
        <OrbitControls />
        <TresScene>
          <TresMesh ref="blobRef" :position="[0, 4, 0]">
            <TresSphereGeometry :args="[2, 32, 32]" />
            <TresShaderMaterial :vertex-shader="vertexShader" :fragment-shader="fragmentShader" :uniforms="uniforms" />
          </TresMesh>
          <TresMesh :rotation="[-Math.PI / 2, 0, 0]">
            <TresPlaneGeometry :args="[10, 10, 10, 10]" />
            <TresMeshBasicMaterial color="#444" />
          </TresMesh>
        </TresScene>
      </TresCanvas>
    </Variant>
  </Story>
</template>
