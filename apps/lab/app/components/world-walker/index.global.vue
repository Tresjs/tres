<script setup lang="ts">
import { Environment } from '@tresjs/cientos'
import { Physics } from '@tresjs/rapier'
</script>

<template>
  <TresCanvas window-size clear-color="#111">
    <TresPerspectiveCamera :position="[0, 8, 10]" :fov="45" :near="0.1" :far="1000" />
    <TresFog color="#626A71" :near="0.1" :far="100" />
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
