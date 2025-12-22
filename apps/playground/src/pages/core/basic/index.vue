<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import type { ShadowMapType, ToneMapping } from 'three'
import { ACESFilmicToneMapping, AgXToneMapping, BasicShadowMap, CineonToneMapping, LinearToneMapping, NeutralToneMapping, NoToneMapping, PCFShadowMap, PCFSoftShadowMap, ReinhardToneMapping, VSMShadowMap } from 'three'
import { OrbitControls } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'

const uuid = 'core-basic-index'

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
      { text: 'VSM', value: VSMShadowMap }
    ],
  },
}, { uuid })


const formattedToneMapping = computed(() => {
  return Number(toneMapping.value) as ToneMapping
})

const formattedShadowMapType = computed(() => {
  return Number(shadowMapType.value) as ShadowMapType
})
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas
    :clear-color="clearColor"
    :clear-alpha="clearAlpha"
    :tone-mapping="formattedToneMapping"
    :shadows="shadows"
    :shadow-map-type="formattedShadowMapType"
  >
    <TresPerspectiveCamera :position="[5, 5, 5]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <TresMesh cast-shadow :position-x="2">
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="teal" :opacity="0.5" transparent />
    </TresMesh>

    <TresMesh
      :rotation-x="-Math.PI / 2"
      receive-shadow
    >
      <TresPlaneGeometry :args="[10, 10, 10, 10]" />
      <TresMeshToonMaterial />
    </TresMesh>
    <TresAxesHelper />
    <!-- Add lighting to see the edges better -->
    <TresDirectionalLight :position="[1, 1, -1]" cast-shadow :intensity="2" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
