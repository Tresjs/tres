<script setup lang="ts">
import type { Texture } from 'three'
import { DoubleSide, MeshBasicMaterial } from 'three'

const props = defineProps<{
  texture: Texture
}>()

const { nodes } = await useGLTF(
  '/models/potions-classroom/wizard-potions-classroom.glb',
  {
    draco: true,
  },
)

const bakedMaterial = new MeshBasicMaterial({
  map: props.texture,
  side: DoubleSide,
})

nodes.Mortar.material = bakedMaterial
</script>

<template>
  <primitive :object="nodes.Mortar" />
</template>