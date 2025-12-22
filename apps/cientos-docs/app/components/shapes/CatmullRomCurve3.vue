<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { CatmullRomCurve3, OrbitControls } from '@tresjs/cientos'
import { Vector3 } from 'three'
</script>

<template>
  <div class="aspect-video">
    <TresCanvas clear-color="#82DBC5">
      <TresPerspectiveCamera :position="[3, 3, 3]" />
      <OrbitControls />
      <CatmullRomCurve3
        :points="[new Vector3(-1, 0, 0), new Vector3(0, 1, 0), new Vector3(1, 0, 0)]"
        :segments="50"
        color="orange"
        :line-width="6"
      />
      <TresGridHelper :position-y="-0.5" />
      <TresAmbientLight />
    </TresCanvas>
  </div>
</template>
