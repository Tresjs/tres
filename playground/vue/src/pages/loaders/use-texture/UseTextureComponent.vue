<script setup lang="ts">
/* eslint-disable no-console */
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, UseTexture } from '@tresjs/cientos'
import type { Texture } from 'three'

const path = 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Color.jpg'

const handleLoaded = (texture: Texture) => {
  console.log('Loaded texture', texture)
}

const handleError = (error: unknown) => {
  console.error('error', error)
}
</script>

<template>
  <TresCanvas clear-color="#C0ffee">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
    <UseTexture v-slot="{ state: texture }" :path="path" @loaded="handleLoaded" @error="handleError">
      <TresMesh>
        <TresSphereGeometry />
        <TresMeshStandardMaterial :map="texture" />
      </TresMesh>
    </UseTexture>
  </TresCanvas>
</template>
