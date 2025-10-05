<!-- eslint-disable no-console -->
<script setup lang="ts">
import { useLoop } from '@tresjs/core'
import { gameStore } from './GameStore'

const { onBeforeRender } = useLoop()
onBeforeRender(gameStore.actions.update)
</script>

<template>
  <TresAmbientLight :intensity="0.25" />
  <SpaceGameStars :radius="8000" :depth="8000" :count="5000" :size="15" />
  <SpaceGameTrack />
  <SpaceGameParticles />
  <SpaceGameRings />
  <SpaceGameRocks />
  <SpaceGameRig>
    <SpaceGameShip />
  </SpaceGameRig>
  <SpaceGameEnemies />
  <SpaceGameExplosions />
  <SpaceGamePlanets />
  <SpaceGameEffects />
</template>