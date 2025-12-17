<script setup lang="ts">
import { CircleShadow, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const c = useControls({
  colorRed: true,
  opacity: { value: 0.5, min: 0.0, max: 1.0 },
  offset: { value: 0.5, min: 0.0, max: 1.0 },
  fog: false,
  depthWrite: false,
  enabled: true,
})
</script>

<template>
  <TresLeches />
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera />
    <OrbitControls />
    <TresGroup>
      <TresMesh :position-y="1">
        <TresBoxGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>
      <CircleShadow
        v-if="c.enabled.value.value"
        :scale="1.5"
        :color="c.colorRed.value.value ? 'red' : 'black'"
        :offset="c.offset.value.value"
        :opacity="c.opacity.value.value"
        :fog="c.fog.value.value"
        :depth-write="c.depthWrite.value.value"
      />
    </TresGroup>
  </TresCanvas>
</template>
