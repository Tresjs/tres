<script setup lang="ts">
import type { TresObject } from '@tresjs/core'
import { useDark } from '@vueuse/core'
import { shallowRef, watch } from 'vue'
import { MathUtils, Object3D, MeshToonMaterial, BoxGeometry, Color } from 'three'

import { colors } from './constants'

const { lerp } = MathUtils
const COUNT = 2000

// Create geometry
const cubeGeometry = new BoxGeometry()

const isDark = useDark()

// Materials
const mainMaterial = new MeshToonMaterial({
  vertexColors: true,
  color: isDark.value ? colors.DARK : colors.LIGHT,
})

// Colors
const mainColor = new Color(isDark.value ? colors.DARK : colors.LIGHT)
const hoverColor = new Color(colors.YELLOW)

// Brownian motion setup
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

// Instance setup
const dummy = new Object3D()
const meshRef = shallowRef<TresObject | null>(null)
const getPosition = brownian(2, -60, 60, -40, 40, -30, 0)
const getRotation = brownian(1, -20, 20, -10, 10, -20, 0)

// Initialize positions and rotations
const positions = Array.from({ length: COUNT }, () => getPosition())
const rotations = Array.from({ length: COUNT }, () => getRotation())

// Set initial matrices and colors
watch(meshRef, (mesh) => {
  if (mesh) {
    positions.forEach((pos, i) => {
      const [x, y, z] = pos
      const [rx, ry, rz] = rotations[i]

      dummy.position.set(x, y, z)
      dummy.rotation.set(rx, ry, rz)
      dummy.updateMatrix()

      mesh.setMatrixAt(i, dummy.matrix)
      mesh.setColorAt(i, mainColor)
    })
    mesh.instanceMatrix.needsUpdate = true
    mesh.instanceColor!.needsUpdate = true
  }
})

// Dark mode handling
watch(isDark, (newVal) => {
  mainColor.set(newVal ? colors.DARK : colors.LIGHT)
  if (meshRef.value) {
    for (let i = 0; i < COUNT; i++) {
      meshRef.value.setColorAt(i, mainColor)
    }
    meshRef.value.instanceColor!.needsUpdate = true
  }
})

// Hover handling
function onPointerEnter(ev: ThreeEvent<PointerEvent>) {
  if (meshRef.value && ev.instanceId !== undefined) {
    meshRef.value.setColorAt(ev.instanceId, hoverColor)
    meshRef.value.instanceColor!.needsUpdate = true
  }
}

function onPointerLeave(ev: ThreeEvent<PointerEvent>) {
  if (meshRef.value && ev.instanceId !== undefined) {
    meshRef.value.setColorAt(ev.instanceId, mainColor)
    meshRef.value.instanceColor!.needsUpdate = true
  }
}
</script>

<template>
  <TresGroup :position="[0, 0, -30]">
    <TresInstancedMesh ref="meshRef" :args="[cubeGeometry, mainMaterial, COUNT]" @pointer-enter="onPointerEnter"
      @pointer-leave="onPointerLeave" />
  </TresGroup>
</template>
