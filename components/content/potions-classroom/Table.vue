<script setup lang="ts">
import type { Texture } from 'three'
import { DoubleSide, MeshBasicMaterial } from 'three'

const props = defineProps<{
  texture: Texture
}>()

const { nodes } = await useGLTF('/models/potions-classroom/wizard-potions-classroom.glb', {
  draco: true,
})

const bakedMaterial = new MeshBasicMaterial({
  map: props.texture,
  side: DoubleSide,
})

nodes.Table.children.forEach((child) => {
  if (child.isMesh) {
    child.material = bakedMaterial
  }
})

const stools = Object.values(nodes).filter(node => node.name.includes('Stool'))

stools.forEach((stool) => {
  stool.material = bakedMaterial
})
</script>

<template>
  <primitive :object="nodes.Table" />
  <primitive
    v-for="stool of stools"
    :object="stool"
  />
</template>
