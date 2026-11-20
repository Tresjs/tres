<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { OrbitControls } from '@tresjs/cientos/webgpu'
import { TresLeches, useControls } from '@tresjs/leches'
import { EffectComposer, FXAA, SMAA } from '@tresjs/post-processing/webgpu'
import { useBackendControl } from '@/composables/useBackendControl'
import EffectsScene from '../shared/EffectsScene.vue'

const uuid = 'postprocessing-webgpu-antialiasing'
const onReady = useBackendControl(uuid)

const { antialias } = useControls({
  antialias: { value: 'smaa', options: ['none', 'fxaa', 'smaa'] },
}, { uuid })
</script>

<template>
  <TresLeches :uuid="uuid" />
  <!-- The canvas antialias is off, so the FXAA / SMAA difference shows on the wireframe. -->
  <TresCanvas clear-color="#0b0b12" :antialias="false" @ready="onReady">
    <TresPerspectiveCamera :position="[0, 1.5, 6]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <EffectsScene />

    <EffectComposer>
      <FXAA v-if="antialias === 'fxaa'" />
      <SMAA v-else-if="antialias === 'smaa'" />
    </EffectComposer>
  </TresCanvas>
</template>
