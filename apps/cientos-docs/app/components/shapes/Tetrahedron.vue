<script setup lang="ts">
import { OrbitControls, Tetrahedron } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'

const { radius, detail, showWireframe } = useControls({
  radius: { value: 1, min: 0.1, max: 5, step: 0.1 },
  detail: { value: 8, min: 0, max: 16, step: 1 },
  showWireframe: false,
})
</script>

<template>
  <div class="aspect-video">
    <TresCanvas clear-color="#82DBC5">
      <TresPerspectiveCamera :position="[3, 3, 3]" />
      <OrbitControls />
      <Tetrahedron :args="[radius, detail]">
        <TresMeshToonMaterial color="orange" :wireframe="showWireframe" />
      </Tetrahedron>
      <TresAmbientLight />
      <TresDirectionalLight :position="[0, 2, 4]" />
      <TresGridHelper :position-y="-0.5" />
    </TresCanvas>
  </div>
  <TresLeches :float="false" />
</template>
