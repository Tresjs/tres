<script setup lang="ts">
import { Mask, OrbitControls, useMask } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'

const { colorWrite } = useControls({
  colorWrite: true,
})
</script>

<template>
  <div class="aspect-16/9">
    <TresCanvas :stencil="true" clear-color="#4f4f4f">
      <TresPerspectiveCamera />
      <OrbitControls />

      <TresGroup :scale="2">
        <TresMesh>
          <TresRingGeometry :args="[0.95, 1, 64]" />
          <TresMeshBasicMaterial color="white" />
        </TresMesh>
        <Mask :id="1" :color-write="colorWrite">
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
  </div>
  <TresLeches :float="false" />
</template>
