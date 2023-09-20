<script setup lang="ts">
const { nodes } = await useGLTF(
  '/models/potions-classroom/wizard-potions-classroom.glb',
  {
    draco: true,
  },
)

const bottles = Object.values(nodes).filter(node => node.name.includes('Bottle'))
</script>

<template>
  <primitive
    v-for="(bottle, $index) of bottles"
    :key="$index"
    :object="bottle"
  />
</template>