<script setup lang="ts">
import { Vector3 } from 'three'
import { TresCanvas } from '@tresjs/core'
import { CatmullRomCurve3, OrbitControls } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas v-bind="{ clearColor: '#4f4f4f' }">
    <CatmullRomCurve3
      :points="[[-1.5, 0, 0], new Vector3(-0.5, 1, 0), [0.5, 0, 0], [1.5, 1, 0]]"
      :segments="40"
      :line-width="10"
      color="#fbb03b"
    />
    <TresGridHelper />
    <OrbitControls />
  </TresCanvas>
</template>
