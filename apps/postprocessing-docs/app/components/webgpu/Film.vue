<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos/webgpu'
import { TresCanvas } from '@tresjs/core/webgpu'
import { useControls } from '@tresjs/leches'
import { EffectComposer, Film } from '@tresjs/post-processing/webgpu'

const uuid = inject<string>('uuid')

const { intensity } = useControls({
  intensity: { value: 0.5, min: 0, max: 1, step: 0.01 },
}, { uuid })
</script>

<template>
  <!-- The grain moves with `time`, so the canvas renders every frame. -->
  <TresCanvas clear-color="#0b0b12" render-mode="always">
    <TresPerspectiveCamera :position="[0, 1.5, 6]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <WebgpuEffectsScene />

    <EffectComposer>
      <Film :intensity="intensity" />
    </EffectComposer>
  </TresCanvas>
</template>
