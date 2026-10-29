<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { OrbitControls } from '@tresjs/cientos/webgpu'
import { TresLeches, useControls } from '@tresjs/leches'
import { useBackendControl } from '@/composables/useBackendControl'
import BloomEffect from './BloomEffect.vue'
import PipelineInfo from './PipelineInfo.vue'

const uuid = 'core-tsl-render-pipeline'
const onReady = useBackendControl(uuid)

const { bloomEnabled, strength, threshold, camera } = useControls({
  bloomEnabled: { value: true, label: 'bloom' },
  strength: { value: 1.2, min: 0, max: 3, step: 0.05 },
  threshold: { value: 0.1, min: 0, max: 1, step: 0.01 },
  camera: { value: 'perspective', options: ['perspective', 'orthographic'] },
}, { uuid })

const info = ref('…')
</script>

<template>
  <div class="absolute bottom-2 left-2 z-10 px-3 py-1 rounded bg-black/60 text-white text-sm font-mono" data-test="pipeline">
    {{ info }}
  </div>

  <TresLeches :uuid="uuid" />
  <TresCanvas clear-color="#050505" render-mode="on-demand" @ready="onReady">
    <TresPerspectiveCamera v-if="camera === 'perspective'" :position="[0, 2, 6]" :look-at="[0, 0, 0]" />
    <TresOrthographicCamera v-else :args="[-4, 4, 2.5, -2.5, 0.1, 100]" :position="[0, 2, 6]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <TresMesh v-for="(color, index) in ['#ff3366', '#33ddff', '#ffcc33']" :key="color" :position-x="(index - 1) * 2">
      <TresTorusKnotGeometry :args="[0.5, 0.18, 128, 32]" />
      <TresMeshBasicNodeMaterial :color="color" />
    </TresMesh>

    <BloomEffect v-if="bloomEnabled" :strength="strength" :threshold="threshold" />
    <PipelineInfo @info="info = $event" />
  </TresCanvas>
</template>
