<script setup lang="ts">
import { useLoop } from '@tresjs/core'
import { type ExposedRigidBody, Physics, RigidBody, SphericalJoint } from '@tresjs/rapier'
import { type DirectionalLight, InstancedMesh, Matrix4, MeshStandardMaterial, Quaternion, TorusGeometry, Vector3 } from 'three'
import { RoundedBox } from '@tresjs/cientos'

const poleRef = shallowRef<ExposedRigidBody | null>(null)
const ballRef = shallowRef<ExposedRigidBody | null>(null)

const PHYSICS_LINKS = 6
const VISUALS_PER_SEGMENT = 6
const VISUAL_LINKS = PHYSICS_LINKS * VISUALS_PER_SEGMENT

// Chain geometry. Pick chain length + release angle, derive ball start so all joints are satisfied at t=0.
const POLE_POS = new Vector3(0, 13.5, 0)
const CHAIN_LENGTH = 10
const RELEASE_ANGLE = (-55 * Math.PI) / 180 // negative = swung to -X side
const SEG_LEN = CHAIN_LENGTH / PHYSICS_LINKS
const CHAIN_DIR = new Vector3(Math.sin(RELEASE_ANGLE), -Math.cos(RELEASE_ANGLE), 0)
// Chain end (world position the last link's bottom anchor reaches when pre-aligned)
const CHAIN_END = new Vector3(
  POLE_POS.x + CHAIN_DIR.x * CHAIN_LENGTH,
  POLE_POS.y + CHAIN_DIR.y * CHAIN_LENGTH,
  POLE_POS.z + CHAIN_DIR.z * CHAIN_LENGTH,
)
// Rotation around world Z that aligns a link's local +Y (top anchor) to point back toward the pole
const CHAIN_ROT_Z = Math.atan2(CHAIN_DIR.x, -CHAIN_DIR.y)

function linkInitialPos(i: number): [number, number, number] {
  const d = SEG_LEN / 2 + i * SEG_LEN
  return [POLE_POS.x + CHAIN_DIR.x * d, POLE_POS.y + CHAIN_DIR.y * d, POLE_POS.z + CHAIN_DIR.z * d]
}

// Chain interaction groups: membership=bit2, filter=everything except bit2 → links don't collide with each other
const CHAIN_GROUPS = 0x0002FFFD

const linkRefs = ref<(ExposedRigidBody | null)[]>(Array.from({ length: PHYSICS_LINKS }, () => null))
function setLinkRef(el: unknown, i: number) {
  linkRefs.value[i] = (el as ExposedRigidBody | null) ?? null
}

const TORUS_R = 0.18
const TORUS_TUBE = 0.04

const chainMesh = new InstancedMesh(
  new TorusGeometry(TORUS_R, TORUS_TUBE, 8, 16),
  new MeshStandardMaterial({ color: '#888', metalness: 0.9, roughness: 0.3 }),
  VISUAL_LINKS,
)
chainMesh.castShadow = true

const _m = new Matrix4()
const _p = new Vector3()
const _q = new Quaternion()
const _linkQ = new Quaternion()
// Default TorusGeometry has its hole axis along +Z. Rotating π/2 around local Y moves the hole axis to -X.
// Alternating this rotation between adjacent visual links makes consecutive rings perpendicular → reads as interlocked chain.
const _alternateQ = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), Math.PI / 2)
const _identityQ = new Quaternion()
const _localOffset = new Vector3()
const _s = new Vector3(1, 1, 1)

const WALL_HEIGHT = 6
const CEMENT_SHADES = ['#7a7a78', '#6e6e6c', '#828280', '#767674', '#6a6a68', '#7e7e7c']

const GRID_PRESETS = [
  { text: '3×4', value: '3x4' },
  { text: '5×6', value: '5x6' },
  { text: '8×8', value: '8x8' },
  { text: '10×10', value: '10x10' },
  { text: '12×14', value: '12x14' },
  { text: '16×18', value: '16x18' },
  { text: '20×24', value: '20x24' },
]

const wallKey = ref(0)

const { mass, ballSize, gridSize, boxMass, ballSpeed } = useControls({
  gridSize: {
    label: 'Grid Size',
    value: '5x6',
    options: GRID_PRESETS,
  },
  ballSpeed: { value: 1, min: 0.1, max: 5, step: 0.1, label: 'Ball Speed' },
  ballSize: { value: 1, min: 0.5, max: 3.5, step: 0.1, label: 'Ball Size' },
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

// Ball start: anchor (top of ball) coincides with chain end → joint satisfied at t=0 for any ballSize
const BALL_START = computed<[number, number, number]>(() => [
  CHAIN_END.x,
  CHAIN_END.y - (ballSize!.value as number),
  CHAIN_END.z,
])

// Bumped on ballSize change to reset the chain alongside the ball (otherwise the new ball spawns at the
// initial chain-end position while the chain is mid-swing → huge constraint violation → explosion)
const simKey = computed(() => `${ballSize!.value}`)

const parsedGrid = computed(() => {
  const [c, r] = (gridSize!.value as string).split('x').map(Number)
  return { cols: c!, rows: r! }
})

watch(gridSize!, () => { wallKey.value++ })

const brickHeight = computed(() => WALL_HEIGHT / parsedGrid.value.rows)
const brickWidth = computed(() => brickHeight.value * 2)

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
  for (let i = 0; i < PHYSICS_LINKS; i++) {
    const link = linkRefs.value[i]?.instance
    if (!link) { return }
    const t = link.translation()
    const r = link.rotation()
    _linkQ.set(r.x, r.y, r.z, r.w)

    // Distribute VISUALS_PER_SEGMENT toruses evenly along the link's local Y axis
    for (let j = 0; j < VISUALS_PER_SEGMENT; j++) {
      const visualIndex = i * VISUALS_PER_SEGMENT + j
      const yLocal = SEG_LEN / 2 - (j + 0.5) * (SEG_LEN / VISUALS_PER_SEGMENT)
      _localOffset.set(0, yLocal, 0)
      _p.copy(_localOffset).applyQuaternion(_linkQ)
      _p.x += t.x
      _p.y += t.y
      _p.z += t.z
      _q.copy(_linkQ).multiply(visualIndex % 2 === 0 ? _alternateQ : _identityQ)
      _m.compose(_p, _q, _s)
      chainMesh.setMatrixAt(visualIndex, _m)
    }
  }
  chainMesh.instanceMatrix.needsUpdate = true
})
</script>

<template>
  <Environment preset="city" background />
  <TresDirectionalLight ref="dirLightRef" :position="[5, 15, 10]" :intensity="1.5" cast-shadow />
  <primitive :object="chainMesh" />

  <Suspense>
    <Physics :timestep="1 / 120">
      <RigidBody ref="poleRef" type="fixed" :position="[0, 13.5, 0]" collider="ball">
        <TresMesh>
          <TresSphereGeometry :args="[0.15, 16, 16]" />
          <TresMeshStandardMaterial color="#888" :metalness="0.9" :roughness="0.2" />
        </TresMesh>
      </RigidBody>

      <!-- Chain physics links — small invisible ball colliders, visuals come from the InstancedMesh -->
      <RigidBody v-for="i in PHYSICS_LINKS" :key="`link-${simKey}-${i}`" :ref="(el) => setLinkRef(el, i - 1)" type="dynamic"
        collider="ball" :mass="10" :linear-damping="0.4" :angular-damping="1.0" :enable-ccd="true"
        :collision-groups="CHAIN_GROUPS" :solver-groups="CHAIN_GROUPS" :position="linkInitialPos(i - 1)"
        :rotation="[0, 0, CHAIN_ROT_Z]">
        <TresMesh :visible="false">
          <TresSphereGeometry :args="[0.06, 4, 4]" />
        </TresMesh>
      </RigidBody>

      <RigidBody :key="ballSize" ref="ballRef" type="dynamic" :position="BALL_START" collider="ball" :mass="mass"
        :gravity-scale="ballSpeed" :enable-ccd="true">
        <TresMesh cast-shadow>
          <TresSphereGeometry :args="[ballSize, 32, 32]" />
          <TresMeshStandardMaterial color="#1a1a1a" :metalness="0.95" :roughness="0.1" />
        </TresMesh>
      </RigidBody>

      <!-- pole → link 0 -->
      <SphericalJoint :bodies="[poleRef?.instance, linkRefs[0]?.instance]" :params="[[0, 0, 0], [0, SEG_LEN / 2, 0]]" />
      <!-- link i → link i+1 -->
      <SphericalJoint v-for="i in PHYSICS_LINKS - 1" :key="`joint-${i}`"
        :bodies="[linkRefs[i - 1]?.instance, linkRefs[i]?.instance]"
        :params="[[0, -SEG_LEN / 2, 0], [0, SEG_LEN / 2, 0]]" />
      <!-- last link → ball -->
      <SphericalJoint :bodies="[linkRefs[PHYSICS_LINKS - 1]?.instance, ballRef?.instance]"
        :params="[[0, -SEG_LEN / 2, 0], [0, ballSize, 0]]" />

      <RigidBody v-for="(box, i) in boxes" :key="`${wallKey}-${parsedGrid.cols}-${parsedGrid.rows}-${i}`" type="dynamic"
        :mass="boxMass" :position="[
          3,
          brickHeight / 2 + box.row * brickHeight,
          -((parsedGrid.cols - 1) / 2) * brickWidth + box.col * brickWidth + (box.row % 2 === 1 ? brickWidth / 2 : 0),
        ]" collider="cuboid">
        <RoundedBox :args="[brickHeight, brickHeight, brickWidth, 1, brickHeight * 0.05]" cast-shadow receive-shadow>
          <TresMeshStandardMaterial :color="CEMENT_SHADES[box.row % CEMENT_SHADES.length]" :roughness="0.95"
            :metalness="0" />
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
