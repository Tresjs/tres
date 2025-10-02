<script setup lang="ts">
import { NoToneMapping } from 'three'
import { Mask, OrbitControls, useMask } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresLeches />
  <TresCanvas :tone-mapping="NoToneMapping" :stencil="true" clear-color="#4f4f4f">
    <TresPerspectiveCamera />
    <OrbitControls />

    <TresGroup :scale="2">
      <TresMesh>
        <TresRingGeometry :args="[0.95, 1, 64]" />
        <TresMeshBasicMaterial color="white" />
      </TresMesh>
      <Mask>
        <TresCircleGeometry />
        <TresMeshBasicMaterial color="#fbb03b" />
      </Mask>
    </TresGroup>

    <TresMesh :position-z="-1">
      <TresBoxGeometry />
      <TresMeshNormalMaterial v-bind="useMask(1)" />
    </TresMesh>

    <TresMesh :position-z="-3">
      <TresBoxGeometry />
      <TresMeshNormalMaterial v-bind="useMask(1)" />
    </TresMesh>

    <TresMesh :position-z="-5">
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
  </TresCanvas>
</template>
