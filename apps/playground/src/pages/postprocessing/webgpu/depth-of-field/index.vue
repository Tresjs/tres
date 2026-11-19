<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { OrbitControls } from '@tresjs/cientos/webgpu'
import { TresLeches, useControls } from '@tresjs/leches'
import { DepthOfField, EffectComposer } from '@tresjs/post-processing/webgpu'
import { useBackendControl } from '@/composables/useBackendControl'
import EffectsScene from '../shared/EffectsScene.vue'

const uuid = 'postprocessing-webgpu-depth-of-field'
const onReady = useBackendControl(uuid)

const { enabled, focusDistance, focalLength, bokehScale } = useControls({
  enabled: true,
  focusDistance: { value: 6.5, min: 0, max: 15, step: 0.1 },
  focalLength: { value: 3, min: 0.1, max: 10, step: 0.1 },
  bokehScale: { value: 4, min: 0, max: 15, step: 0.1 },
}, { uuid })
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas clear-color="#0b0b12" @ready="onReady">
    <TresPerspectiveCamera :position="[0, 1.5, 6]" :look-at="[0, 0, 0]" :near="0.1" :far="50" />
    <OrbitControls />
    <EffectsScene />

    <EffectComposer>
      <DepthOfField
        v-if="enabled"
        :focus-distance="focusDistance"
        :focal-length="focalLength"
        :bokeh-scale="bokehScale"
      />
    </EffectComposer>
  </TresCanvas>
</template>
