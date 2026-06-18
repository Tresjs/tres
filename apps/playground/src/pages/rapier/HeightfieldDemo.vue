<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { HeightfieldCollider, InstancedRigidBody, Physics, RigidBody } from '@tresjs/rapier'
import {
  ACESFilmicToneMapping,

  MeshNormalMaterial,
  PlaneGeometry,
  SphereGeometry,
  SRGBColorSpace,
} from 'three'
import type { InstancedMesh } from 'three'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const { debug } = useControls({
  debug: true,
})

// Terrain
const rows = 30
const columns = 30
const scale = { x: 1.2, y: 2.5, z: 1.2 }
const heights = new Float32Array((rows + 1) * (columns + 1))

for (let column = 0; column <= columns; column++) {
  for (let row = 0; row <= rows; row++) {
    const x = (column / columns - 0.5) * Math.PI * 2
    const z = (row / rows - 0.5) * Math.PI * 2
    const offset = 2
    const wave
      = Math.sin(x * (offset + Math.random() * 0.5)) * 0.65
        + Math.cos(z * (offset + Math.random() * 0.5)) * 0.5
        + Math.sin((x + z) * offset) * 0.2

    heights[row + column * (rows + 1)] = wave
  }
}

const terrainGeometry = shallowRef(new PlaneGeometry(rows * scale.x, columns * scale.z, rows, columns))
const terrainPositions = terrainGeometry.value.attributes.position

for (let row = 0; row <= rows; row++) {
  for (let column = 0; column <= columns; column++) {
    const vertexIndex = row * (columns + 1) + column
    const height = heights[row + column * (rows + 1)] * scale.y
    terrainPositions.setZ(vertexIndex, height)
  }
}

// Balls
const ballPhysicsRef = shallowRef<InstanceType<typeof InstancedRigidBody>>()
const ballInstancedMeshRef = shallowRef<InstancedMesh>()
const ballGeometry = new SphereGeometry(0.5)
const ballMaterial = new MeshNormalMaterial()

const placeBalls = () => {
  ballPhysicsRef.value?.contexts.forEach((context) => {
    const rigidBody = context.rigidBody
    const v0 = { x: 0, y: 0, z: 0 }
    rigidBody.resetForces(true)
    rigidBody.setLinvel(v0, true)
    rigidBody.setAngvel(v0, true)
    rigidBody.setTranslation({
      x: (Math.random() - 0.5) * 20,
      y: Math.random() * 2 + 5,
      z: (Math.random() - 0.5) * 20,
    }, true)
  })
}

watch(ballInstancedMeshRef, () => {
  nextTick(placeBalls)
})
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[30, 30, 30]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <TresAmbientLight :intensity="0.35" />

    <Suspense>
      <Physics :debug="debug">
        <InstancedRigidBody ref="ballPhysicsRef" collider="ball">
          <TresInstancedMesh
            ref="ballInstancedMeshRef"
            :args="[ballGeometry, ballMaterial, 30]"
            cast-shadow
          />
        </InstancedRigidBody>

        <RigidBody
          type="fixed"
          :collider="false"
        >
          <HeightfieldCollider
            :args="[rows, columns, heights, {
              x: scale.x * rows,
              y: scale.y,
              z: scale.z * columns,
            }]"
          />
          <TresMesh
            :geometry="terrainGeometry"
            :rotation-x="-Math.PI / 2"
            receive-shadow
            cast-shadow
            @click="placeBalls"
          >
            <TresMeshStandardMaterial />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>

    <TresDirectionalLight
      :position="[0, 15, 0]"
      :intensity="1.8"
      cast-shadow
      :shadow-camera-far="100"
      :shadow-camera-left="-40"
      :shadow-camera-right="40"
      :shadow-camera-top="40"
      :shadow-camera-bottom="-40"
      :shadow-radius="1.5"
      :shadow-blur-samples="10"
      :shadow-mapSize-width="1024"
      :shadow-mapSize-height="1024"
    />
  </TresCanvas>
</template>
