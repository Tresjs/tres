<script setup lang="ts">
import { QuadraticBezierCurve3, Vector3 } from 'three'
import { TresCanvas } from '@tresjs/core'
import { Box, CatmullRomCurve3, Circle, Cone, Cylinder, Dodecahedron, Icosahedron, Octahedron, OrbitControls, Plane, Ring, RoundedBox, Sphere, Superformula, Tetrahedron, Torus, TorusKnot, Tube } from '@tresjs/cientos'
import { onUnmounted } from 'vue'
import OverlayInfo from '../../components/OverlayInfo.vue'

const COLORS = [0x81DBC5, 0xEFAC35, 0xFFFFFF, 0x444444]
const WIGGLE_SIZE = 0.3
const NUM_SHAPES = 17

const i = shallowRef(0)
const colorRef = shallowRef(COLORS[0])
const wiggle0 = shallowRef(0)
const wiggle1 = shallowRef(0)
const wiggle2 = shallowRef(0)
const wiggle3 = shallowRef(0)
const colorSkip = shallowRef(0)
const wiggles = [wiggle0, wiggle1, wiggle2, wiggle3, colorSkip]

let n = 0
let wiggle = wiggles[0]
const intervalId = setInterval(() => {
  n += 0.2

  if (n > Math.PI) {
    n = 0
    const oldWiggle = wiggle
    wiggle = getArrayNext(wiggles, wiggle)
    if (oldWiggle !== wiggle) { oldWiggle.value = 0 }
    if (oldWiggle === wiggles[wiggles.length - 1] && wiggle === wiggles[0]) {
      i.value = (i.value + 1) % NUM_SHAPES
    }
  }

  wiggle.value = Math.sin(n) * WIGGLE_SIZE
  if (wiggles.indexOf(wiggle) === wiggles.length - 1) {
    colorRef.value = COLORS[Math.floor(Math.random() * COLORS.length)]
  }
}, 1000 / 60)

function getArrayNext<T>(arr: T[], currVal: T) {
  const i = arr.indexOf(currVal)
  return arr[(i + 1) % arr.length]
}

onUnmounted(() => clearInterval(intervalId))
</script>

<template>
  <TresCanvas
    window-size
    clear-color="#111"
    render-mode="on-demand"
  >
    <TresPerspectiveCamera
      :fov="45"
      :aspect="1"
      :near="0.1"
      :far="1000"
    />
    <OrbitControls />
    <Box
      v-if="i === 0"
      :color="colorRef"
      :args="[1 + wiggle0, 1 + wiggle1, 1 + wiggle2 + wiggle3]"
    />
    <CatmullRomCurve3
      v-if="i === 1"
      :vertexColors="[colorRef, colorRef]"
      :points="[[-0.5 + wiggle0, -0.5 + wiggle1, -0.5], [0.5 + wiggle2, 0.5, 0.5]]"
      :line-width="40 + wiggle3 * 200"
    />
    <Circle
      v-if="i === 2"
      :color="colorRef"
      :args="[1 + wiggle0, 6 + Math.floor(wiggle1 * 100), wiggle2 * 5, 2 * Math.PI - wiggle3 * 5]"
    />
    <Cone
      v-if="i === 3"
      :color="colorRef"
      :args="[1 + wiggle0, 1 + wiggle1, 12 + Math.floor(wiggle2 * 100), 12, false, 0, Math.PI * 2 + wiggle3 * 10]"
    />
    <Cylinder
      v-if="i === 4"
      :color="colorRef"
      :args="[0.5 + wiggle0, 0.5 + wiggle1, 1 + wiggle2, 12 + Math.floor(wiggle3 * 100)]"
    />
    <Dodecahedron
      v-if="i === 5"
      :color="colorRef"
      :args="[0.5 + wiggle0 + wiggle1, Math.floor((wiggle2 + wiggle3) * 20)]"
    />
    <Icosahedron
      v-if="i === 6"
      :color="colorRef"
      :args="[0.5 + wiggle0 + wiggle1, Math.floor((wiggle2 + wiggle3) * 20)]"
    />
    <Octahedron
      v-if="i === 7"
      :color="colorRef"
      :args="[0.5 + wiggle0 + wiggle1, Math.floor((wiggle2 + wiggle3) * 20)]"
    />
    <Plane
      v-if="i === 8"
      :rotation-y="Math.PI * 0.5"
      :color="colorRef"
      :args="[1 + wiggle0 + wiggle1, 1 + wiggle2 + wiggle3]"
    />
    <Ring
      v-if="i === 9"
      :color="colorRef"
      :args="[0.5 + wiggle0, 1 + wiggle1, 16, 16, wiggle2 * 10, Math.PI * 2 - wiggle3 * 20]"
    />
    <RoundedBox
      v-if="i === 10"
      :color="colorRef"
      :args="[1 + wiggle0, 1 + wiggle1, 1 + wiggle2, 8, 0.2 + wiggle3]"
    />
    <Sphere
      v-if="i === 11"
      :color="colorRef"
      :args="[1 + wiggle0 + wiggle1, 32, 32, wiggle2 * 20, Math.PI * 2 - wiggle3 * 20]"
    />
    <Superformula
      v-if="i === 12"
      :color="colorRef"
      :widthSegments="124"
      :heightSegments="124"
      :numArmsA="12 + 100 * wiggle0"
      :numArmsB="12 + 100 * wiggle1"
      :expA="[30, 16 + 100 * wiggle2, 1.9]"
      :expB="[10, 16 + 100 * wiggle3, 1.9]"
    />
    <Tetrahedron
      v-if="i === 13"
      :color="colorRef"
      :args="[1 + 2 * (wiggle0 + wiggle1), 1 + Math.floor(200 * (wiggle2 + wiggle3))]"
    />
    <Torus
      v-if="i === 14"
      :color="colorRef"
      :args="[0.5 + wiggle0, 0.25 + wiggle1, 32 + Math.floor(100 * wiggle2), 32, 2 * Math.PI - 20 * wiggle3]"
    />
    <TorusKnot
      v-if="i === 15"
      :color="colorRef"
      :args="[0.5 + wiggle0, 0.1 + wiggle1, 256 + Math.floor(100 * wiggle2), 8 - Math.floor(20 * wiggle3)]"
    />
    <Tube
      v-if="i === 16"
      :color="colorRef"
      :args="[new QuadraticBezierCurve3(new Vector3(-1, 0, 0), new Vector3(0, 1, 0), new Vector3(1, 0, 0)), 20 + Math.floor(100 * wiggle0), 0.2 + 10 * (wiggle1 + wiggle2), 8 + Math.floor(50 * wiggle3)]"
    />
  </TresCanvas>
  <OverlayInfo>
    <h1>render-mode="on-demand" Shapes</h1>
    <h2>Setup</h2>
    <p>The canvas' "render-mode" is set to "on-demand". This means it only rerenders when <code>invalidate()</code> is called.</p>
    <p>There should be 1 shape on the canvas at a time.</p>
    <p>The shape should constantly be visibly changing properties. A pause indicates that a shape is not calling <code>invalidate()</code>.</p>
  </OverlayInfo>
</template>
