<script setup>
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas, UseTexture } from '@tresjs/core'

const path = 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Displacement.jpg'
</script>

<template>
  <TresCanvas window-size clear-color="#111">
    <TresPerspectiveCamera :position="[0, 0, 3]" :fov="45" :aspect="1" :near="0.1" :far="1000" />
    <OrbitControls />
    <Suspense>
      <UseTexture v-slot="{ textures }" :map="path" :displacement-map="path">
        <TresMesh>
          <TresBoxGeometry :args="[1, 1, 1, 50, 50, 50]" />
          <TresMeshStandardMaterial :map="textures.map" :displacement-map="textures.displacementMap" :displacement-scale="0.1" />
        </TresMesh>
      </UseTexture>
    </Suspense>
    <TresDirectionalLight :position="[4, 4, 4]" />
    <TresAmbientLight :intensity="0.5" />
  </TresCanvas>
</template>
