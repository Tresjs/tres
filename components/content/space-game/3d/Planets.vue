<script setup lang="ts">
import { useLoader } from '@tresjs/core'
import { TextureLoader, type Texture } from 'three';

const earth = await useLoader(TextureLoader, '/textures/space-game/earth.jpg') as Texture
const moon = await useLoader(TextureLoader, '/textures/space-game/moon.png') as Texture
</script>

<template>
  <TresGroup :scale="[100, 100, 100]" :position="[-500, -500, 1000]">
    <TresMesh>
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresMesh>
      <TresSphereGeometry :args="[5, 32, 32]" />
      <Suspense>
        <TresMeshBasicMaterial :map="earth" :fog="false" color="#666666" />
      </Suspense>
    </TresMesh>
    <TresMesh :position="[5, -5, -5]">
      <TresSphereGeometry :args="[0.75, 32, 32]" />
      <Suspense>
        <TresMeshBasicMaterial :roughness="1" :map="moon" :fog="false" color="#666666" />
      </Suspense>
    </TresMesh>
    <TresPointLight :position="[-5, -5, -5]" :distance="1000" :intensity="6" />
    <TresMesh :position="[-30, -10, -60]">
      <TresSphereGeometry :args="[4, 32, 32]" />
      <TresMeshBasicMaterial color="#FFFF99" :fog="false" />
      <TresPointLight :distance="6100" :intensity="50" color="white" />
    </TresMesh>
  </TresGroup>
</template>