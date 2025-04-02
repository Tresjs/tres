<script setup lang="ts">
/* eslint-disable no-console */

import { Html } from '@tresjs/cientos'
import { useTexture } from '@tresjs/core'
import { ref, watch } from 'vue'

const texturePath = ref('https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Color.jpg')
const { state: texture, isLoading } = useTexture(texturePath)

// Change the texture path after 2 seconds
setTimeout(() => {
  texturePath.value = 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/hexagonal-rock/Rocks_Hexagons_002_basecolor.jpg'
}, 2000)

watch(isLoading, (newVal) => {
  console.log('Outside useTexture isLoading', newVal)
}, { immediate: true })

watch(texture, (newVal) => {
  console.log('Outside useTexture texture', newVal)
}, { immediate: true })

/* eslint-enable no-console */
</script>

<template>
  <TresMesh :position="[0, 1, 0]">
    <Html transform position-y="1.5">
      <span class="text-xs bg-white p-2 rounded-md">
        Simple {{ isLoading ? 'Loading...' : 'Loaded' }}
      </span>
    </Html>
    <TresSphereGeometry :args="[1, 32, 32]" />
    <TresMeshStandardMaterial :map="texture" />
  </TresMesh>
</template>
