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

const skulls = Object.values(nodes).filter(node => node.name.includes('Skull'))

props.texture.flipY = false

const bakedMaterial = new MeshBasicMaterial({
  map: props.texture,
  side: DoubleSide,
})

skulls.forEach(skull => {
  skull.material = bakedMaterial
})


</script>
<template>
<primitive v-for="skull of skulls" :object="skull" />
</template>