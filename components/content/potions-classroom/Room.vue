<script setup lang="ts">
import { DoubleSide, MeshBasicMaterial, Texture } from 'three'

const props = defineProps<{
  texture: Texture
}>()

const { nodes } = await useGLTF('/models/potions-classroom/wizard-potions-classroom.glb', {
  draco: true,
})

props.texture.flipY = false

const bakedMaterial = new MeshBasicMaterial({
  map: props.texture,
  side: DoubleSide,
})

nodes.Room.material = bakedMaterial
nodes.Floor.material = bakedMaterial
</script>
<template>
  <primitive :object="nodes.Room" />
  <primitive :object="nodes.Floor" />
</template>
