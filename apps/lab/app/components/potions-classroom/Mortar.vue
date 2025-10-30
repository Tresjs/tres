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

const bakedMaterial = computed(() => new MeshBasicMaterial({
  map: props.texture,
  side: DoubleSide,
}))

watch([nodes, bakedMaterial], ([nodes, texture]) => {
  nodes.Mortar.material = texture
})
</script>

<template>
  <primitive v-if="nodes.Mortar" :object="nodes.Mortar" />
</template>