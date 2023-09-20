<script setup lang="ts">
import { DoubleSide, MeshBasicMaterial } from 'three'

const { nodes } = await useGLTF('/models/potions-classroom/wizard-potions-classroom.glb', {
  draco: true,
})

const boneTexture = await useTexture(['/models/potions-classroom/skull.png'])

const skulls = Object.values(nodes).filter(node => node.name.includes('Skull'))

const bakedMaterial = new MeshBasicMaterial({
  map: boneTexture,
  side: DoubleSide,
})

skulls.forEach((skull) => {
  skull.material = bakedMaterial
})
</script>

<template>
  <primitive
    v-for="skull of skulls"
    :key="skull.uuid"
    :object="skull"
  />
  <TresPointLight
    :position="skulls[1].position"
    color="#2ddb4e"
    :distance="10"
    :intensity="2"
    :decay="2"
  />
</template>
