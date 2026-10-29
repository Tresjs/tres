<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { OrbitControls } from '@tresjs/cientos/webgpu'
import { TresLeches } from '@tresjs/leches'
import { useBackendControl } from '@/composables/useBackendControl'
import SharedWave from './SharedWave.vue'
import WavyMesh from './WavyMesh.vue'

const uuid = 'core-tsl-uniforms'
const onReady = useBackendControl(uuid)
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas clear-color="#1a1a1a" render-mode="on-demand" @ready="onReady">
    <TresPerspectiveCamera :position="[0, 2, 7]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <!-- Registers the uniforms and the shared node first, so the meshes can read them in setup -->
    <SharedWave :uuid="uuid" />
    <WavyMesh v-for="x in [-2.2, 0, 2.2]" :key="x" :x="x" />

    <TresAmbientLight :intensity="0.6" />
    <TresDirectionalLight :position="[3, 5, 2]" :intensity="2" />
  </TresCanvas>
</template>
