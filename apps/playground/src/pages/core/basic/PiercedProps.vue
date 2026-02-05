<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { TresLeches } from '@tresjs/leches'
import { shallowRef } from 'vue'

const uuid = 'core-basic-pierced-props'

const x = shallowRef(1)
const y = shallowRef(1)
const z = shallowRef(1)
const rx = shallowRef(1)
const ry = shallowRef(1)
const rz = shallowRef(1)
const sx = shallowRef(1)
const sy = shallowRef(1)
const sz = shallowRef(1)
const label = shallowRef('')

const refs = [x, y, z, rx, ry, rz, sx, sy, sz]
const labels = [
  'position-x',
  'position-y',
  'position-z',
  'rotation-x',
  'rotation-y',
  'rotation-z',
  'scale-x',
  'scale-y',
  'scale-z',
]

const onLoop = ({ elapsed }: { elapsed: number }) => {
  const i = Math.floor(elapsed % refs.length)
  refs[i].value = Math.cos(elapsed * Math.PI * 2)
  label.value = `${labels[i]} ${Math.trunc(refs[i].value * 10) / 10}`
}
</script>

<template>
  <div class="overlay">
    <p>Demonstrate pierced props</p>
    {{ label }}
  </div>
  <TresLeches :uuid="uuid" />
  <TresCanvas @loop="onLoop">
    <TresPerspectiveCamera :position="[5, 5, 5]" :look-at="[0, 0, 0]" />
    <TresMesh
      :position-x="x"
      :position-y="y"
      :position-z="z"
      :rotation-x="rx"
      :rotation-y="ry"
      :rotation-z="rz"
      :scale-x="sx"
      :scale-y="sy"
      :scale-z="sz"
    >
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresGridHelper :size="10" :divisions="10" />
  </TresCanvas>
</template>

<style>
.overlay {
  position: fixed;
  padding: 10px;
  font-family: sans-serif;
}
</style>
