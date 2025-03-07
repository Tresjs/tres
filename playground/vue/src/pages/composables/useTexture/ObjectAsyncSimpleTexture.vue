<script setup lang="ts">
/* eslint-disable no-console */
import { Html } from '@tresjs/cientos'
import { useTexture } from '@tresjs/core'

const { data: texture } = await useTexture('https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Color.jpg')

watch(texture, (newVal) => {
  console.log('Simple texture async', newVal)
}, { immediate: true })

// eslint-enable no-console
</script>

<template>
  <TresMesh :position="[6, 1, 0]">
    <Html transform position-y="1.5">
      <span class="text-xs bg-white p-2 rounded-md">
        Simple (async)
      </span>
    </Html>
    <TresSphereGeometry :args="[1, 32, 32]" />
    <TresMeshStandardMaterial :map="texture" />
  </TresMesh>
</template>
