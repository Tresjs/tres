<script setup lang="ts">
import { Ref, ref } from 'vue'
import { useRenderLoop, useTexture } from '/@/composables/'
import { TresInstance } from '../types'

const sphereRef: Ref<TresInstance | null> = ref(null)

const { onLoop, resume } = useRenderLoop()
resume()
onLoop(({ elapsed }) => {
  if (sphereRef.value) {
    sphereRef.value.position.y = Math.sin(elapsed * 0.2) * 2.0
  }
})

/* const texture = await useTexture(['/textures/stylized-leaves-material/Stylized_Leaves_002_basecolor.jpg']) */
const pbrTexture = await useTexture({
  map: '/textures/stylized-leaves-material/Stylized_Leaves_002_basecolor.jpg',
  displacementMap: '/textures/stylized-leaves-material/Stylized_Leaves_002_height.png',
  roughnessMap: '/textures/stylized-leaves-material/Stylized_Leaves_002_roughness.jpg',
  normalMap: '/textures/stylized-leaves-material/Stylized_Leaves_002_normal.jpg',
  ambientOcclusion: '/textures/stylized-leaves-material/Stylized_Leaves_002_ambientOcclusion.jpg',
})
</script>
<template>
  <TresMesh ref="sphereRef" :position="[-2, 2, 2]" :scale="1" cast-shadow>
    <TresSphereGeometry :args="[1, 500, 500]" />
    <TresMeshStandardMaterial v-bind="pbrTexture" />
  </TresMesh>
</template>
