<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { Mask, OrbitControls, useMask } from '@tresjs/cientos/webgpu'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { useBackendControl } from '@/composables/useBackendControl'

const uuid = 'webgpu-mask'
const onReady = useBackendControl(uuid)

const { id, invert } = useControls({
  id: { value: 1, min: 1, max: 2, step: 1 },
  invert: false,
}, { uuid })

// Mask writes the stencil buffer, so the canvas needs `stencil`.
const checks = [
  'The normal-colored box shows only inside the top or bottom circle (`id` picks which)',
  '`invert` shows the box everywhere except inside that circle',
  'The box behind (no mask) always shows in full',
  'No errors in the console',
]
</script>

<template>
  <TresLeches :uuid="uuid">
    <ul class="list-disc pl-4 text-xs">
      <li v-for="check in checks" :key="check">{{ check }}</li>
    </ul>
  </TresLeches>
  <TresCanvas :tone-mapping="NoToneMapping" :stencil="true" clear-color="white" @ready="onReady">
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />

    <TresGroup :position-y="1">
      <TresMesh>
        <TresRingGeometry :args="[0.9, 1, 64]" />
        <TresMeshBasicMaterial color="black" />
      </TresMesh>
      <Mask :id="2">
        <TresCircleGeometry />
        <TresMeshBasicMaterial color="red" />
      </Mask>
    </TresGroup>

    <TresGroup :position-y="-1">
      <TresMesh>
        <TresRingGeometry :args="[0.9, 1, 64]" />
        <TresMeshBasicMaterial color="black" />
      </TresMesh>
      <Mask :id="1">
        <TresCircleGeometry />
        <TresMeshBasicMaterial color="blue" />
      </Mask>
    </TresGroup>

    <TresMesh :scale="1.5">
      <TresBoxGeometry />
      <TresMeshNormalMaterial v-bind="useMask(id, invert)" />
    </TresMesh>

    <TresMesh :position="[0, 0, -3]">
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
  </TresCanvas>
</template>
