<script setup lang="ts">
import { OrbitControls, useTexture } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'

const path = 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Color.jpg'
const { state: texture } = useTexture(path)
</script>

<template>
  <TresCanvas clear-color="#FBB03B">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <TresMesh>
      <TresSphereGeometry />
      <TresMeshStandardMaterial :map="texture" />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
