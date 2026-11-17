<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { OrbitControls } from '@tresjs/cientos/webgpu'
import { TresLeches, useControls } from '@tresjs/leches'
import { Bloom, EffectComposer } from '@tresjs/post-processing/webgpu'
import { useBackendControl } from '@/composables/useBackendControl'
import EffectsScene from '../shared/EffectsScene.vue'

const uuid = 'postprocessing-webgpu-bloom'
const onReady = useBackendControl(uuid)

const { enabled, strength, radius, threshold, smoothWidth } = useControls({
  enabled: true,
  strength: { value: 1, min: 0, max: 3, step: 0.01 },
  radius: { value: 0.4, min: 0, max: 1, step: 0.01 },
  threshold: { value: 0.8, min: 0, max: 2, step: 0.01 },
  smoothWidth: { value: 0.01, min: 0, max: 1, step: 0.01 },
}, { uuid })
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas clear-color="#0b0b12" @ready="onReady">
    <TresPerspectiveCamera :position="[0, 1.5, 6]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <EffectsScene />

    <EffectComposer>
      <Bloom v-if="enabled" :strength="strength" :radius="radius" :threshold="threshold" :smooth-width="smoothWidth" />
    </EffectComposer>
  </TresCanvas>
</template>
