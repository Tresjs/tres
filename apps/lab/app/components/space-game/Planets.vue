<script setup lang="ts">
/* const earth = await useLoader(TextureLoader, '/textures/space-game/earth.jpg') as Texture
const moon = await useLoader(TextureLoader, '/textures/space-game/moon.png') as Texture */

const { state: earth } = useTexture('/textures/space-game/earth.jpg')
const { state: moon } = useTexture('/textures/space-game/moon.png')
</script>

<template>
  <TresGroup :scale="[100, 100, 100]" :position="[-500, -500, 1000]">
    <TresMesh>
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresMesh v-if="earth">
      <TresSphereGeometry :args="[5, 32, 32]" />
      <TresMeshBasicMaterial :map="earth" :fog="false" color="#666666" />
    </TresMesh>
    <TresMesh v-if="moon" :position="[5, -5, -5]">
      <TresSphereGeometry :args="[0.75, 32, 32]" />
      <TresMeshBasicMaterial :roughness="1" :map="moon" :fog="false" color="#666666" />
    </TresMesh>
    <TresPointLight :position="[-5, -5, -5]" :distance="1000" :intensity="6" />
    <TresMesh :position="[-30, -10, -60]">
      <TresSphereGeometry :args="[4, 32, 32]" />
      <TresMeshBasicMaterial color="#FFFF99" :fog="false" />
      <TresPointLight :distance="6100" :intensity="50" color="white" />
    </TresMesh>
  </TresGroup>
</template>