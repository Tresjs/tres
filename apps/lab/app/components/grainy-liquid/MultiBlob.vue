<script setup lang="ts">
import Blob from './Blob.vue'

interface BlobConfig {
  position: [number, number, number]
  scale: [number, number, number]
  colorA: string
  colorB: string
  colorC: string
  speed: number
  amplitude: number
}

const blobs: BlobConfig[] = [
  {
    position: [-4, 2, 0],
    scale: [1.8, 1.8, 1.8],
    colorA: '#6366f1',
    colorB: '#8b5cf6',
    colorC: '#ddd6fe',
    speed: 0.6,
    amplitude: 0.15
  },
  {
    position: [4, -2, -1],
    scale: [1.5, 1.5, 1.5],
    colorA: '#ec4899',
    colorB: '#f472b6',
    colorC: '#fce7f3',
    speed: 0.8,
    amplitude: 0.12
  },
  {
    position: [0, 0, -4],
    scale: [2.2, 2.2, 2.2],
    colorA: '#f8fafc',
    colorB: '#e2e8f0',
    colorC: '#cbd5e1',
    speed: 0.4,
    amplitude: 0.8
  }
]
</script>

<template>
  <TresGroup>
    <TresGroup 
      v-for="(blob, index) in blobs" 
      :key="index"
      :position="blob.position"
      :scale="blob.scale"
    >
      <Blob 
        :color-a="blob.colorA"
        :color-b="blob.colorB" 
        :color-c="blob.colorC"
        :speed="blob.speed"
        :amplitude="blob.amplitude"
      />
    </TresGroup>
  </TresGroup>
</template>