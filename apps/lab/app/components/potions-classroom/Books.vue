<script setup lang="ts">
import type { Texture } from 'three'
import { DoubleSide, MeshBasicMaterial } from 'three'

const props = defineProps<{
  texture: Texture
}>()

const { nodes } = useGLTF(
  '/models/potions-classroom/wizard-potions-classroom.glb',
  {
    draco: true,
  },
)

const books = computed(() => Object.values(nodes.value).filter(node => node.name.includes('Book')))

const bakedMaterial = computed(() => new MeshBasicMaterial({
  map: props.texture,
  side: DoubleSide,
}))

watch([books, bakedMaterial], ([books, texture]) => {
  books.forEach(book => {
    book.material = texture
  })
})
</script>

<template>
  <primitive v-for="book in books" :key="book.id" :object="book" />
</template>