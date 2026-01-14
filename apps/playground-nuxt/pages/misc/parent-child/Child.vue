<script setup lang="ts">
import { useControls } from '@tresjs/leches'

const uuid = 'leches-basic-parent-child'
const { wireframe, number, booleanDropdown } = useControls({
  wireframe: false,
  number: 1,
  booleanDropdown: true,
}, { uuid })
</script>

<template>
  <TresMesh>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshNormalMaterial :wireframe="wireframe" />
  </TresMesh>
</template>