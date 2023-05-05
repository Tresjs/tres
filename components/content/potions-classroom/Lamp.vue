<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
import { DoubleSide, MeshBasicMaterial, Texture } from 'three'

const props = defineProps<{
  texture: Texture
}>()

const { nodes } = await useGLTF('/models/potions-classroom/wizard-potions-classroom.glb', {
  draco: true,
})

console.log(nodes)

props.texture.flipY = false

const bakedMaterial = new MeshBasicMaterial({
  map: props.texture,
  side: DoubleSide,
})

nodes.Lamp.traverse(child => {
  if (child.isMesh) {
    child.material = bakedMaterial
  }
})
</script>
<template>
  <primitive :object="nodes.Lamp" />
  <primitive :object="nodes.Bulb" />
  <primitive :object="nodes.Bulb001" />
</template>
