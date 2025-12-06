<script setup lang="ts">
import { CircleShadow, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'

const { color, opacity, offset } = useControls({
  color: '#000000',
  opacity: { value: 0.5, min: 0, max: 1, step: 0.1 },
  offset: { value: 0, min: 0, max: 1, step: 0.05 },
})
</script>

<template>
  <div class="aspect-video">
    <TresCanvas clear-color="#82DBC5">
      <TresPerspectiveCamera />
      <OrbitControls />
      <TresGroup :position-y="-0.5">
        <TresMesh :position-y="1">
          <TresBoxGeometry />
          <TresMeshToonMaterial color="orange" />
        </TresMesh>
        <CircleShadow :scale="1.5" :color="color" :opacity="opacity" :offset="offset" />
      </TresGroup>
      <TresAmbientLight />
      <TresDirectionalLight :position="[0, 2, 4]" />
    </TresCanvas>
  </div>
  <TresLeches :float="false" />
</template>
