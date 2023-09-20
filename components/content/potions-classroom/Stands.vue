<script setup lang="ts">
import type { Texture } from 'three'
import { DoubleSide, MeshBasicMaterial } from 'three'

const props = defineProps<{
  texture: Texture
}>()

const { nodes } = await useGLTF('/models/potions-classroom/wizard-potions-classroom.glb', {
  draco: true,
})

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
  <TresPointLight
    :args="['#FF6619', 2, 10, 2]"
    :position="nodes.Candle"
    color="#FF6619"
    :intensity="2"
    :distance="10"
    :decay="2"
  />
</template>
