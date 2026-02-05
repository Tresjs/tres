<script setup lang="ts">
import { useControls } from '@tresjs/leches'

const uuid = 'leches-basic-parent-child'
const { color, metalness, roughness, wireframe, number: numberControl, booleanDropdown } = useControls({
  wireframe: false,
  number: 1,
  booleanDropdown: true,
  color: '#ff0000',
  metalness: { 
    value: 0.5,
    min: 0,
    max: 1,
    step: 0.1,
  },
  roughness: { 
    value: 0.5,
    min: 0,
    max: 1,
    step: 0.1,
  },
}, { uuid })

watch(color, (value) => {
  console.log('color', value)
})

watch(metalness, (value) => {
  console.log('metalness', value)
})

watch(roughness, (value) => {
  console.log('roughness', value)
})
</script>

<template>
  <TresMesh>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshNormalMaterial :wireframe="wireframe" />
  </TresMesh>
</template>