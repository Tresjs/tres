<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'
import ManualExperience from './experience.vue'
import { ACESFilmicToneMapping, AgXToneMapping, BasicShadowMap, CineonToneMapping, LinearToneMapping, NeutralToneMapping, NoToneMapping, PCFShadowMap, PCFSoftShadowMap, ReinhardToneMapping, VSMShadowMap } from 'three'

const renderingTimes = ref(0)

function onRender() {
  renderingTimes.value = 1
}

useControls({
  render: {
    value: renderingTimes,
    type: 'graph',
    onUpdate: () => {
      renderingTimes.value = 0
    },
  },
})

const { clearColor, alpha, antialias, toneMapping, shadows, shadowMapType } = useControls({
  clearColor: '#82DBC5',
  alpha: true,
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
</script>

<template>
  <TresLeches />
  <TresCanvas
    render-mode="manual"
    :shadows="shadows"
    :shadow-map-type="formattedShadowMapType"
    :clear-color="clearColor"
    :alpha="alpha"
    :antialias="antialias"
    :tone-mapping="formattedToneMapping"
    @render="onRender"
  >
    <ManualExperience />
  </TresCanvas>
</template>
