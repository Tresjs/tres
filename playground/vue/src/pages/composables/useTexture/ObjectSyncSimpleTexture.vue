<script setup lang="ts">
/* eslint-disable no-console */
import { Html } from '@tresjs/cientos'
import { useTexture } from '@tresjs/core'

const { data: texture, isLoading, error } = useTexture('https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Color.jpg')

watch(texture, (newVal) => {
  console.log('Simple texture sync', newVal)
}, { immediate: true })

watch(isLoading, (newVal) => {
  console.log('Simple texture sync loading', newVal)
}, { immediate: true })

// eslint-enable no-console
</script>

<template>
  <TresMesh position-y="1">
    <Html transform position-y="1.5">
      <span class="text-xs bg-white p-2 rounded-md">
        Simple (sync) {{ isLoading ? 'Loading...' : 'Loaded' }}
      </span>
    </Html>
    <TresSphereGeometry :args="[1, 32, 32]" />
    <TresMeshStandardMaterial :map="texture" />
  </TresMesh>
</template>
