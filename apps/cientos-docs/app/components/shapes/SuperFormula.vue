<script setup lang="ts">
import { OrbitControls, Superformula } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'

const { numArmsA, numArmsB, expA1 } = useControls({
  numArmsA: { value: 1, min: 1, max: 40, step: 1 },
  numArmsB: { value: 1, min: 1, max: 40, step: 0.1 },
  expA1: { value: 8, min: 4, max: 40, step: 0.01 },
})
</script>

<template>
  <div class="aspect-video">
    <TresCanvas clear-color="#82DBC5">
      <TresPerspectiveCamera :position="[3, 3, 3]" />
      <OrbitControls />
      <Superformula
        :width-segments="128"
        :height-segments="128"
        :num-arms-a="numArmsA"
        :num-arms-b="numArmsB"
        :exp-a="[expA1, 8, 0]"
        :exp-b="[2, 1, 2]"
      >
        <TresMeshPhongMaterial color="orange" :shininess="1000" />
      </Superformula>
      <TresAmbientLight color="pink" />
      <TresDirectionalLight :position="[1, 1, 1]" :intensity="4" />
      <TresGridHelper :position-y="-0.5" />
    </TresCanvas>
  </div>
  <TresLeches :float="false" />
</template>
