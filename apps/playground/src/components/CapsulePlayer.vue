<script setup lang="ts">
import { CapsuleCollider, RigidBody, useRapier } from '@tresjs/rapier'
import type { ExposedRigidBody } from '@tresjs/rapier'
import { MathUtils, Vector3 } from 'three'
import { useMagicKeys } from '@vueuse/core'
import { shallowRef, watch } from 'vue'

import { useTres } from '@tresjs/core'

const props = withDefaults(defineProps<{ position?: [number, number, number] }>(), {
  position: () => [0, 3, 0],
})

const RADIUS = 0.35
const HALF_HEIGHT = 0.45 // total height = 0.45 * 2 + 0.35 * 2 = 1.6
const GRAVITY = -9.81
const MAX_FALL = -30
const JUMP_SPEED = 6.5

const WALK_SPEED = 4
const RUN_SPEED = 7

const { camera } = useTres()
const { world, onBeforeStep } = useRapier()

const { KeyW, KeyA, KeyS, KeyD, Space, ShiftLeft } = useMagicKeys({
  passive: false,
  // Space scrolls the page otherwise
  onEventFired: e => e.code === 'Space' && e.type === 'keydown' && e.preventDefault(),
})

const forward = new Vector3()
const right = new Vector3()
const UP = new Vector3(0, 1, 0)
const moveDir = new Vector3()

function readMoveInput() {
  moveDir.set(0, 0, 0)
  if (!camera.value) { return moveDir }

  camera.value.getWorldDirection(forward)
  forward.y = 0
  forward.normalize()
  right.crossVectors(forward, UP).normalize()

  if (KeyW.value) { moveDir.add(forward) }
  if (KeyS.value) { moveDir.sub(forward) }
  if (KeyD.value) { moveDir.add(right) }
  if (KeyA.value) { moveDir.sub(right) }

  // normalize so diagonals aren't 1.41x faster
  if (moveDir.lengthSq() > 0) { moveDir.normalize() }
  return moveDir
}

const controller = world.value.createCharacterController(0.02) // 0.02 = skin width, keep « RADIUS
controller.setUp({ x: 0, y: 1, z: 0 })
controller.enableAutostep(0.5, 0.2, true) // maxHeight, minWidth, includeDynamicBodies
controller.enableSnapToGround(0.5) // stops you launching off stair edges / ramps
controller.setMaxSlopeClimbAngle(MathUtils.degToRad(50))
controller.setMinSlopeSlideAngle(MathUtils.degToRad(35))
controller.setApplyImpulsesToDynamicBodies(true) // so you can shove the cans
controller.setCharacterMass(70)

const rigidBody = shallowRef<ExposedRigidBody>()
const meshRef = shallowRef()
const targetYaw = ref(0)

let verticalVelocity = 0
let isGrounded = false
let jumpQueued = false
const desired = new Vector3()
const playerPosition = new Vector3() // mirrors the body, for the camera later

defineExpose({ position: playerPosition })

watch(Space, (pressed) => {
  if (pressed) { jumpQueued = true }
})

onBeforeStep((dt) => {
  const body = rigidBody.value?.instance
  const collider = body?.collider(0)
  if (!body || !collider) { return }

  if (isGrounded) {
    verticalVelocity = jumpQueued ? JUMP_SPEED : -1
  }
  else {
    verticalVelocity = Math.max(verticalVelocity + GRAVITY * 2 * dt, MAX_FALL)
  }
  jumpQueued = false

  const dir = readMoveInput()
  const speed = ShiftLeft.value ? RUN_SPEED : WALK_SPEED
  desired.set(dir.x * speed * dt, verticalVelocity * dt, dir.z * speed * dt)

  if (dir.lengthSq() > 0 && meshRef.value) {
    targetYaw.value = Math.atan2(dir.x, dir.z)
    meshRef.value.rotation.y = MathUtils.lerp(meshRef.value.rotation.y, targetYaw.value, 0.2)
  }

  controller.computeColliderMovement(collider, desired)
  isGrounded = controller.computedGrounded()

  const move = controller.computedMovement()
  const t = body.translation()
  body.setNextKinematicTranslation({ x: t.x + move.x, y: t.y + move.y, z: t.z + move.z })

  playerPosition.set(t.x + move.x, t.y + move.y, t.z + move.z)
})
onUnmounted(() => world.value.removeCharacterController(controller))
</script>

<template>
  <TresGroup :dispose="null">
    <RigidBody ref="rigidBody" type="kinematic" :collider="false" :position="position">
      <!-- Rapier: capsule(halfHeight, radius). Three: CapsuleGeometry(radius, length). Args are in opposite order. -->
      <CapsuleCollider :args="[HALF_HEIGHT, RADIUS]" :position="[0, 0, 0]" />
      <TresMesh ref="meshRef" cast-shadow>
        <TresCapsuleGeometry :args="[RADIUS, HALF_HEIGHT * 2, 8, 16]" />
        <TresMeshStandardMaterial color="#ff6b6b" />
      </TresMesh>
    </RigidBody>
  </TresGroup>
</template>
