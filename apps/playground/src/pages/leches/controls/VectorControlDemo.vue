<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import { Vector3 } from 'three'

const uuid = 'leches-controls-vector'

const { position, rotation, scale } = useControls({
  position: new Vector3(0, 0, 0),
  rotation: new Vector3(0, 0, 0),
  scale: new Vector3(1, 1, 1),
}, { uuid })
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[4, 4, 4]" />
    <TresMesh
      :position="[position.x, position.y, position.z]"
      :rotation="[rotation.x, rotation.y, rotation.z]"
      :scale="[scale.x, scale.y, scale.z]"
    >
      <TresTorusKnotGeometry />
      <TresMeshStandardMaterial />
    </TresMesh>
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :position="[3, 3, 3]" :intensity="1" />
    <OrbitControls />
  </TresCanvas>
</template>
