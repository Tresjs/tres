<script setup lang="ts">
import { ref } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { useVideoTexture, OrbitControls, Sphere } from '@tresjs/cientos'

const exampleVideo = 'https://raw.githubusercontent.com/'
  + 'Tresjs/assets/main/textures/video-textures/useVideoTexture.mp4'
const texture = ref()
texture.value = await useVideoTexture(exampleVideo, { loop: false })
</script>

<template>
  <TresCanvas clear-color="#333">
    <TresPerspectiveCamera
      :position="[0, 5, 9]"
      :look-at="[0, 1, 0]"
    />
    <OrbitControls />
    <Sphere :position="[0, 2, 0]">
      <TresMeshBasicMaterial :map="texture" />
    </Sphere>
    <TresGridHelper />
    <TresAmbientLight />
  </TresCanvas>
</template>
