<script setup lang="ts">
/* eslint-disable no-console */
import { Html } from '@tresjs/cientos'
import { usePBRTexture } from '@tresjs/core'

const { data: textures, isLoading } = await usePBRTexture({
  map: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Color.jpg',
  normalMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_NormalDX.jpg',
  roughnessMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Roughness.jpg',
  aoMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_AmbientOcclusion.jpg',
  displacementMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Displacement.jpg',
})

watch(textures, (newVal) => {
  console.log('PBR texture async', newVal)
}, { immediate: true })

watch(isLoading, (newVal) => {
  console.log('PBR texture async loading', newVal)
}, { immediate: true })

// eslint-enable no-console
</script>

<template>
  <TresMesh :position="[3, 1, 0]">
    <Html transform position-y="1.5">
      <span class="text-xs bg-white p-2 rounded-md">
        PBR (async) {{ isLoading ? 'Loading...' : 'Loaded' }}
      </span>
    </Html>
    <TresSphereGeometry :args="[1, 32, 32]" />
    <TresMeshPhysicalMaterial v-bind="textures" />
  </TresMesh>
</template>
