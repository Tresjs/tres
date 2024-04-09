<script setup lang="ts">
import { shallowRef } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'

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

/* const PI2 = Math.PI * 2 */

useRenderLoop().onLoop(({ elapsed }) => {
  const i = Math.floor(elapsed % refs.length)
  refs[i].value = Math.cos(elapsed * Math.PI * 2)
  label.value = `${labels[i]} ${Math.trunc(refs[i].value * 10) / 10}`
})
</script>

<template>
  <div class="overlay">
    <p>Demonstrate pierced props</p>
    {{ label }}
  </div>
  <TresCanvas>
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
  </TresCanvas>
</template>

<style>
.overlay {
  position: fixed;
  padding: 10px;
  font-family: sans-serif;
}
</style>
