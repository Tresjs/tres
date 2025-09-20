<script setup lang="ts">
import { MeshBasicMaterial } from 'three'

const { state, nodes } = useGLTF('/models/nuxt-stones/nuxt-stones.glb')

watch(state, (state) => {
  console.log(state)
})

const stone = computed(() => nodes.value.Stone)
const stoneCarved = computed(() => nodes.value.StoneCarved)
const logo = computed(() => nodes.value.Logo)
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
  map: stonesTexture.value,
}))

const littleStonesBakedMaterial = computed(() => new MeshBasicMaterial({
  map: littleStonesTexture.value,
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
  littleStones.forEach((stone) => {
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
  <TresGroup rotation-y="1.57">
    <primitive
      v-if="state"
      :object="state.scene"
    />
  </TresGroup>
</template>
