<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { OrbitControls, StatsGl, TorusKnot } from '@tresjs/cientos/webgpu'
import { TresLeches } from '@tresjs/leches'
import { useBackendControl } from '@/composables/useBackendControl'

const uuid = 'webgpu-stats-gl'
const onReady = useBackendControl(uuid)

// `statsGl.init(renderer)` is the risky part: it must accept a WebGPURenderer.
const checks = [
  'The stats-gl panel shows in the top-left corner',
  'The FPS and CPU graphs update',
  'The GPU graph shows values (stats-gl reads WebGPU timestamp queries)',
  'No errors in the console',
]
</script>

<template>
  <TresLeches :uuid="uuid">
    <ul class="list-disc pl-4 text-xs">
      <li v-for="check in checks" :key="check">{{ check }}</li>
    </ul>
  </TresLeches>
  <TresCanvas clear-color="#1a1a1a" @ready="onReady">
    <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <StatsGl />

    <TorusKnot :args="[0.6, 0.2, 128, 32]">
      <TresMeshNormalMaterial />
    </TorusKnot>
  </TresCanvas>
</template>
