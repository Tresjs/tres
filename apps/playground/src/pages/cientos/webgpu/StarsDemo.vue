<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { OrbitControls, Stars } from '@tresjs/cientos/webgpu'
// WebGLRenderer cannot run node materials, so `renderer: webgl` shows the GLSL Stars.
import { Stars as GlslStars } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { useBackendControl } from '@/composables/useBackendControl'
import { useRendererSwitch } from '@/composables/useRendererSwitch'

const uuid = 'webgpu-stars'
const onReady = useBackendControl(uuid)
const rendererFactory = useRendererSwitch(uuid)
const StarsComponent = rendererFactory ? GlslStars : Stars

const { radius, depth, count, size, sizeAttenuation } = useControls({
  radius: { value: 100, min: 0, max: 300, step: 5 },
  depth: { value: 50, min: 0, max: 50, step: 1 },
  count: { value: 5000, min: 1000, max: 15000, step: 100 },
  size: { value: 1, min: 0, max: 10, step: 0.1 },
  sizeAttenuation: true,
}, { uuid })

const checks = [
  'A shell of white square stars around the camera, larger than 1 pixel',
  '`size` makes the stars bigger and smaller at once. At 0 they disappear',
  '`sizeAttenuation` on: near stars are bigger than far ones. Off: every star is `size` pixels wide, so try a size of 2 to 5',
  '`count`, `radius` and `depth` rebuild the shell with no errors',
  'The result matches `renderer: webgl` (the GLSL Stars): same star sizes for the same `size`',
  'No errors and no <Stars> WebGPU warning in the console',
]
</script>

<template>
  <TresLeches :uuid="uuid">
    <ul class="list-disc pl-4 text-xs">
      <li v-for="check in checks" :key="check">{{ check }}</li>
    </ul>
  </TresLeches>
  <TresCanvas :renderer="rendererFactory" clear-color="#111111" :tone-mapping="NoToneMapping" @ready="onReady">
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <OrbitControls />
    <component
      :is="StarsComponent"
      :radius="radius"
      :depth="depth"
      :count="count"
      :size="size"
      :size-attenuation="sizeAttenuation"
    />
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
