<script setup lang="ts">
import { useGLTF  } from '@tresjs/cientos';

import { DoubleSide, MeshBasicMaterial, Texture } from 'three';

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

props.texture.flipY = false

const bakedMaterial = new MeshBasicMaterial({
  map: props.texture,
  side: DoubleSide,
})

bricks.forEach(brick => {
  brick.material = bakedMaterial
})


</script>
<template>
<primitive v-for="brick of bricks" :object="brick" />
</template>