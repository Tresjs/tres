<script setup lang="ts">
import { MeshBasicMaterial } from 'three'


const { nodes } = useGLTF('/models/nuxt-stones/nuxt-stones.glb')
const stone = computed(() => nodes.value.Stone)
const stoneCarved = computed(() => nodes.value.StoneCarved)
const logo = computed(() => nodes.value.Logo)
const orbs = computed(() => nodes.value.Orbs)
const littleStones = computed(() => Object.values(nodes.value).filter(node => node.name.includes('Stone00')))

const { state: stonesTexture } = useTexture('/models/nuxt-stones/RockBaked.png')
const { state: littleStonesTexture } = useTexture('/models/nuxt-stones/LittleRocksBaked.png')

watch(stonesTexture, (texture) => {
  texture.flipY = false
})

watch(littleStonesTexture, (texture) => {
  texture.flipY = false
})

const stoneBakedMaterial = computed(() => new MeshBasicMaterial({
  map: stonesTexture.value
}))

const littleStonesBakedMaterial = computed(() => new MeshBasicMaterial({
  map: littleStonesTexture.value
}))



watch([stone, stoneCarved, stoneBakedMaterial], ([stone, stoneCarved, texture]) => {
  if (stone) {
    stone.material = texture
  }
  if (stoneCarved) {
    stoneCarved.material = texture
  }
})

watch([littleStones, littleStonesBakedMaterial], ([littleStones, texture]) => {
  littleStones.forEach(stone => {
    stone.material = texture
  })
})

watch(logo, (logo) => {
  logo.material.emissiveIntensity = 10
})


const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  if (logo.value) {
    logo.value.material.emissiveIntensity = Math.sin(elapsed) * 6 + 7
  }
})
</script>

<template>
  <primitive v-if="orbs" :object="orbs" />
  <primitive v-if="logo" :object="logo" />
  <primitive v-if="stone" :object="stone" />
  <primitive v-if="stoneCarved" :object="stoneCarved" />
  <primitive v-for="littleStone in littleStones" :key="littleStone.id" :object="littleStone" />
</template>
