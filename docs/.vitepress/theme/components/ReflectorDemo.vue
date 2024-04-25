<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import {
  MeshWobbleMaterial,
  OrbitControls,
  Reflector,
  Stars,
} from '@tresjs/cientos'
</script>

<template>
  <TresCanvas clear-color="#111">
    <TresPerspectiveCamera
      :position="[3, 2, 6]"
      :look-at="[0, 0, 0]"
    />
    <Stars />
    <TresMesh>
      <TresTorusGeometry />
      <MeshWobbleMaterial
        color="orange"
        :speed="1"
        :factor="2"
      />
    </TresMesh>
    <Reflector
      :rotation="[-Math.PI * 0.5, 0, 0]"
      :position="[0, -2, 0]"
      color="#f7f7f7"
    >
      <TresCircleGeometry :args="[10, 32]" />
    </Reflector>
    <TresAmbientLight :intensity="1" />
    <OrbitControls />
  </TresCanvas>
</template>
