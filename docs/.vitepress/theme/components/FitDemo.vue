<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Fit, OrbitControls } from '@tresjs/cientos'
import { BoxGeometry, MeshNormalMaterial } from 'three'

const positions: number[][] = []
for (let y = 100; y <= 120; y += 10) {
  for (let x = 100; x <= 120; x += 10) {
    positions.push([x, y, 9999])
  }
}
const geom = new BoxGeometry()
const mat = new MeshNormalMaterial()
</script>

<template>
  <TresCanvas clear-color="#4F4F4F">
    <TresPerspectiveCamera :position="[1, 1, 1]" />
    <OrbitControls />
    <Fit>
      <TresMesh
        v-for="(p, i) in positions"
        :key="i"
        :position="p"
        :args="[geom, mat]"
      />
    </Fit>
    <TresGridHelper :args="[1, 1]" />
  </TresCanvas>
</template>
