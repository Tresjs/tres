<script setup lang="ts">
import type { MeshStandardMaterial, Texture } from 'three'
import { DoubleSide, MeshBasicMaterial } from 'three'

const props = defineProps<{
  texture: Texture
}>()

const { nodes, materials } = await useGLTF('/models/potions-classroom/wizard-potions-classroom.glb', {
  draco: true,
})

const bakedMaterial = new MeshBasicMaterial({
  map: props.texture,
  side: DoubleSide,
})

nodes.Cauldron.material = bakedMaterial
nodes.Heater.material = bakedMaterial
nodes.Cauldron_Stand.material = bakedMaterial
nodes.Spon.material = bakedMaterial

const potionMaterial: MeshStandardMaterial = materials.liquid as MeshStandardMaterial
potionMaterial.emissiveIntensity = 20
nodes.Potion.material = materials.liquid

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  nodes.Spon.rotation.y += delta * 0.1
  nodes.Spon.position.y += Math.sin(delta) * 0.002
})
</script>

<template>
  <primitive :object="nodes.Potion" />
  <primitive :object="nodes.Heater" />
  <primitive :object="nodes.Cauldron" />
  <primitive :object="nodes.Cauldron_Stand" />
  <primitive :object="nodes.Spon" />
</template>
