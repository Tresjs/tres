<script setup lang="ts">
import { CircleShadow, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'

const uuid = 'staging-circle-shadow'

const { colorRed, opacity, offset, fog, depthWrite, enabled } = useControls({
  colorRed: true,
  opacity: { value: 0.5, min: 0.0, max: 1.0 },
  offset: { value: 0.5, min: 0.0, max: 1.0 },
  fog: false,
  depthWrite: false,
  enabled: true,
}, { uuid })
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera />
    <OrbitControls />
    <TresGroup>
      <TresMesh :position-y="1">
        <TresBoxGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>
      <CircleShadow
        v-if="enabled"
        :scale="1.5"
        :color="colorRed ? 'red' : 'black'"
        :offset="offset"
        :opacity="opacity"
        :fog="fog"
        :depth-write="depthWrite"
      />
    </TresGroup>
  </TresCanvas>
</template>
