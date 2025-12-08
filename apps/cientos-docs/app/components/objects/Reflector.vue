<script setup lang="ts">
import {
  MeshWobbleMaterial,
  OrbitControls,
  Reflector,
} from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'

const { color } = useControls({
  color: '#f7f7f7',
})
</script>

<template>
  <div class="aspect-video">
    <TresCanvas clear-color="#111">
      <TresPerspectiveCamera :position="[3, 2, 6]" />
      <TresMesh>
        <TresTorusGeometry />
        <MeshWobbleMaterial color="orange" :speed="1" :factor="2" />
      </TresMesh>
      <Reflector :rotation="[-Math.PI * 0.5, 0, 0]" :position="[0, -2, 0]" :color="color">
        <TresCircleGeometry :args="[10, 32]" />
      </Reflector>
      <TresAmbientLight :intensity="1" />
      <OrbitControls />
    </TresCanvas>
  </div>
  <TresLeches :float="false" />
</template>
