<script setup lang="ts">
import { useControls } from '@tresjs/leches'
import { Bloom, EffectComposer } from '@tresjs/post-processing/webgpu'

const uuid = inject<string>('uuid')

const { strength, radius, threshold, smoothWidth } = useControls({
  strength: { value: 1, min: 0, max: 3, step: 0.01 },
  radius: { value: 0.4, min: 0, max: 1, step: 0.01 },
  threshold: { value: 0.8, min: 0, max: 2, step: 0.01 },
  smoothWidth: { value: 0.01, min: 0, max: 1, step: 0.01 },
}, { uuid })
</script>

<template>
  <WebgpuDemoCanvas>
    <EffectComposer>
      <Bloom :strength="strength" :radius="radius" :threshold="threshold" :smooth-width="smoothWidth" />
    </EffectComposer>
  </WebgpuDemoCanvas>
</template>
