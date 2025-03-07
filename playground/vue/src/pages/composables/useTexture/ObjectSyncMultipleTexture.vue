<script setup lang="ts">
/* eslint-disable no-console */
import { Html } from '@tresjs/cientos'
import { useTexture } from '@tresjs/core'

const { data: texture, isLoading, error } = useTexture([
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Color.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Displacement.jpg',
])

watch(texture, (newVal) => {
  console.log('Multiple texture sync', newVal)
}, { immediate: true })

watch(isLoading, (newVal) => {
  console.log('Multiple texture isLoading', newVal)
}, { immediate: true })

watch(error, (newVal) => {
  console.log('Multiple texture error', newVal)
}, { immediate: true })

// eslint-enable no-console
</script>

<template>
  <TresMesh :position="[3, 1, 0]">
    <Html transform position-y="1.5">
      <span class="text-xs bg-white p-2 rounded-md">
        Multiple (sync) {{ isLoading ? 'loading...' : 'loaded' }}
      </span>
    </Html>
    <TresSphereGeometry :args="[1, 32, 32]" />
    <TresMeshStandardMaterial v-if="texture" :map="texture[0]" :displacement-map="texture[1]" :displacement-scale="0.1" />
  </TresMesh>
</template>
