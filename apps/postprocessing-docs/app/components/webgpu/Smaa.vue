<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos/webgpu'
import { TresCanvas } from '@tresjs/core/webgpu'
import { useControls } from '@tresjs/leches'
import { EffectComposer, SMAA } from '@tresjs/post-processing/webgpu'

const uuid = inject<string>('uuid')

const { enabled } = useControls({ enabled: true }, { uuid })
</script>

<template>
  <!-- The canvas antialias is off, so the difference shows on the wireframe. -->
  <TresCanvas clear-color="#0b0b12" :antialias="false">
    <TresPerspectiveCamera :position="[0, 1.5, 6]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <WebgpuEffectsScene />

    <EffectComposer>
      <SMAA v-if="enabled" />
    </EffectComposer>
  </TresCanvas>
</template>
