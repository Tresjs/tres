<script setup>
import { TresCanvas } from '@tresjs/core'
import { Cylinder, OrbitControls } from '@tresjs/cientos'

const { random: r, floor: fl, PI } = Math
const choice = (arr) => {
  return arr[fl(r() * arr.length)]
}
const COLORS = [0x81DBC5, 0xEFAC35, 0xFFFFFF, 0x444444]
const colorsArgs = Array.from({ length: 9 }).fill({}).map(() =>
  [choice(COLORS), [r() * 0.5, r() * 0.5, r(), fl(r() * 20) + 4, fl(r() * 10) + 4, false, 0, 2 * PI]],
)
</script>

<template>
  <TresCanvas
    window-size
    clear-color="#111"
  >
    <TresPerspectiveCamera
      :position="[0, 0, 7]"
      :fov="45"
      :aspect="1"
      :near="0.1"
      :far="1000"
    />
    <OrbitControls />
    <Cylinder
      v-for="[color, args], i of colorsArgs"
      :key="i"
      :args="args"
      :position="[i % 3 - 1, Math.floor(i / 3) - 1, 0]"
    >
      <TresMeshStandardMaterial
        :color="color"
      />
    </Cylinder>
    <TresDirectionalLight
      :position="[0, 2, 4]"
      :intensity="2"
    />
    <TresAmbientLight />
  </TresCanvas>
</template>
