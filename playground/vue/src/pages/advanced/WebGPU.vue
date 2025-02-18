<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { WebGPURenderer } from 'three/webgpu'
</script>

<template>
  <TresCanvas :renderer="async (ctx) => { const r = new WebGPURenderer({ canvas: ctx.canvas.value }); r.setSize(200, 200); await r.init(); return r }">
    <TresPerspectiveCamera
      :position="[3, 3, 3]"
      :look-at="[0, 0, 0]"
    />
    <TresGroup>
      <TresMesh :position="[0, 0, 0]">
        <TresBoxGeometry />
        <TresMeshToonMaterial :color="0x00FF00" />
      </TresMesh>
    </TresGroup>

    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
