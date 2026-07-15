<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { EffectComposer, SMAA } from '@tresjs/post-processing'

const gl = {
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
      <TresMeshNormalMaterial wireframe />
    </TresMesh>
    <TresMesh :position="[-1.5, 0.75, 0]">
      <TresConeGeometry :args="[1, 1.5, 4, 1, false, Math.PI * 0.25]" />
      <TresMeshNormalMaterial wireframe />
    </TresMesh>

    <TresGridHelper />
    <TresAmbientLight :intensity="0.9" />
    <TresDirectionalLight
      :position="[-10, 5, 8]"
      :intensity="1"
    />

    <EffectComposer>
      <SMAA />
    </EffectComposer>
  </TresCanvas>
</template>
