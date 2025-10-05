<script setup lang="ts">
import type { MeshStandardMaterial, Texture } from 'three'
import { DoubleSide, MeshBasicMaterial } from 'three'
import { computed, watch } from 'vue'

const props = defineProps<{
  texture: Texture
}>()

// Load GLTF model without await to get reactive references
const { nodes, materials } = useGLTF('/models/potions-classroom/wizard-potions-classroom.glb', {
  draco: true,
})

// Create baked material reactively using computed
const bakedMaterial = computed(() => new MeshBasicMaterial({
  map: props.texture,
  side: DoubleSide,
}))

// Watch for changes to apply materials when GLTF loads and texture changes
watch([nodes, materials, bakedMaterial], ([nodes, materials, material]) => {
  if (nodes && materials) {
    // Apply baked material to cauldron components
    nodes.Cauldron.material = material
    nodes.Heater.material = material
    nodes.Cauldron_Stand.material = material
    nodes.Spon.material = material

    // Configure potion material with emissive properties
    const potionMaterial: MeshStandardMaterial = materials.liquid as MeshStandardMaterial
    potionMaterial.emissiveIntensity = 20
    nodes.Potion.material = materials.liquid
  }
})

// Use the correct TresJS render loop composable
const { onBeforeRender } = useLoop()

// Animate the spoon with proper typing
onBeforeRender(({ delta }: { delta: number }) => {
  if (nodes.value?.Spon) {
    nodes.value.Spon.rotation.y += delta * 0.1
    nodes.value.Spon.position.y += Math.sin(delta) * 0.002
  }
})
</script>

<template>
  <primitive v-if="nodes.Potion" :object="nodes.Potion" />
  <primitive v-if="nodes.Heater" :object="nodes.Heater" />
  <primitive v-if="nodes.Cauldron" :object="nodes.Cauldron" />
  <primitive v-if="nodes.Cauldron_Stand" :object="nodes.Cauldron_Stand" />
  <primitive v-if="nodes.Spon" :object="nodes.Spon" />
</template>
