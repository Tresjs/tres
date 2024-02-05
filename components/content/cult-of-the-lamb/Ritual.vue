<script setup lang="ts">
import { Color, DoubleSide, MeshStandardMaterial } from 'three'

const { nodes, scene, materials } = await useGLTF('/models/cult-of-the-lamb/Ritual.glb', { draco: true })

const pentagram = nodes['Pentagram']
const pentagramTexture = await useTexture(['/models/cult-of-the-lamb/pentagram.png'])
pentagramTexture.flipY = false

pentagram.material = new MeshStandardMaterial({
  alphaMap: pentagramTexture,
  transparent: true,
  side: DoubleSide,
  emissive: 0xff0000,
  emissiveIntensity: 8,
  emissiveMap: pentagramTexture,
})

// Symbols 
const { seekAllByName } = await useSeek()

const symbols = seekAllByName(scene, 'Symbol')

const symbolsTexture = await useTexture(['/models/cult-of-the-lamb/symbols.png'])

symbolsTexture.flipY = false

const symbolsMaterial = new MeshStandardMaterial({
  alphaMap: symbolsTexture,
  transparent: true,
  side: DoubleSide,
  emissive: 0xff0000,
  emissiveIntensity: 8,
  emissiveMap: symbolsTexture,
})
symbols.forEach((symbol) => {
  symbol.material = symbolsMaterial
})

// Candles

const candles = seekAllByName(scene, 'Candle')

materials['Flame'].emissiveIntensity = 8
materials['Flame'].emissive = new Color('#C55B37')
</script>

<template>
  <primitive :object="pentagram" />
  <template v-for="symbol in symbols">
    <Levioso>
      <primitive :object="symbol" />
    </Levioso>
  </template>

  <primitive
    v-for="candle in candles"
    :object="candle"
  />
</template>
