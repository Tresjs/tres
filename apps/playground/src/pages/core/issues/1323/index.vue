<script setup lang="ts">
import { ref, shallowRef, watch } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { CameraControls } from '@tresjs/cientos'

const ctxRef = shallowRef<any>(null)
const rendererRef = ref<any>(null)

watch(ctxRef, (ctx) => {
  const r = ctx?.context?.renderer?.value
  if (r) { rendererRef.value = r }
})

// ---------- deterministic "random" ----------
function mulberry32(seed: number) {
  let t = seed >>> 0
  return function rand() {
    t += 0x6D2B79F5
    let x = Math.imul(t ^ (t >>> 15), 1 | t)
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x)
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296
  }
}
function rRange(r: () => number, min: number, max: number) {
  return min + (max - min) * r()
}
function colorFromRand(r: () => number) {
  const c = () => Math.round(rRange(r, 40, 230))
  const toHex = (n: number) => n.toString(16).padStart(2, '0')
  return `#${toHex(c())}${toHex(c())}${toHex(c())}`
}

const GEOMETRIES = [
  { component: 'TresBoxGeometry', args: [1, 1, 1] },
  { component: 'TresSphereGeometry', args: [0.65, 32, 16] },
  { component: 'TresConeGeometry', args: [0.6, 1.2, 24] },
  { component: 'TresCylinderGeometry', args: [0.55, 0.55, 1.1, 24] },
  { component: 'TresTorusGeometry', args: [0.55, 0.18, 16, 48] },
  { component: 'TresTorusKnotGeometry', args: [0.38, 0.14, 96, 12] },
  { component: 'TresDodecahedronGeometry', args: [0.65, 0] },
  { component: 'TresIcosahedronGeometry', args: [0.65, 0] },
  { component: 'TresOctahedronGeometry', args: [0.65, 0] },
  { component: 'TresCapsuleGeometry', args: [0.4, 0.5, 6, 16] },
] as const

interface SceneObj {
  id: string
  geometry: (typeof GEOMETRIES)[number]
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
  material: {
    color: string
    roughness: number
    metalness: number
    clearcoat: number
    clearcoatRoughness: number
    transmission: number
    thickness: number
    ior: number
  }
}

function makeObjects({ seed = 424242, count = 4500 } = {}): SceneObj[] {
  const r = mulberry32(seed)
  const out: SceneObj[] = []

  for (let i = 0; i < count; i++) {
    const g = GEOMETRIES[i % GEOMETRIES.length]
    const color = colorFromRand(r)

    out.push({
      id: `obj-${i}`,
      geometry: g,
      position: [rRange(r, -60, 60), rRange(r, 0.25, 5.0), rRange(r, -60, 60)],
      rotation: [
        rRange(r, 0, Math.PI),
        rRange(r, 0, Math.PI),
        rRange(r, 0, Math.PI),
      ],
      scale: [rRange(r, 0.55, 2.1), rRange(r, 0.55, 2.4), rRange(r, 0.55, 2.1)],
      material: {
        color,
        roughness: rRange(r, 0.15, 0.9),
        metalness: rRange(r, 0.0, 0.85),
        clearcoat: rRange(r, 0.0, 0.8),
        clearcoatRoughness: rRange(r, 0.05, 0.35),
        transmission: r() > 0.75 ? rRange(r, 0.2, 0.8) : 0,
        thickness: rRange(r, 0.2, 1.0),
        ior: rRange(r, 1.1, 1.7),
      },
    })
  }

  return out
}

const objects = shallowRef<SceneObj[]>(makeObjects())
</script>

<template>
  <TresCanvas
    ref="ctxRef"
    clear-color="#eeeeee"
    window-size
    preserve-drawing-buffer
    shadows
  >
    <TresPerspectiveCamera
      :position="[-5, 6, 5 * 2.25]"
      :look-at="[0, 1, 0]"
      :args="[45, 1, 0.1, 1000]"
    />

    <CameraControls
      make-default
      :maxPolarAngle="Math.PI / 2"
      :smoothTime="0.5"
      :draggingSmoothTime="0.2"
      :minDistance="0"
      :maxDistance="120"
    />

    <TresAmbientLight :args="['white', 0.85]" />
    <TresDirectionalLight
      :position="[-2, 5, 4]"
      :args="['#fcb67a', 1]"
      cast-shadow
      :shadow-mapSize-width="1024"
      :shadow-mapSize-height="1024"
      :shadow-camera-near="0.1"
      :shadow-camera-far="200"
      :shadow-camera-left="-100"
      :shadow-camera-right="100"
      :shadow-camera-top="100"
      :shadow-camera-bottom="-100"
      :shadow-bias="-0.0005"
    />

    <TresMesh
      :position="[0, -0.01, 0]"
      :rotation="[-Math.PI / 2, 0, 0]"
      receive-shadow
    >
      <TresPlaneGeometry :args="[200, 200, 1, 1]" />
      <TresMeshStandardMaterial
        :color="0xD9DADF"
        :roughness="1"
        :metalness="0.05"
      />
    </TresMesh>

    <TresMesh
      v-for="obj in objects"
      :key="obj.id"
      :position="obj.position"
      :rotation="obj.rotation"
      :scale="obj.scale"
      cast-shadow
      receive-shadow
    >
      <component :is="obj.geometry.component" :args="obj.geometry.args" />
      <TresMeshPhysicalMaterial v-bind="obj.material" />
    </TresMesh>
  </TresCanvas>
</template>
