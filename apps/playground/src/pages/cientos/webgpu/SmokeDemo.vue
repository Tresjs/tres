<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { Box, OrbitControls, Smoke } from '@tresjs/cientos/webgpu'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { useBackendControl } from '@/composables/useBackendControl'

const uuid = 'webgpu-smoke'
const onReady = useBackendControl(uuid)

const { segments, opacity, speed, color } = useControls({
  segments: { value: 5, min: 1, max: 20, step: 1 },
  opacity: { value: 0.5, min: 0, max: 1, step: 0.1 },
  speed: { value: 0.4, min: 0, max: 1, step: 0.1 },
  color: { type: 'color', value: '#f7f7f7' },
}, { uuid })

// Smoke reads `renderer.outputColorSpace` and uses a transparent standard material.
const checks = [
  'Soft smoke puffs show around the wireframe box and turn slowly',
  'The color control changes the smoke color',
  'The smoke edges blend, with no black squares around the puffs',
  'No errors in the console',
]
</script>

<template>
  <TresLeches :uuid="uuid">
    <ul class="list-disc pl-4 text-xs">
      <li v-for="check in checks" :key="check">{{ check }}</li>
    </ul>
  </TresLeches>
  <TresCanvas clear-color="#333" :tone-mapping="NoToneMapping" @ready="onReady">
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <OrbitControls />
    <Suspense>
      <Smoke
        :segments="segments"
        :opacity="opacity"
        :speed="speed"
        :color="color"
      />
    </Suspense>
    <Box :args="[2, 2]">
      <TresMeshToonMaterial color="#82DBC5" wireframe />
    </Box>
    <TresGridHelper :args="[10, 10]" />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :intensity="1" :position="[2, 2, 2]" />
  </TresCanvas>
</template>
