<script setup lang="ts">
import { OrbitControls, Sphere, useVideoTexture } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping, SRGBColorSpace } from 'three'
import { ref } from 'vue'

const gl = {
  clearColor: '#333',
  alpha: true,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
  useLegacyLights: false,
}

const exampleVideo = 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/video-textures/useVideoTexture.mp4'

const texture = ref()

texture.value = await useVideoTexture(exampleVideo, { loop: false })
</script>

<template>
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <OrbitControls />
    <Sphere :position="[0, 2, 0]">
      <TresMeshBasicMaterial :map="texture" />
    </Sphere>
    <TresGridHelper
      :size="10"
      :divisions="10"
    />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
