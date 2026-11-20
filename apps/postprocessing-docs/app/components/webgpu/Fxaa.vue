<script setup lang="ts">
import { useControls } from '@tresjs/leches'
import { EffectComposer, FXAA } from '@tresjs/post-processing/webgpu'

const uuid = inject<string>('uuid')

const { enabled } = useControls({ enabled: true }, { uuid })
</script>

<template>
  <!-- The canvas antialias is off, so the difference shows on the wireframe. -->
  <WebgpuDemoCanvas :antialias="false">
    <EffectComposer>
      <FXAA v-if="enabled" />
    </EffectComposer>
  </WebgpuDemoCanvas>
</template>
