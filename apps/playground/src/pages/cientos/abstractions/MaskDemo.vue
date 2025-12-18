<script setup lang="ts">
import { NoToneMapping } from 'three'
import { Mask, OrbitControls, useMask } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'

const {
  id,
  invert,
  colorWrite,
  depthWrite,
  enabled,
} = useControls({
  id: { value: 1, min: 1, max: 2, step: 1 },
  invert: false,
  colorWrite: false,
  depthWrite: false,
  enabled: true,
})

</script>

<template>
  <TresLeches />
  <TresCanvas :tone-mapping="NoToneMapping" :stencil="true" clear-color="white">
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />

    <TresGroup :position-y="1">
      <TresMesh>
        <TresRingGeometry :args="[0.9, 1, 64]" />
        <TresMeshPhongMaterial color="black" />
      </TresMesh>
      <Mask v-if="enabled" :id="2" :depth-write="depthWrite" :color-write="colorWrite">
        <TresCircleGeometry />
        <TresMeshBasicMaterial color="red" />
      </Mask>
    </TresGroup>

    <TresGroup :position-y="-1">
      <TresMesh>
        <TresRingGeometry :args="[0.9, 1, 64]" />
        <TresMeshPhongMaterial color="black" />
      </TresMesh>
      <Mask v-if="enabled" :id="1" :depth-write="depthWrite" :color-write="colorWrite">
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
