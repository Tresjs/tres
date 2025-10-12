<script setup lang="ts">
import type { Texture } from 'three'
import { DoubleSide, MeshBasicMaterial } from 'three'
import { computed, watch } from 'vue'

const props = defineProps<{
  texture: Texture
}>()

// Load GLTF model without await to get reactive reference
const { nodes } = useGLTF(
  '/models/potions-classroom/wizard-potions-classroom.glb',
  {
    draco: true,
  },
)

// Filter brick nodes reactively using computed
const bricks = computed(() => Object.values(nodes.value).filter(node => node.name.includes('Brick')))

// Create baked material reactively using computed
const bakedMaterial = computed(() => new MeshBasicMaterial({
  map: props.texture,
  side: DoubleSide,
}))

// Watch for changes in bricks and material to apply materials
watch([bricks, bakedMaterial], ([bricks, material]) => {
  bricks.forEach((brick) => {
    brick.material = material
  })
})
</script>

<template>
  <primitive v-for="brick of bricks" :key="brick.uuid" :object="brick" />
</template>