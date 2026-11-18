<script setup lang="ts">
import { useControls } from '@tresjs/leches'
import { EffectComposer, Film } from '@tresjs/post-processing/webgpu'

const uuid = inject<string>('uuid')

const { intensity } = useControls({
  intensity: { value: 0.5, min: 0, max: 1, step: 0.01 },
}, { uuid })
</script>

<template>
  <!-- The grain moves with `time`, so the canvas renders every frame. -->
  <WebgpuDemoCanvas render-mode="always">
    <EffectComposer>
      <Film :intensity="intensity" />
    </EffectComposer>
  </WebgpuDemoCanvas>
</template>
