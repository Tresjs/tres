<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { OrbitControls } from '@tresjs/cientos/webgpu'
import { TresLeches, useControls } from '@tresjs/leches'
import { useBackendControl } from '@/composables/useBackendControl'
import PatternFog from './PatternFog.vue'
import PatternPlane from './PatternPlane.vue'

const uuid = 'core-tsl-local-nodes'
const onReady = useBackendControl(uuid)

const { pattern, layers, tint, frequency, fogEnabled, fogColor } = useControls({
  pattern: { value: 'stripes', options: ['stripes', 'rings'] },
  layers: { value: 3, min: 1, max: 6, step: 1 },
  tint: { type: 'color', value: '#fbb03b' },
  frequency: { value: 20, min: 2, max: 60, step: 1 },
  fogEnabled: { value: true, label: 'fog' },
  fogColor: { type: 'color', value: '#1a1a2e' },
}, { uuid })

const builds = ref(0)
</script>

<template>
  <div class="absolute bottom-2 left-2 z-10 px-3 py-1 rounded bg-black/60 text-white text-sm font-mono">
    graph builds: <span data-test="builds">{{ builds }}</span>
  </div>

  <TresLeches :uuid="uuid" />
  <TresCanvas clear-color="#1a1a1a" @ready="onReady">
    <TresPerspectiveCamera :position="[0, 3, 6]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <PatternPlane
      :pattern="pattern"
      :layers="layers"
      :tint="tint"
      :frequency="frequency"
      @build="builds = $event"
    />
    <PatternFog v-if="fogEnabled" :color="fogColor" />
  </TresCanvas>
</template>
