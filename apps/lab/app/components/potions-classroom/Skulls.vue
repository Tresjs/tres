<script setup lang="ts">
import { DoubleSide, MeshBasicMaterial } from 'three'

const { nodes } = useGLTF('/models/potions-classroom/wizard-potions-classroom.glb', {
  draco: true,
})

const { state: boneTexture, isReady: isBoneTextureReady } = useTexture('/models/potions-classroom/skull.png')

const skulls = computed(() => Object.values(nodes.value).filter(node => node.name.includes('Skull')))

const bakedMaterial = computed(() => new MeshBasicMaterial({
  map: boneTexture.value,
  side: DoubleSide,
}))

watch([skulls, bakedMaterial], ([skulls, texture]) => {
  skulls.forEach((skull) => {
    skull.material = texture
  })
})
</script>

<template>
  <template v-if="isBoneTextureReady">
    <primitive v-for="skull of skulls" :key="skull.uuid" :object="skull" />
    <TresPointLight v-if="skulls[1]" :position="skulls[1].position" color="#2ddb4e" :distance="10" :intensity="2"
      :decay="2" />
  </template>
</template>
