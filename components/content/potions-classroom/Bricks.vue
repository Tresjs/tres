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

const bricks = Object.values(nodes).filter(node => node.name.includes('Brick'))

const bakedMaterial = new MeshBasicMaterial({
  map: props.texture,
  side: DoubleSide,
})

bricks.forEach((brick) => {
  brick.material = bakedMaterial
})
</script>

<template>
  <primitive
    v-for="brick of bricks"
    :key="brick.uuid"
    :object="brick"
  />
</template>