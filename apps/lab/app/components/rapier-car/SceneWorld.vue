<script setup lang="ts">
import { Quaternion, Vector3 } from '@dimforge/rapier3d-compat'
import { type ExposedRigidBody, RigidBody } from '@tresjs/rapier'
import { BoxGeometry, Color, type InstancedMesh, MeshStandardMaterial, Object3D, SphereGeometry } from 'three'
import { nextTick, shallowRef, watch } from 'vue'

type ArrayVec3 = [number, number, number]

const ballRef = shallowRef<ExposedRigidBody | null>(null)

function reset() {
  const body = ballRef.value?.instance
  if (!body) { return }

  body.setTranslation(new Vector3(0, 8, -4), true)
  body.setRotation(new Quaternion(0, 0, 0, 1), true)
  body.setLinvel(new Vector3(0, 0, 0), true)
  body.setAngvel(new Vector3(0, 0, 0), true)
  body.wakeUp()
}

defineExpose({ reset })

const GROUND_HALF = 50
const GROUND_Y = -0.25
const ROAD_HALF_WIDTH = 5
const ROAD_LENGTH = 80
const WALL_HALF_HEIGHT = 2.5
const WALL_HALF_WIDTH = 0.35
const WALL_BOUNDARY = GROUND_HALF - WALL_HALF_WIDTH

const TRACK_MARK = {
  y: 0.08,
  size: [0.12, 0.01, 1.4] as ArrayVec3,
  startZ: -30,
  endZ: 30,
  step: 4,
}

const BOXES: {
  position: ArrayVec3
  size: ArrayVec3
  rotation?: ArrayVec3
  color?: string
}[] = [
    // Ramps
    {
      position: [-10, 3, -20],
      rotation: [0.1, Math.PI * 0.65, Math.PI * 0.1],
      size: [10, 0.55, 2.5],
    },
    {
      position: [7.5, 0.3, 22],
      rotation: [Math.PI * 0, Math.PI * -0.3, Math.PI * 0.1],
      size: [5, 0.3, 1.6],
    },
    {
      position: [30, 2.5, 40],
      rotation: [Math.PI * 0, Math.PI * 0, Math.PI * -0.13],
      size: [8, 0.3, 3],
    },
    {
      position: [-30, 2.5, 40],
      rotation: [Math.PI * 0, Math.PI, Math.PI * -0.13],
      size: [8, 0.3, 3],
    },

    // Blocks
    {
      position: [0, 5.6, 40],
      rotation: [0, Math.PI, 0],
      size: [8, 0.3, 3],
    },
    {
      position: [10, 10, -5],
      size: [3, 10, 3],
    },
    {
      position: [-20, 8, -40],
      size: [4, 8, 4],
    },
    {
      position: [15, 3, 40],
      size: [8, 3, 8],
    },
    {
      position: [-15, 3, 40],
      size: [8, 3, 8],
    },

    // Walls
    {
      position: [0, WALL_HALF_HEIGHT, WALL_BOUNDARY] as ArrayVec3,
      size: [WALL_BOUNDARY, WALL_HALF_HEIGHT, WALL_HALF_WIDTH] as ArrayVec3,
      color: "#94a3b8",
    },
    {
      position: [0, WALL_HALF_HEIGHT, -WALL_BOUNDARY] as ArrayVec3,
      size: [WALL_BOUNDARY, WALL_HALF_HEIGHT, WALL_HALF_WIDTH] as ArrayVec3,
      color: "#94a3b8",
    },
    {
      position: [WALL_BOUNDARY, WALL_HALF_HEIGHT, 0] as ArrayVec3,
      size: [WALL_HALF_WIDTH, WALL_HALF_HEIGHT, WALL_BOUNDARY] as ArrayVec3,
      color: "#94a3b8",
    },
    {
      position: [-WALL_BOUNDARY, WALL_HALF_HEIGHT, 0] as ArrayVec3,
      size: [WALL_HALF_WIDTH, WALL_HALF_HEIGHT, WALL_BOUNDARY] as ArrayVec3,
      color: "#94a3b8",
    },
  ]

const trackMarkCount = (TRACK_MARK.endZ - TRACK_MARK.startZ) / TRACK_MARK.step + 1

const trackMarks = Array.from(
  { length: trackMarkCount },
  (_, index) => ([
    0,
    TRACK_MARK.y,
    TRACK_MARK.startZ + index * TRACK_MARK.step,
  ] as ArrayVec3),
)

const trackMarkGeometry = new BoxGeometry(...TRACK_MARK.size)
const trackMarkMaterial = new MeshStandardMaterial({ color: '#f8fafc' })
const trackMarkInstancedMeshRef = shallowRef<InstancedMesh>()

const clouds: {
  position: ArrayVec3
  scale?: number
  puffs: {
    position: ArrayVec3
    radius: number
    color: string
  }[]
}[] = [
    {
      position: [-18, 14, -25],
      puffs: [
        { position: [0, 0, 0], radius: 2.2, color: '#f8fafc' },
        { position: [2, 0.2, 0.5], radius: 1.6, color: '#f1f5f9' },
        { position: [-2, -0.1, 0], radius: 1.4, color: '#f1f5f9' },
      ],
    },
    {
      position: [22, 16, 10],
      scale: 1.2,
      puffs: [
        { position: [0, 0, 0], radius: 2, color: '#f8fafc' },
        { position: [1.8, 0.1, 0.3], radius: 1.5, color: '#f1f5f9' },
      ],
    },
    {
      position: [-30, 15, 18],
      scale: 0.9,
      puffs: [
        { position: [0, 0, 0], radius: 1.8, color: '#f8fafc' },
        { position: [-1.5, 0.15, 0.4], radius: 1.3, color: '#f1f5f9' },
        { position: [1.2, -0.05, -0.3], radius: 1.1, color: '#e2e8f0' },
      ],
    },
    {
      position: [8, 13, -35],
      scale: 1.1,
      puffs: [
        { position: [0, 0, 0], radius: 2.1, color: '#f8fafc' },
        { position: [2.2, 0.1, 0.2], radius: 1.7, color: '#f1f5f9' },
      ],
    },
    {
      position: [35, 17, -12],
      scale: 1.35,
      puffs: [
        { position: [0, 0, 0], radius: 2.4, color: '#f8fafc' },
        { position: [-2, 0.2, 0.6], radius: 1.8, color: '#f1f5f9' },
        { position: [1.6, -0.1, -0.5], radius: 1.5, color: '#f1f5f9' }
      ],
    }, {
      position: [-2, 12, 35],
      scale: 1.1,
      puffs: [
        { position: [0, 0, 0], radius: 2.1, color: '#f8fafc' },
        { position: [2.2, 0.1, 0.2], radius: 1.7, color: '#f1f5f9' },
      ],
    },
  ]

const cloudPuffs = clouds.flatMap((cloud) => {
  const cloudScale = cloud.scale ?? 1

  return cloud.puffs.map(puff => ({
    position: [
      cloud.position[0] + puff.position[0] * cloudScale,
      cloud.position[1] + puff.position[1] * cloudScale,
      cloud.position[2] + puff.position[2] * cloudScale,
    ] as ArrayVec3,
    radius: puff.radius * cloudScale,
    color: puff.color,
  }))
})

const cloudGeometry = new SphereGeometry(1, 12, 10)
const cloudMaterial = new MeshStandardMaterial({ roughness: 1, metalness: 0 })
const cloudInstancedMeshRef = shallowRef<InstancedMesh>()
const instanceDummy = new Object3D()

function updateTrackMarkInstances(mesh: InstancedMesh) {
  trackMarks.forEach((position, index) => {
    instanceDummy.position.set(...position)
    instanceDummy.rotation.set(0, 0, 0)
    instanceDummy.scale.set(1, 1, 1)
    instanceDummy.updateMatrix()
    mesh.setMatrixAt(index, instanceDummy.matrix)
  })

  mesh.instanceMatrix.needsUpdate = true
}

watch(trackMarkInstancedMeshRef, (mesh) => {
  if (mesh) {
    updateTrackMarkInstances(mesh)
  }
})

function updateCloudInstances(mesh: InstancedMesh) {
  cloudPuffs.forEach((puff, index) => {
    instanceDummy.position.set(...puff.position)
    instanceDummy.scale.setScalar(puff.radius)
    instanceDummy.updateMatrix()
    mesh.setMatrixAt(index, instanceDummy.matrix)
    mesh.setColorAt(index, new Color(puff.color))
  })

  mesh.instanceMatrix.needsUpdate = true
  if (mesh.instanceColor) {
    mesh.instanceColor.needsUpdate = true
  }
}

watch(cloudInstancedMeshRef, (mesh) => {
  if (mesh) {
    updateCloudInstances(mesh)
  }
})

onMounted(async () => {
  await nextTick()
  reset()
})
</script>

<template>
  <!-- Ground -->
  <RigidBody type="fixed" :friction="0.2" :restitution="0.3">
    <TresMesh receive-shadow :position="[0, GROUND_Y, 0]">
      <TresBoxGeometry :args="[GROUND_HALF * 2, 0.5, GROUND_HALF * 2]" />
      <TresMeshStandardMaterial color="#4d7c3a" :roughness="0.95" />
    </TresMesh>
  </RigidBody>

  <!-- Road surface -->
  <TresMesh receive-shadow :position="[0, 0.02, 0]">
    <TresBoxGeometry :args="[ROAD_HALF_WIDTH * 2, 0.04, ROAD_LENGTH]" />
    <TresMeshStandardMaterial color="#3f3f46" :roughness="0.85" />
  </TresMesh>

  <!-- Ball -->
  <RigidBody
    ref="ballRef"
    collider="ball"
    :restitution="1"
    :friction="0.55"
    :mass="0.01"
  >
   <TresMesh cast-shadow>
    <TresSphereGeometry :args="[3, 16, 16]" />
    <TresMeshStandardMaterial color="#f8fafc" :roughness="0.2" :metalness="0.1" />
   </TresMesh>
  </RigidBody>

  <!-- Boxes -->
  <RigidBody
    type="fixed"
    :friction="0.9"
    :restitution="0.5"
    collider="convexHull"
  >
  <TresMesh
      v-for="(box, index) in BOXES"
      :key="`box-${index}`"
      cast-shadow
      receive-shadow
      :position="box.position"
      :rotation="box.rotation ?? [0, 0, 0]"
    >
      <TresBoxGeometry :args="[box.size[0] * 2, box.size[1] * 2, box.size[2] * 2]" />
      <TresMeshStandardMaterial :color="box.color" :roughness="0.8" />
    </TresMesh>
  </RigidBody>

  <!-- Center line dashes -->
  <TresInstancedMesh
    ref="trackMarkInstancedMeshRef"
    :args="[trackMarkGeometry, trackMarkMaterial, trackMarks.length]"
    receive-shadow
  />

  <!-- Clouds -->
  <TresInstancedMesh
    ref="cloudInstancedMeshRef"
    :args="[cloudGeometry, cloudMaterial, cloudPuffs.length]"
    cast-shadow
  />
</template>
