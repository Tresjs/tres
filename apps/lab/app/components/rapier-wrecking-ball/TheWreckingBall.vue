<script setup lang="ts">
import { useLoop } from '@tresjs/core'
import { type ExposedRigidBody, Physics, RigidBody, SphericalJoint } from '@tresjs/rapier'
import { CylinderGeometry, type DirectionalLight, Euler, InstancedMesh, Matrix4, MeshStandardMaterial, Quaternion, Vector3 } from 'three'
import type { ShallowRef } from 'vue'
import { RoundedBox } from '@tresjs/cientos'

const poleRef: ShallowRef<ExposedRigidBody | null> = shallowRef(null)
const ballRef: ShallowRef<ExposedRigidBody | null> = shallowRef(null)

const CHAIN_LINKS = 12

const chainMesh = new InstancedMesh(
  new CylinderGeometry(0.07, 0.07, 0.7, 8),
  new MeshStandardMaterial({ color: '#888', metalness: 0.9, roughness: 0.3 }),
  CHAIN_LINKS,
)
chainMesh.castShadow = true

const _m = new Matrix4()
const _p = new Vector3()
const _q = new Quaternion()
const _s = new Vector3(1, 1, 1)
const _e = new Euler()

const WALL_HEIGHT = 6
const CEMENT_SHADES = ['#7a7a78', '#6e6e6c', '#828280', '#767674', '#6a6a68', '#7e7e7c']

const GRID_PRESETS = [
  { text: '3×4', value: '3x4' },
  { text: '5×6', value: '5x6' },
  { text: '8×8', value: '8x8' },
  { text: '10×10', value: '10x10' },
]

const wallKey = ref(0)

const { mass, ballSize, gridSize, boxMass } = useControls({
  gridSize: {
    label: 'Grid Size',
    value: '5x6',
    options: GRID_PRESETS,
  },
  ballSize: { value: 1, min: 0.5, max: 5, step: 0.1, label: 'Ball Size' },
  mass: { value: 50, min: 1, max: 200, step: 1, label: 'Mass' },
  boxMass: { value: 1, min: 0.1, max: 50, step: 0.1, label: 'Box Mass' },
  resetWall: {
    type: 'button',
    label: 'Reset Wall',
    size: 'block',
    icon: 'i-carbon-reset',
    onClick: () => { wallKey.value++ },
  },
}, { uuid: 'rapier-wrecking-ball' })

const parsedGrid = computed(() => {
  const [c, r] = (gridSize.value as string).split('x').map(Number)
  return { cols: c!, rows: r! }
})

watch(gridSize, () => { wallKey.value++ })

const boxSize = computed(() => WALL_HEIGHT / parsedGrid.value.rows)

const boxes = computed(() =>
  Array.from({ length: parsedGrid.value.cols * parsedGrid.value.rows }, (_, i) => ({
    col: i % parsedGrid.value.cols,
    row: Math.floor(i / parsedGrid.value.cols),
  })),
)

const dirLightRef = shallowRef<DirectionalLight | null>(null)
watch(dirLightRef, (light) => {
  if (!light) { return }
  light.shadow.mapSize.set(2048, 2048)
  light.shadow.camera.left = -30
  light.shadow.camera.right = 30
  light.shadow.camera.top = 15
  light.shadow.camera.bottom = -15
  light.shadow.camera.near = 0.1
  light.shadow.camera.far = 80
  light.shadow.camera.updateProjectionMatrix()
})

const { onBeforeRender } = useLoop()
onBeforeRender(() => {
  const a = poleRef.value?.instance
  const b = ballRef.value?.instance
  if (!a || !b) { return }

  const ta = a.translation()
  const tb = b.translation()
  const dx = tb.x - ta.x
  const dy = tb.y - ta.y
  const dz = tb.z - ta.z
  const angleZ = Math.atan2(dx, -dy)

  for (let i = 0; i < CHAIN_LINKS; i++) {
    const t = (i + 0.5) / CHAIN_LINKS
    _p.set(ta.x + dx * t, ta.y + dy * t, ta.z + dz * t)
    _e.set(i % 2 === 0 ? Math.PI / 2 : 0, 0, angleZ)
    _q.setFromEuler(_e)
    _m.compose(_p, _q, _s)
    chainMesh.setMatrixAt(i, _m)
  }
  chainMesh.instanceMatrix.needsUpdate = true
})
</script>

<template>
  <Environment preset="city" background />
  <TresDirectionalLight ref="dirLightRef" :position="[5, 15, 10]" :intensity="1.5" cast-shadow />
  <primitive :object="chainMesh" />

  <Suspense>
    <Physics>
      <RigidBody ref="poleRef" type="fixed" :position="[0, 13.5, 0]" collider="ball">
        <TresMesh>
          <TresSphereGeometry :args="[0.15, 16, 16]" />
          <TresMeshStandardMaterial color="#888" :metalness="0.9" :roughness="0.2" />
        </TresMesh>
      </RigidBody>

      <RigidBody :key="ballSize" ref="ballRef" type="dynamic" :position="[-8, 4, 0]" collider="ball" :mass="mass">
        <TresMesh cast-shadow>
          <TresSphereGeometry :args="[ballSize, 32, 32]" />
          <TresMeshStandardMaterial color="#1a1a1a" :metalness="0.95" :roughness="0.1" />
        </TresMesh>
      </RigidBody>

      <SphericalJoint
        :bodies="[poleRef?.instance, ballRef?.instance]"
        :params="[
          [0, 0, 0],
          [0, 9.5, 0],
        ]"
      />

      <!-- Destructible wall at x=5, columns along Z, rows along Y -->
      <RigidBody
        v-for="(box, i) in boxes"
        :key="`${wallKey}-${parsedGrid.cols}-${parsedGrid.rows}-${i}`"
        type="dynamic"
        :mass="boxMass"
        :position="[
          3,
          boxSize / 2 + box.row * boxSize,
          -((parsedGrid.cols - 1) / 2) * boxSize + box.col * boxSize,
        ]"
        collider="cuboid"
      >
        <RoundedBox :args="[boxSize, boxSize, boxSize, 1, boxSize * 0.08]" cast-shadow receive-shadow>
          <TresMeshStandardMaterial :color="CEMENT_SHADES[box.row % CEMENT_SHADES.length]" :roughness="0.95" :metalness="0.0" />
        </RoundedBox>
      </RigidBody>

      <RigidBody type="fixed" :position="[0, -0.5, 0]">
        <TresMesh receive-shadow>
          <TresBoxGeometry :args="[50, 1, 20]" />
          <TresMeshStandardMaterial color="#1e1e26" :roughness="1" />
        </TresMesh>
      </RigidBody>
    </Physics>
  </Suspense>
</template>
