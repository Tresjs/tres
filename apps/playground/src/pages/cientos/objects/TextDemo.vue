<script setup lang="ts">
import { OrbitControls, Text } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping, SRGBColorSpace } from 'three'

const gl = {
  clearColor: '#1a1a1a',
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0, 8]" />
    <OrbitControls />

    <!-- Basic label -->
    <Text
      text="Hello TresJS"
      :font-size="0.6"
      color="#ffffff"
      :position="[0, 2.5, 0]"
    />

    <!-- maxWidth wrapping -->
    <Text
      text="This is a longer paragraph of SDF text that wraps onto multiple lines thanks to maxWidth."
      :font-size="0.3"
      color="#82dbc5"
      :max-width="5"
      text-align="center"
      :position="[0, 1, 0]"
    />

    <!-- Anchoring (left-anchored) -->
    <Text
      text="Left anchored"
      :font-size="0.4"
      color="#ffcc00"
      anchor-x="left"
      :position="[-3, -0.5, 0]"
    />

    <!-- Outline -->
    <Text
      text="Outlined"
      :font-size="0.7"
      color="#ff6600"
      outline-width="8%"
      outline-color="#000000"
      :position="[0, -1.8, 0]"
    />

    <!-- Non-Latin string (unicode fallback) -->
    <Text
      text="こんにちは 你好 مرحبا"
      :font-size="0.45"
      color="#ffffff"
      :position="[0, -3, 0]"
    />

    <TresGridHelper :args="[20, 20]" :position="[0, -4, 0]" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
