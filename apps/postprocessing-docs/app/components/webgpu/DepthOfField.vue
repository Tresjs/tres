<script setup lang="ts">
import { useControls } from '@tresjs/leches'
import { DepthOfField, EffectComposer } from '@tresjs/post-processing/webgpu'

const uuid = inject<string>('uuid')

const { focusDistance, focalLength, bokehScale } = useControls({
  focusDistance: { value: 6.5, min: 0, max: 15, step: 0.1 },
  focalLength: { value: 3, min: 0.1, max: 10, step: 0.1 },
  bokehScale: { value: 4, min: 0, max: 15, step: 0.1 },
}, { uuid })
</script>

<template>
  <WebgpuDemoCanvas>
    <EffectComposer>
      <DepthOfField :focus-distance="focusDistance" :focal-length="focalLength" :bokeh-scale="bokehScale" />
    </EffectComposer>
  </WebgpuDemoCanvas>
</template>
