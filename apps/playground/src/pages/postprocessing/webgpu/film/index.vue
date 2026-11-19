<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { OrbitControls } from '@tresjs/cientos/webgpu'
import { TresLeches, useControls } from '@tresjs/leches'
import { EffectComposer, Film } from '@tresjs/post-processing/webgpu'
import { useBackendControl } from '@/composables/useBackendControl'
import EffectsScene from '../shared/EffectsScene.vue'

const uuid = 'postprocessing-webgpu-film'
const onReady = useBackendControl(uuid)

const { enabled, intensity } = useControls({
  enabled: true,
  intensity: { value: 0.5, min: 0, max: 1, step: 0.01 },
}, { uuid })
</script>

<template>
  <TresLeches :uuid="uuid" />
  <!-- The grain moves with `time`, so the canvas renders every frame. -->
  <TresCanvas clear-color="#0b0b12" render-mode="always" @ready="onReady">
    <TresPerspectiveCamera :position="[0, 1.5, 6]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <EffectsScene />

    <EffectComposer>
      <Film v-if="enabled" :intensity="intensity" />
    </EffectComposer>
  </TresCanvas>
</template>
