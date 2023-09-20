<script setup lang="ts">
import type { Texture } from 'three'
import { MeshBasicMaterial } from 'three'

const { nodes, materials } = await useGLTF('/models/nuxt-stones/nuxt-stones.glb')
const stonesTexture = await useTexture(['/models/nuxt-stones/RockBaked.png'])
const littleStonesTexture = await useTexture(['/models/nuxt-stones/LittleRocksBaked.png'])

stonesTexture.flipY = false
littleStonesTexture.flipY = false

const stoneBakedMaterial = new MeshBasicMaterial({
  map: stonesTexture as Texture,
})

const LittleStonesBakedMaterial = new MeshBasicMaterial({
  map: littleStonesTexture as Texture,
})

nodes.Stone.material = stoneBakedMaterial
nodes.StoneCarved.material = stoneBakedMaterial

nodes.Logo.material.emissiveIntensity = 10

const littleStones = Object.values(nodes).filter(node => node.name.includes('Stone00'))

littleStones.forEach((stone) => {
  stone.material = LittleStonesBakedMaterial
})

const { onLoop } = useRenderLoop()

onLoop(({ elapsed }) => {
  nodes.Logo.material.emissiveIntensity = Math.sin(elapsed) * 6 + 7
})
</script>

<template>
  <primitive :object="nodes.Orbs" />
  <primitive :object="nodes.Logo" />
  <primitive :object="nodes.Stone" />
  <primitive :object="nodes.StoneCarved" />
  <primitive
    v-for="stone in littleStones"
    :key="stone.id"
    :object="stone"
  />
</template>
