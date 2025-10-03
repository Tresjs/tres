<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { EffectComposerPmndrs, PixelationPmndrs } from '@tresjs/post-processing'
import { ref } from 'vue'
import GraphPane from '../../components/GraphPane.vue'
import { useState } from '../../composables/state'

const { renderingTimes } = useState()

function onRender() {
  renderingTimes.value = 1
}

const canvas = ref<InstanceType<typeof TresCanvas>>()
</script>

<template>
  <GraphPane />
  <TresCanvas
    ref="canvas"
    render-mode="on-demand"
    clear-color="#c0ffee"
  >
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />
    <TresMesh
      :position="[-3.5, 1, 0]"
    >
      <TresConeGeometry :args="[1.25, 2, 4, 1, false, Math.PI * 0.25]" />
      <TresMeshNormalMaterial />
    </TresMesh>

    <TresMesh :position="[0, 1, 0]">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshNormalMaterial />
    </TresMesh>

    <TresMesh :position="[3.5, 1, 0]">
      <TresSphereGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>

    <TresGridHelper />

    <EffectComposerPmndrs @render="onRender">
      <PixelationPmndrs :granularity="10" />
    </EffectComposerPmndrs>
  </TresCanvas>
</template>
