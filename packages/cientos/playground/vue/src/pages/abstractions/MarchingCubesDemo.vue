<script setup lang="ts">
import { MarchingCube, MarchingCubes, MarchingPlane, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const r0 = shallowRef()
const r1 = shallowRef()
const r2 = shallowRef()
const r3 = shallowRef()
const r4 = shallowRef()
const r5 = shallowRef()
const r6 = shallowRef()
const r7 = shallowRef()
const r8 = shallowRef()
const r9 = shallowRef()

let time = 0
setInterval(() => {
  time += 1 / 30
  let i = 0
  for (const r of [r0, r1, r2, r3, r4, r5, r6, r7, r8, r9]) {
    if (!r.value) { return }
    const p = r.value.instance.position
    p.x = Math.sin(i + 1.26 * time * (1.03 + 0.5 * Math.cos(0.21 * i))) * 0.27
    p.y = Math.cos(i + 1.12 * time * Math.cos(1.22 + 0.1424 * i)) * 0.77
    p.z = Math.cos(i + 1.32 * time * 0.1 * Math.sin((0.92 + 0.53 * i))) * 0.27
    i++
  }
}, 1000 / 30)

const c = useControls({
  hasWallX: true,
  hasWallY: true,
  hasWallZ: true,
  x: { value: 0, min: -1, max: 1, step: 0.1 },
  y: { value: 0, min: -1, max: 1, step: 0.1 },
  z: { value: 0, min: -1, max: 1, step: 0.1 },
  strength: { value: 0.5, min: -5, max: 5 },
  subtract: { value: 12, min: 0, max: 100 },
  enableColors: true,
})
</script>

<template>
  <TresLeches />
  <TresCanvas clear-color="#82DBC5" :tone-mapping="NoToneMapping">
    <TresPerspectiveCamera :position="[0, 0.5, 5]" />
    <OrbitControls />
    <TresGridHelper :args="[10, 10]" />
    <MarchingCubes :enable-colors="true" :resolution="40" :max-poly-count="40000">
      <MarchingPlane v-if="c.hasWallX.value.value" plane-type="x" />
      <MarchingPlane v-if="c.hasWallY.value.value" plane-type="y" />
      <MarchingPlane v-if="c.hasWallZ.value.value" plane-type="z" />

      <MarchingCube
        :position="[c.x.value.value, c.y.value.value, c.z.value.value]"
        :strength="c.strength.value.value"
        :subtract="c.subtract.value.value"
      />
      <MarchingCube ref="r0" color="red" />
      <MarchingCube ref="r1" color="red" />
      <MarchingCube ref="r2" color="red" />
      <MarchingCube ref="r3" color="blue" />
      <MarchingCube ref="r4" color="blue" />
      <MarchingCube ref="r5" color="blue" />
      <MarchingCube ref="r6" color="green" />
      <MarchingCube ref="r7" color="green" />
      <MarchingCube ref="r8" color="green" />
      <MarchingCube ref="r9" color="green" />

      <TresMeshBasicMaterial v-if="c.enableColors.value.value" :vertex-colors="true" />
      <TresMeshPhongMaterial v-else specular="#111111" :shininess="30" color="#049ef4" :reflectivity="1" />
    </MarchingCubes>
    <TresAxesHelper />

    <TresDirectionalLight color="#ffffff" :intensity="3" :position="[0, 200, 0]" />
    <TresDirectionalLight color="#ffffff" :intensity="3" :position="[100, 200, 100]" />

    <OrbitControls :enable-pan="false" :zoom-speed="0.5" />
  </TresCanvas>
</template>
