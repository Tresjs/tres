<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { MathUtils, Vector3, Euler, BoxGeometry, CylinderGeometry, SphereGeometry, MeshToonMaterial  } from 'three'

import { colors } from './constants'
const { lerp } = MathUtils
const COUNT = 2000

const brownian = (stepSize: number, xMin: number, xMax: number, yMin: number, yMax: number, zMin: number, zMax: number) => {
  let x = 0; let y = 0; let z = 0
  const r = () => (Math.random() - 0.5) * 2 * stepSize
  const isInBounds = () => xMin < x && x < xMax && yMin < y && y < yMax && zMin < z && z < zMax
  const reset = () => {
    x = lerp(xMin, xMax, Math.random())
    y = lerp(yMin, yMax, Math.random())
    z = lerp(zMin, zMax, Math.random())
  }
  reset()
  return () => {
    x += r()
    y += r()
    z += r()
    if (!isInBounds()) { reset() }
    return [x, y, z]
  }
}

const sphereGeometry = new SphereGeometry()
const cubeGeometry = new BoxGeometry()
const pyramidGeometry = new CylinderGeometry(0, 0.6, 1)

const isDark = useDark()

const mainMaterial = new MeshToonMaterial({
  color: isDark.value ? colors.DARK : colors.LIGHT,
})

const hoverMaterial = new MeshToonMaterial({
  color: colors.YELLOW,
})

const getPosition = brownian(2, -60, 60, -40, 40, -30, 0)
const getRotation = brownian(1, -20, 20, -10, 10, -20, 0)
const objectPositions = Array.from({ length: COUNT }).map(() => new Vector3(...getPosition()))
const objectRotations = Array.from({ length: COUNT }).map(() => new Euler(...getRotation()))

function onPointerEnter(ev: ThreeEvent<PointerEvent>) {
  if (ev.eventObject.material !== hoverMaterial) {
    ev.eventObject.userData.material = ev.eventObject.material
  }
  ev.eventObject.material = hoverMaterial
}

function onPointerLeave(ev: ThreeEvent<PointerEvent>) {
  ev.eventObject.material = ev.eventObject.userData.material ?? mainMaterial
}

watch(isDark, (newVal) => {
  mainMaterial.color.set(newVal ? colors.DARK : colors.LIGHT)
})
</script>

<template>
  <TresGroup :position="[0, 0, -30]">
    <TresGroup :position="[0, 0, -30]">
      <TresMesh
        v-for="position, i of objectPositions"
        :key="i"
        :geometry="[sphereGeometry, cubeGeometry, pyramidGeometry][i % 3]"
        :material="mainMaterial"
        :position="position"
        :rotation="objectRotations[i]"
        @pointer-enter="onPointerEnter"
        @pointer-leave="onPointerLeave"
      />
    </TresGroup>
  </TresGroup>
</template>
