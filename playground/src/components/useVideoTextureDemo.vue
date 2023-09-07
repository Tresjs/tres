<script setup lang="ts">
import { ref } from 'vue'
import { useVideoTexture, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { SRGBColorSpace, NoToneMapping } from 'three'
import { Sphere } from '../../../src/core'

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
