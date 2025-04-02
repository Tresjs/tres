<script setup lang="ts">
import { UseTexture } from '@tresjs/core'
import { Html } from '@tresjs/cientos'

const paths = [
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Color.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Displacement.jpg',
]
</script>

<template>
  <UseTexture v-slot="states" :path="paths">
    <TresMesh :position="[-3, 1, 0]">
      <Html transform position-y="1.5">
        <span class="text-xs bg-white p-2 rounded-md">
          Use texture component
        </span>
      </Html>
      <TresSphereGeometry :args="[1, 32, 32]" />
      <TresMeshStandardMaterial v-if="states[0].state.value && states[1].state.value" :map="states[0].state.value" :displacement-map="states[1].state.value" :displacement-scale="0.1" />
    </TresMesh>
  </UseTexture>
</template>
