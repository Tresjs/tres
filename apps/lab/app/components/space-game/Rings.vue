<script setup lang="ts">
import { inject } from 'vue'
import type { GameStore } from './GameStore'
import { Color, DoubleSide, MeshBasicMaterial, RingGeometry } from 'three';

const geometry = new RingGeometry(1, 1.01, 64)
const material = new MeshBasicMaterial({ color: new Color('lightgreen'), side: DoubleSide })
const gameStore: GameStore = inject('gameStore') as GameStore
</script>

<template>
  <TresGroup>
    <TresMesh v-for="{ position, rotation, scale }, i of gameStore.rings" :key="i" :geometry="geometry"
      :position="position" :material="material" :rotation="rotation" :scale="scale" />
  </TresGroup>
</template>
