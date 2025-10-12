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
  nodes.Stands.material = texture
  nodes.Stand_Individual.material = texture
})
</script>

<template>
  <primitive v-if="nodes.Stands" :object="nodes.Stands" />
  <primitive v-if="nodes.Stand_Individual" :object="nodes.Stand_Individual" />
  <primitive v-if="nodes.Candle" :object="nodes.Candle" />
  <TresPointLight v-if="nodes.Candle" :args="['#FF6619', 2, 10, 2]" :position="nodes.Candle.position" color="#FF6619"
    :intensity="2" :distance="10" :decay="2" />
</template>
