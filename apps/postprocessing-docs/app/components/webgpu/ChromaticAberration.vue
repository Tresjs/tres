<script setup lang="ts">
import { useControls } from '@tresjs/leches'
import { ChromaticAberration, EffectComposer } from '@tresjs/post-processing/webgpu'

const uuid = inject<string>('uuid')

const { strength, scale, centerX, centerY } = useControls({
  strength: { value: 1.5, min: 0, max: 5, step: 0.01 },
  scale: { value: 1.1, min: 1, max: 1.5, step: 0.001 },
  centerX: { value: 0.5, min: 0, max: 1, step: 0.01 },
  centerY: { value: 0.5, min: 0, max: 1, step: 0.01 },
}, { uuid })
</script>

<template>
  <WebgpuDemoCanvas>
    <EffectComposer>
      <ChromaticAberration :strength="strength" :scale="scale" :center="[centerX, centerY]" />
    </EffectComposer>
  </WebgpuDemoCanvas>
</template>
