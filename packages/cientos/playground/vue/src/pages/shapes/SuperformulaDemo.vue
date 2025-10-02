<script setup lang="ts">
import { OrbitControls, Superformula } from '@tresjs/cientos'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { Color } from 'three'

const numArmsA = shallowRef(1)
const numArmsB = shallowRef(1)
const expA1 = shallowRef(1)
const expA2 = shallowRef(1)
const expA3 = shallowRef(1)
const expB1 = shallowRef(1)
const expB2 = shallowRef(1)
const expB3 = shallowRef(1)

const { sin, cos } = Math

useRenderLoop().onLoop(({ elapsed }) => {
  const e = elapsed * 0.1
  numArmsA.value = sin(e * Math.PI) * 24
  expA1.value = (sin(e * Math.PI) + 2) * 30
  expA2.value = (sin(e * Math.E) + 2) * 30
  expA3.value = (sin(e * Math.SQRT2) + 2) * 30
  numArmsB.value = cos(e) * 24
  expB1.value = (cos(e * Math.PI) + 2) * 30
  expB2.value = (cos(e * Math.E) + 2) * 30
  expB3.value = (cos(e * Math.SQRT2) + 2) * 30
})
</script>

<template>
  <TresCanvas clear-color="#777">
    <TresDirectionalLight
      :position="[3, 2, 1]"
      :intensity="8"
    />
    <TresAmbientLight
      :position="[3, 2, 1]"
      :intensity="1"
      :color="new Color('pink')"
    />
    <Superformula
      :width-segments="256"
      :height-segments="256"
      :num-arms-a="numArmsA"
      :exp-a="[expA1, expA2, expA3]"
      :num-arms-b="numArmsB"
      :exp-b="[expB1, expB2, expB3]"
    >
      <TresMeshNormalMaterial />
    </Superformula>
    <TresGridHelper />
    <OrbitControls />
  </TresCanvas>
</template>
