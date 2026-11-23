<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { OrbitControls } from '@tresjs/cientos/webgpu'
import { TresLeches, useControls } from '@tresjs/leches'
import { ChromaticAberration, EffectComposer } from '@tresjs/post-processing/webgpu'
import { useBackendControl } from '@/composables/useBackendControl'
import EffectsScene from '../shared/EffectsScene.vue'

const uuid = 'postprocessing-webgpu-chromatic-aberration'
const onReady = useBackendControl(uuid)

const { enabled, strength, scale, centerX, centerY } = useControls({
  enabled: true,
  strength: { value: 1.5, min: 0, max: 5, step: 0.01 },
  scale: { value: 1.1, min: 1, max: 1.5, step: 0.001 },
  centerX: { value: 0.5, min: 0, max: 1, step: 0.01 },
  centerY: { value: 0.5, min: 0, max: 1, step: 0.01 },
}, { uuid })
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas clear-color="#0b0b12" @ready="onReady">
    <TresPerspectiveCamera :position="[0, 1.5, 6]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <EffectsScene />

    <EffectComposer>
      <ChromaticAberration v-if="enabled" :strength="strength" :scale="scale" :center="[centerX, centerY]" />
    </EffectComposer>
  </TresCanvas>
</template>
