<script setup lang="ts">import { DoubleSide, MeshBasicMaterial, Texture } from 'three'

const props = defineProps<{
  texture: Texture
}>()

const { nodes } = await useGLTF('/models/potions-classroom/wizard-potions-classroom.glb', {
  draco: true,
})

props.texture.flipY = false

const bakedMaterial = new MeshBasicMaterial({
  map: props.texture,
  side: DoubleSide,
})

nodes.Stands.material = bakedMaterial
nodes.Stand_Individual.material = bakedMaterial
</script>
<template>
  <primitive :object="nodes.Stands" />
  <primitive :object="nodes.Stand_Individual" />
  <primitive :object="nodes.Candle" />
  <TresPointLight :position="nodes.Candle" color="#FF6619" :intensity="2" :distance="10" :decay="2" />
</template>
