<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { EffectComposer, Halftone } from '@tresjs/post-processing'

const gl = {
  clearColor: '#121212',
  alpha: false,
  shadows: true,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      :position="[3, 2, 4]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />
    <TresMesh :position="[1, 0.5, 1]">
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="hotpink" />
    </TresMesh>
    <TresMesh :position="[-1.5, 0.75, 0]">
      <TresConeGeometry :args="[1, 1.5, 4, 1, false, Math.PI * 0.25]" />
      <TresMeshStandardMaterial color="aqua" />
    </TresMesh>

    <TresGridHelper />
    <TresAmbientLight :intensity="0.9" />
    <TresDirectionalLight
      :position="[-10, 5, 8]"
      :intensity="2"
    />

    <EffectComposer>
      <Halftone :shape="1" :radius="4" :rotate-r="Math.PI / 12" :rotate-g="Math.PI / 3" :rotate-b="Math.PI / 6" :scatter="0" :blending="1" :greyscale="false" />
    </EffectComposer>
  </TresCanvas>
</template>
