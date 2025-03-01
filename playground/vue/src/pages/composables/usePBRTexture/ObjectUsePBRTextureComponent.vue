<script setup lang="ts">
import { UsePBRTexture } from '@tresjs/core'
import { Html } from '@tresjs/cientos'

const pbr = {
  map: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Color.jpg',
  normalMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_NormalDX.jpg',
  roughnessMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Roughness.jpg',
  aoMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_AmbientOcclusion.jpg',
  displacementMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Displacement.jpg',
}
</script>

<template>
  <UsePBRTexture v-slot="{ data: texture }" :paths="pbr">
    <TresMesh :position="[-3, 1, 0]">
      <Html transform position-y="1.5">
        <span class="text-xs bg-white p-2 rounded-md">
          Use pbr texture component
        </span>
      </Html>
      <TresSphereGeometry :args="[1, 32, 32]" />
      <TresMeshStandardMaterial v-bind="texture" />
    </TresMesh>
  </UsePBRTexture>
</template>
