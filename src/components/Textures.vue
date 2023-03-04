<script setup lang="ts">
import { Ref, ref } from 'vue'

import { useTexture, useRenderLoop, TresInstance } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'

const pbrTexture = await useTexture({
  map: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Displacement.jpg',
  displacementMap:
    'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Displacement.jpg',
  roughnessMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Roughness.jpg',
  normalMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_NormalGL.jpg',
  ambientOcclusion:
    'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_AmbientOcclusion.jpg',
})

const sphereRef: Ref<TresInstance | null> = ref(null)

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  // I will run at every frame ~ 60FPS (depending of your monitor)
  if (sphereRef.value) {
    sphereRef.value.rotation.y = delta
  }
})
</script>

<template>
  <TresCanvas clear-color="#82DBC5" shadows alpha window-size power-preference="high-performance">
    <OrbitControls />
    <TresPerspectiveCamera :position="[1, 2, 5]" :fov="45" :aspect="1" :near="0.1" :far="1000" />
    <TresScene>
      <TresMesh ref="sphereRef" :scale="1" cast-shadow>
        <TresSphereGeometry :args="[1, 100, 100]" />
        <TresMeshStandardMaterial v-bind="pbrTexture" displacement-scale="0.2" />
      </TresMesh>
      <TresAmbientLight :color="0xffffff" :intensity="0.75" />
      <TresDirectionalLight :position="[0, 2, 4]" :intensity="8" cast-shadow />
    </TresScene>
  </TresCanvas>
</template>
