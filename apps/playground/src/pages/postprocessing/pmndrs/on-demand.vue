<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { EffectComposerPmndrs, PixelationPmndrs } from '@tresjs/post-processing'
import { ref } from 'vue'
import { useControls, TresLeches } from '@tresjs/leches'

const uuid = 'on-demand-pmndrs'
const canvas = ref<InstanceType<typeof TresCanvas>>()

const renderTimes = ref(0)

useControls({
  renderTimes: {
    value: renderTimes,
    type: 'graph',
    label: 'Render Times (ms)',
    onUpdate: () => {
      renderTimes.value = 0
    },
  },
}, { uuid })

function onRender() {
  renderTimes.value = 1
}
</script>

<template>
  <TresLeches uuid="on-demand-pmndrs" />
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
