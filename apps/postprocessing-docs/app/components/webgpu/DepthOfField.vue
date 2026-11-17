<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos/webgpu'
import { TresCanvas } from '@tresjs/core/webgpu'
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
  <TresCanvas clear-color="#0b0b12">
    <TresPerspectiveCamera :position="[0, 1.5, 6]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <WebgpuEffectsScene />

    <EffectComposer>
      <DepthOfField :focus-distance="focusDistance" :focal-length="focalLength" :bokeh-scale="bokehScale" />
    </EffectComposer>
  </TresCanvas>
</template>
