<script setup lang="ts">
import type { TresPointerEvent } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { useLoop } from '@tresjs/core'
import type { Mesh } from 'three'
import { BoxGeometry, CylinderGeometry, Euler, MathUtils, MeshToonMaterial, SphereGeometry, Vector3 } from 'three'

const lerp = MathUtils.lerp
const clamp = MathUtils.clamp

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

const getPosition = brownian(2, -60, 60, -40, 40, -30, 0)
const getRotation = brownian(1, -20, 20, -10, 10, -20, 0)
const cubePositions = Array.from({ length: COUNT }).map(() => new Vector3(...getPosition()))
const cubeRotations = Array.from({ length: COUNT }).map(() => new Euler(...getRotation()))

const pyramidRef = shallowRef({ position: new Vector3(), scale: new Vector3(1, 1, 1) })
const boxRef = shallowRef({ position: new Vector3(), scale: new Vector3(1, 1, 1) })
const sphereRef = shallowRef({ position: new Vector3(), scale: new Vector3(1, 1, 1) })

const whiteMaterial = new MeshToonMaterial({ color: '#f8f8f8' })
const orangeMaterial = new MeshToonMaterial({ color: '#eeac35' })
const blueMaterial = new MeshToonMaterial({ color: '#7fdac6' })
const grayMaterial = new MeshToonMaterial({ color: '#1e1f22' })
const hoverMaterial = new MeshToonMaterial({ color: '#ffff00' })

const sphereGeometry = new SphereGeometry()
const cubeGeometry = new BoxGeometry()
const pyramidGeometry = new CylinderGeometry(0, 0.6, 1)

function onPointerEnter(ev: TresPointerEvent) {
  if ((ev.eventObject as Mesh).material !== hoverMaterial) {
    (ev.eventObject as Mesh).userData.material = (ev.eventObject as Mesh).material
  }
  (ev.eventObject as Mesh).material = hoverMaterial
}

function onPointerLeave(ev: TresPointerEvent) {
  (ev.eventObject as Mesh).material = (ev.eventObject as Mesh).userData.material ?? grayMaterial
}

const PI = Math.PI

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  elapsed = elapsed * 3 + 7
  pyramidRef.value.position.y = Math.tan(clamp((1 + elapsed) % 9, 0, PI))
  boxRef.value.position.y = Math.tan(clamp((0.5 + elapsed) % 9, 0, PI))
  sphereRef.value.position.y = Math.tan(clamp(elapsed % 9, 0, PI))

  const scale0 = Math.abs(Math.cos(clamp((1 + elapsed) % 9, 0, PI)))
  const scale1 = Math.abs(Math.cos(clamp((0.5 + elapsed) % 9, 0, PI)))
  const scale2 = Math.abs(Math.cos(clamp(elapsed % 9, 0, PI)))
  pyramidRef.value.scale.set(scale0, scale0, scale0)
  boxRef.value.scale.set(scale1, scale1, scale1)
  sphereRef.value.scale.set(scale2, scale2, scale2)
})
</script>

<template>
  <TresPerspectiveCamera
    :position="[0, 0, 22]"
    :fov="45"
    :near="0.1"
    :far="1000"
    :look-at="[0, 5, 0]"
  />
  <OrbitControls />
  <TresAmbientLight :intensity="0.5" />

  <TresGroup>
    <TresMesh
      ref="pyramidRef"
      :material="blueMaterial"
      :position="[-1.5, 0, 0]"
      @pointerenter="onPointerEnter"
      @pointerleave="onPointerLeave"
    >
      <TresCylinderGeometry :args="[0, 0.60, 1]" />
    </TresMesh>
    <TresMesh
      ref="boxRef"
      cast-shadow
      :material="whiteMaterial"
      @pointerenter="onPointerEnter"
      @pointerleave="onPointerLeave"
    >
      <TresBoxGeometry />
    </TresMesh>

    <TresMesh
      ref="sphereRef"
      :position="[1.5, 0, 0]"
      cast-shadow
      :material="orangeMaterial"
      @pointerenter="onPointerEnter"
      @pointerout="onPointerLeave"
    >
      <TresSphereGeometry :args="[0.5, 32, 32]" />
    </TresMesh>
  </TresGroup>

  <TresGroup :position="[0, 0, -30]">
    <TresMesh
      v-for="position, i of cubePositions"
      :key="i"
      :geometry="[sphereGeometry, cubeGeometry, pyramidGeometry][i % 3]"
      :material="grayMaterial"
      :position="position"
      :rotation="cubeRotations[i]"
      @pointerenter="onPointerEnter"
      @pointerleave="onPointerLeave"
    />
  </TresGroup>

  <TresDirectionalLight
    :position="[0, 8, 4]"
    :intensity="0.7"
    cast-shadow
  />
  <TresDirectionalLight
    :position="[0, 2, 4]"
    :intensity="1"
    cast-shadow
  />
</template>
