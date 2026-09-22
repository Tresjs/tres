<script setup lang="ts">
import { Environment } from '@tresjs/cientos'
import { Physics } from '@tresjs/rapier'
import { FOG_COLOR } from './constants'
</script>

<template>
  <TheLoadingScreen background="#1c1c2e" />
  <TresCanvas window-size clear-color="#111">
    <!-- only frames the loading frames: Footman re-places the camera behind him once the body spawns -->
    <TresPerspectiveCamera :position="[0, 8, 10]" :fov="45" :near="0.1" :far="1000" />
    <!-- the horizon band of the dawn HDR, so the terrain fades into the sky rather than across it -->
    <TresFog :color="FOG_COLOR" :near="0.1" :far="100" />
    <Suspense>
      <TresGroup>
        <Environment preset="dawn" background />
        <Physics>
          <WorldWalkerTerrain />
          <WorldWalkerFootman />
        </Physics>
        <WorldWalkerVegetation />
      </TresGroup>
    </Suspense>
  </TresCanvas>
</template>
