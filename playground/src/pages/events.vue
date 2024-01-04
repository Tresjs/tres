<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'

function handleClick(event) {
  console.log(event)
}
</script>

<template>
  <TresCanvas window-size clearColor="#82DBC5">
    <TresPerspectiveCamera :position="[5, 5, 5]" :look-at="[0,0,0]" />
    <TresGroup>
      <TresMesh :position="[0, 0.5, 0]" @click="handleClick">
        <TresBoxGeometry />
        <TresMeshBasicMaterial color="teal" />
      </TresMesh>
      <TresMesh :position="[2, 0.5, 0]" @click="handleClick">
        <TresSphereGeometry />
        <TresMeshBasicMaterial color="yellow" />
      </TresMesh>
    </TresGroup>
    <TresAmbientLight />
    <TresGridHelper />
  </TresCanvas>
</template>

