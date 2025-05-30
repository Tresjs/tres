<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { ACESFilmicToneMapping, AgXToneMapping, BasicShadowMap, CineonToneMapping, LinearToneMapping, NeutralToneMapping, NoToneMapping, OrthographicCamera, PCFShadowMap, PCFSoftShadowMap, PerspectiveCamera, ReinhardToneMapping, VSMShadowMap } from 'three'
import { OrbitControls } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const { clearColor, clearAlpha, toneMapping, shadows, shadowMapType } = useControls({
  clearColor: '#82DBC5',
  clearAlpha: {
    value: 1,
    min: 0,
    max: 1,
    step: 0.01,
    label: 'Clear Alpha',
  },
  toneMapping: {
    value: ACESFilmicToneMapping,
    options: [
      { text: 'No Tone Mapping', value: NoToneMapping },
      { text: 'Linear', value: LinearToneMapping },
      { text: 'Reinhard', value: ReinhardToneMapping },
      { text: 'Cineon', value: CineonToneMapping },
      { text: 'ACES Filmic', value: ACESFilmicToneMapping },
      { text: 'AgX', value: AgXToneMapping }, // New in Three.js r155
      { text: 'Neutral', value: NeutralToneMapping },
    ],
  },
  shadows: true,
  shadowMapType: {
    value: PCFSoftShadowMap,
    options: [
      { text: 'Basic', value: BasicShadowMap },
      { text: 'PCF', value: PCFShadowMap },
      { text: 'PCF Soft', value: PCFSoftShadowMap },
      { text: 'VSM', value: VSMShadowMap },
    ],
  },
})
</script>

<template>
  <TresLeches />
  <TresCanvas
    :clear-color="clearColor"
    :clear-alpha="clearAlpha"
    :tone-mapping="toneMapping"
    :shadows="shadows"
    :shadow-map-type="shadowMapType"
  >
    <TresPerspectiveCamera :position="[8, 8, 8]" />
    <OrbitControls />
    <TresGridHelper />
    <TresMesh position-y="1">
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
