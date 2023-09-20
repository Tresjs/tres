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

const books = Object.values(nodes).filter(node => node.name.includes('Book'))

const bakedMaterial = new MeshBasicMaterial({
  map: props.texture,
  side: DoubleSide,
})

books.forEach((book) => {
  book.material = bakedMaterial
})
</script>

<template>
  <primitive
    v-for="book of books"
    :object="book"
  />
</template>