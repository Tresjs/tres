<script setup lang="ts">
import type { Texture } from 'three'
import { DoubleSide, MeshBasicMaterial } from 'three'

const props = defineProps<{
  texture: Texture
}>()

const { nodes } = useGLTF('/models/potions-classroom/wizard-potions-classroom.glb', {
  draco: true,
})

const bakedMaterial = computed(() => new MeshBasicMaterial({
  map: props.texture,
  side: DoubleSide,
}))

watch([nodes, bakedMaterial], ([nodes, texture]) => {
  nodes.Table.children.forEach((child) => {
    if (child.isMesh) {
      child.material = texture
    }
  })
})

const stools = computed(() => Object.values(nodes.value).filter(node => node.name.includes('Stool')))

watch([stools, bakedMaterial], ([stools, texture]) => {
  stools.forEach((stool) => {
    stool.material = texture
  })
})
</script>

<template>
  <primitive v-if="nodes.Table" :object="nodes.Table" />
  <primitive v-for="stool of stools" :key="stool.id" :object="stool" />
</template>
