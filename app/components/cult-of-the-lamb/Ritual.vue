<script setup lang="ts">
import type { TresObject } from '@tresjs/core'
import type { MeshStandardMaterial } from 'three';
import { Color } from 'three'

const { nodes, materials } = useGLTF('/models/cult-of-the-lamb/Ritual.glb', { draco: true })

const pentagram = computed(() => nodes.value?.['Pentagram'])


// Symbols 
const symbols = computed(() => {
  if (!nodes.value) return []
  return Object.entries(nodes.value)
    .filter(([key]) => key.includes('Symbol'))
    .map(([_, node]) => node)
})

watch(symbols, (value) => {
  value.forEach((symbol: TresObject) => {
    symbol.material.emissive = new Color('#ff0000')
    symbol.material.emissiveIntensity = 8
    symbol.material.emissiveMap = symbol.material.map
  })
})

// Candles
watch(materials, (value) => {
  const flame = value['Flame'] as MeshStandardMaterial
  flame.emissiveIntensity = 8
  flame.emissive = new Color('#C55B37')
})

const candles = computed(() => {
  if (!nodes.value) return []
  return Object.entries(nodes.value)
    .filter(([key]) => key.includes('Candle'))
    .map(([_, node]) => node)
})

</script>

<template>
  <TresGroup>
    <primitive v-if="pentagram" :object="pentagram" />
    <template v-for="(symbol, index) in symbols" :key="index">
      <Levioso>
        <primitive v-if="symbol" :object="symbol" />
      </Levioso>
    </template>
    <template v-for="(candle, index) in candles" :key="index">
      <primitive v-if="candle" :object="candle" />
    </template>
  </TresGroup>
</template>
