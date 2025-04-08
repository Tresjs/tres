<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { ACESFilmicToneMapping, AgXToneMapping, BasicShadowMap, CineonToneMapping, LinearToneMapping, NeutralToneMapping, NoToneMapping, PCFShadowMap, PCFSoftShadowMap, ReinhardToneMapping, VSMShadowMap } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'
import { OrbitControls } from '@tresjs/cientos'
import '@tresjs/leches/styles'

const { clearColor, clearAlpha, alpha, toneMapping, shadows, shadowMapType } = useControls({
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

const formattedToneMapping = computed(() => {
  return Number(toneMapping.value)
})

const formattedShadowMapType = computed(() => {
  return Number(shadowMapType.value)
})

const ctxRef = ref(null)

watch(() => ctxRef.value?.context, (ctx) => {
  // eslint-disable-next-line no-console
  console.log(ctx)
  // Do something with the context
})
</script>

<template>
  <TresLeches />
  <TresCanvas
    ref="ctxRef"
    :shadows="shadows"
    :shadow-map-type="formattedShadowMapType"
    :clear-color="clearColor"
    :clear-alpha="clearAlpha"
    :tone-mapping="formattedToneMapping"
  >
    <TresPerspectiveCamera :position="[5, 5, 5]" />
    <OrbitControls />
    <TresMesh :position="[0, 1, 0]" cast-shadow>
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="teal" :opacity="0.5" transparent />
    </TresMesh>

    <TresMesh
      :rotation="[-Math.PI / 2, 0, 0]"
      receive-shadow
    >
      <TresPlaneGeometry :args="[10, 10, 10, 10]" />
      <TresMeshToonMaterial />
    </TresMesh>
    <!-- Add lighting to see the edges better -->
    <TresDirectionalLight :position="[1, 1, -1]" cast-shadow :intensity="2" />
    <TresAmbientLight :intensity="0.5" />
  </TresCanvas>
</template>
