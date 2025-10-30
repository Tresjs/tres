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
  nodes.Window_Grid.material = texture
})
</script>

<template>
  <primitive v-if="nodes.Window_Glass" :object="nodes.Window_Glass" />
  <primitive v-if="nodes.Window_Grid" :object="nodes.Window_Grid" />
</template>