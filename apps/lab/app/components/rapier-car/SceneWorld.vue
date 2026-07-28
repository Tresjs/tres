<script setup lang="ts">
import { CoefficientCombineRule } from '@dimforge/rapier3d-compat'
import { type ExposedRigidBody, RigidBody } from '@tresjs/rapier'
import {
  BoxGeometry,
  type InstancedMesh,
  MeshStandardMaterial,
  Object3D,
  RepeatWrapping,
  SRGBColorSpace,
} from 'three'
import { shallowRef, watch } from 'vue'
import BallComponent from './BallComponent.vue'
import GrassField from './GrassField.vue'
import ReflectorTowers from './ReflectorTowers.vue'
import type { TrampleMap } from './trample'

type ArrayVec3 = [number, number, number]

defineProps<{ trample?: TrampleMap | null }>()

const ballRef = shallowRef<InstanceType<typeof BallComponent> | null>(null)

defineExpose({
  reset: () => ballRef.value?.reset?.(),
  ballPosition: () => ballRef.value?.position?.() ?? null,
})

const GROUND_HALF = 50
const GROUND_Y = -0.25
const ROAD_HALF_WIDTH = 5
const ROAD_LENGTH = 80
const WALL_HALF_HEIGHT = 2.5
const WALL_HALF_WIDTH = 0.35
const WALL_BOUNDARY = GROUND_HALF - WALL_HALF_WIDTH
// High so the ball (Max combine rule) rebounds hard off walls; the walls
// themselves use the Min rule so the car (0.2) keeps its soft wall feel
const WALL_RESTITUTION = 0.9

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
  ]

const GRID_TILES_PER_UNIT = 0.5

const { state: gridTexture } = useTexture('/textures/gridbox.png')

// Scale each face's UVs to world units so the grid tiles uniformly
// instead of stretching on elongated ramps
function createGridBoxGeometry(width: number, height: number, depth: number) {
  const geometry = new BoxGeometry(width, height, depth)
  const uv = geometry.attributes.uv!
  // BoxGeometry face order: +x, -x, +y, -y, +z, -z, 4 verts each
  const faceDims: [number, number][] = [
    [depth, height],
    [depth, height],
    [width, depth],
    [width, depth],
    [width, height],
    [width, height],
  ]
  faceDims.forEach(([faceWidth, faceHeight], face) => {
    for (let i = 0; i < 4; i++) {
      const index = face * 4 + i
      uv.setXY(
        index,
        uv.getX(index) * faceWidth * GRID_TILES_PER_UNIT,
        uv.getY(index) * faceHeight * GRID_TILES_PER_UNIT,
      )
    }
  })
  return geometry
}

const boxGeometries = BOXES.map(box =>
  createGridBoxGeometry(box.size[0] * 2, box.size[1] * 2, box.size[2] * 2))

const boxMaterial = new MeshStandardMaterial({ roughness: 0.8 })

watch(gridTexture, (texture) => {
  if (!texture) { return }
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping
  texture.colorSpace = SRGBColorSpace
  texture.anisotropy = 8
  boxMaterial.map = texture
  boxMaterial.needsUpdate = true
}, { immediate: true })

const WALLS: { position: ArrayVec3, size: ArrayVec3 }[] = [
  {
    position: [0, WALL_HALF_HEIGHT, WALL_BOUNDARY],
    size: [WALL_BOUNDARY, WALL_HALF_HEIGHT, WALL_HALF_WIDTH],
  },
  {
    position: [0, WALL_HALF_HEIGHT, -WALL_BOUNDARY],
    size: [WALL_BOUNDARY, WALL_HALF_HEIGHT, WALL_HALF_WIDTH],
  },
  {
    position: [WALL_BOUNDARY, WALL_HALF_HEIGHT, 0],
    size: [WALL_HALF_WIDTH, WALL_HALF_HEIGHT, WALL_BOUNDARY],
  },
  {
    position: [-WALL_BOUNDARY, WALL_HALF_HEIGHT, 0],
    size: [WALL_HALF_WIDTH, WALL_HALF_HEIGHT, WALL_BOUNDARY],
  },
]

const wallsRef = shallowRef<ExposedRigidBody | null>(null)

// Min rule loses to the ball's Max rule but beats the car's default Average,
// so only the ball gets the springy walls
watch(() => wallsRef.value?.instance, (body) => {
  if (!body) { return }
  for (let i = 0; i < body.numColliders(); i++) {
    body.collider(i).setRestitutionCombineRule(CoefficientCombineRule.Min)
  }
})

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
</script>

<template>
  <!-- Ground -->
  <RigidBody type="fixed" :friction="0.2" :restitution="0.3">
    <TresMesh receive-shadow :position="[0, GROUND_Y, 0]">
      <TresBoxGeometry :args="[GROUND_HALF * 2, 0.5, GROUND_HALF * 2]" />
      <TresMeshStandardMaterial color="#4d7c3a" :roughness="0.95" />
    </TresMesh>
  </RigidBody>

  <!-- Grass field (GLSL) covering the green ground, minus the road strip -->
  <GrassField
    :size="GROUND_HALF * 2"
    :road-half-width="ROAD_HALF_WIDTH"
    :road-length="ROAD_LENGTH"
    :trample="trample"
    tint="#55689b"
  />

  <!-- Road surface -->
  <TresMesh receive-shadow :position="[0, 0.02, 0]">
    <TresBoxGeometry :args="[ROAD_HALF_WIDTH * 2, 0.04, ROAD_LENGTH]" />
    <TresMeshStandardMaterial color="#3f3f46" :roughness="0.85" />
  </TresMesh>

  <!-- Ball -->
  <BallComponent ref="ballRef" />

  <!-- Corner floodlights -->
  <ReflectorTowers />

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
      :geometry="boxGeometries[index]"
      :material="boxMaterial"
    />
  </RigidBody>

  <!-- Boundary walls: springy for the ball (see combine-rule watch above) -->
  <RigidBody
    ref="wallsRef"
    type="fixed"
    :friction="0.9"
    :restitution="WALL_RESTITUTION"
    collider="convexHull"
  >
    <TresMesh
      v-for="(wall, index) in WALLS"
      :key="`wall-${index}`"
      cast-shadow
      receive-shadow
      :position="wall.position"
    >
      <TresBoxGeometry :args="[wall.size[0] * 2, wall.size[1] * 2, wall.size[2] * 2]" />
      <TresMeshStandardMaterial color="#94a3b8" :roughness="0.8" />
    </TresMesh>
  </RigidBody>

  <!-- Center line dashes -->
  <TresInstancedMesh
    ref="trackMarkInstancedMeshRef"
    :args="[trackMarkGeometry, trackMarkMaterial, trackMarks.length]"
    receive-shadow
  />

</template>
