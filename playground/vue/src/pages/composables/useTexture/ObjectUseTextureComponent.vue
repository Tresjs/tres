<script setup lang="ts">
import { UseTexture } from '@tresjs/core'
import { Html } from '@tresjs/cientos'

const paths = [
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Color.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Displacement.jpg',
]
</script>

<template>
  <UseTexture v-slot="{ data: texture }" :path="paths">
    <TresMesh :position="[-3, 1, 0]">
      <Html transform position-y="1.5">
        <span class="text-xs bg-white p-2 rounded-md">
          Use texture component
        </span>
      </Html>
      <TresSphereGeometry :args="[1, 32, 32]" />
      <TresMeshStandardMaterial v-if="texture" :map="texture[0]" :displacement-map="texture[1]" :displacement-scale="0.1" />
    </TresMesh>
  </UseTexture>
</template>
