<script setup lang="ts">
import { Html } from '@tresjs/cientos'
import { useTexture } from '@tresjs/core'
import { ref } from 'vue'

const texturePath = ref([
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Color.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Displacement.jpg',
])
const [texture, displacement] = useTexture(texturePath)

const { state: textureState, isLoading: textureIsLoading } = texture
const { state: displacementState, isLoading: displacementIsLoading } = displacement

const isLoading = computed(() => textureIsLoading.value || displacementIsLoading.value)

// Change the texture path after 2 seconds
setTimeout(() => {
  texturePath.value = [
    'https://raw.githubusercontent.com/Tresjs/assets/main/textures/hexagonal-rock/Rocks_Hexagons_002_basecolor.jpg',
    'https://raw.githubusercontent.com/Tresjs/assets/main/textures/hexagonal-rock/Rocks_Hexagons_002_normal.jpg',
  ]
}, 2000)

// eslint-enable no-console
</script>

<template>
  <TresMesh :position="[4, 1, 0]">
    <Html transform position-y="1.5">
      <span class="text-xs bg-white p-2 rounded-md">
        Multiple {{ isLoading ? 'Loading...' : 'Loaded' }}
      </span>
    </Html>
    <TresSphereGeometry :args="[1, 32, 32]" />
    <TresMeshStandardMaterial v-if="!isLoading" :map="textureState" :displacement-map="displacementState" :displacement-scale="0.1" />
  </TresMesh>
</template>
