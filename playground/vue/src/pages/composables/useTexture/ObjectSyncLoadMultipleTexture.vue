<script setup lang="ts">
/* eslint-disable no-console */
import { Html } from '@tresjs/cientos'
import { useTexture } from '@tresjs/core'

const { data: texture, load } = useTexture([
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Color.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Displacement.jpg',
])

watch(texture, (newVal) => {
  console.log('Load mutiple', newVal)
}, { immediate: true })

setTimeout(() => {
  load([
    'https://raw.githubusercontent.com/Tresjs/assets/main/textures/hexagonal-rock/Rocks_Hexagons_002_basecolor.jpg',
    'https://raw.githubusercontent.com/Tresjs/assets/main/textures/hexagonal-rock/Rocks_Hexagons_002_normal.jpg',
  ])
}, 2000)

// eslint-enable no-console
</script>

<template>
  <TresMesh :position="[-9, 1, 0]">
    <Html transform position-y="1.5">
      <span class="text-xs bg-white p-2 rounded-md">
        Load multiple
      </span>
    </Html>
    <TresSphereGeometry :args="[1, 32, 32]" />
    <TresMeshStandardMaterial :map="texture[0]" :displacement-map="texture[1]" :displacement-scale="0.1" />
  </TresMesh>
</template>
