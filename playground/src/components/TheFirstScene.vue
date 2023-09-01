<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Vector3 } from 'three'
</script>

<template>
  <TresCanvas
    ref="context"
    clear-color="#82DBC5"
    window-size
  >
    <TresPerspectiveCamera />
    <TresMesh
      :position="[1, 2, 3]"
      :scale="new Vector3(2, 2, 2)"
      :rotation="{ x: 1, y: 1, z: 1 }"
    >
      <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
      <TresMeshBasicMaterial color="orange" />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
