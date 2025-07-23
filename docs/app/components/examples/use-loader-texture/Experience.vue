<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { useLoader } from '@tresjs/core'
import { TextureLoader } from 'three'

// Load a texture from a remote URL
const { state: texture } = useLoader(
  TextureLoader,
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Color.jpg',
)
</script>

<template>
  <TresPerspectiveCamera
    :position="[3, 3, 3]"
    :look-at="[0, 0, 0]"
  />
  <OrbitControls />

  <TresAmbientLight :intensity="1" />
  <TresMesh>
    <TresSphereGeometry />
    <!-- Use the loaded texture as the material map -->
    <TresMeshStandardMaterial
      v-if="texture"
      :map="texture"
    />
  </TresMesh>
</template>
