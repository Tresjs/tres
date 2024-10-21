<!-- eslint-disable no-console -->
<script setup lang="ts">
import { useLoop } from '@tresjs/core'
import Planets from './3d/Planets.vue'
import Stars from './3d/Stars.vue'
import Particles from './3d/Particles.vue'
import Effects from './3d/Effects.vue'
import Rings from './3d/Rings.vue'
import Enemies from './3d/Enemies.vue'
import Rocks from './3d/Rocks.vue'
import Track from './3d/Track.vue'
import Explosions from './3d/Explosions.vue'
import Rig from './3d/Rig.vue'
import Ship from './3d/Ship.vue'
import { gameStore } from './GameStore'

useLoop().onBeforeRender(gameStore.actions.update)
</script>

<template>
  <TresAmbientLight :intensity="0.25" />
  <Stars :count="3000" />
  <Track />
  <Particles />
  <Suspense fallback="{null}">
    <TresGroup>
      <Rings />
      <Enemies />
      <Planets />
      <Rocks />
      <Rig>
        <Ship />
      </Rig>
      <Explosions />
      <Effects />
    </TresGroup>
  </Suspense>
</template>