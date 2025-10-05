<script setup lang="ts">
import type { Mesh, Texture } from 'three'
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
  nodes.Lamp.traverse((child: Mesh) => {
    if (child.isMesh) {
      child.material = texture
    }
  })
})

</script>

<template>
  <primitive v-if="nodes.Lamp" :object="nodes.Lamp" />
  <primitive v-if="nodes.Bulb" :object="nodes.Bulb" />
  <primitive v-if="nodes.Bulb001" :object="nodes.Bulb001" />
</template>
