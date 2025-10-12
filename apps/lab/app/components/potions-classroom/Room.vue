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
  nodes.Room.material = texture
  nodes.Floor.material = texture
})
</script>

<template>
  <primitive v-if="nodes.Room" :object="nodes.Room" />
  <primitive v-if="nodes.Floor" :object="nodes.Floor" />
</template>
