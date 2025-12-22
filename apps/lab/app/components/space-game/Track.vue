<script setup lang="ts">
import { inject } from 'vue'
import type { GameStore } from './GameStore'

const gameStore = inject('gameStore') as GameStore
const { scale: s, track } = gameStore.mutation
</script>

<template>
  <TresMesh :geometry="track" :scale="[s, s, s]">
    <TresMeshBasicMaterial color="indianred" />
  </TresMesh>
</template>